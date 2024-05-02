import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import CommentForm from "../CommentForm/CommentForm";

const BlogList = ({ blogs, loading, handleDeleteBlog, handleEditBlog, handleDeleteComment, handleEditComment }) => {
  const { user } = useContext(AuthContext);
  const [showFullContent, setShowFullContent] = useState(false);
  const [comments, setComments] = useState({});

  // useEffect(() => {
  //   fetchComments();
  // }, [blogs]); 
  // const fetchComments = async () => {
  //   try {
  //     const commentData = await Promise.all(
  //       blogs.map(async (blog) => {
  //         const response = await axios.get(
  //           `https://opedia-server.vercel.app/blogs/${blog._id}/comments`
  //         );
  //         return { blogId: blog._id, comments: response.data.comments };
  //       })
  //     );

  //     const commentsObj = {};
  //     commentData.forEach((item) => {
  //       commentsObj[item.blogId] = item.comments;
  //     });
  //     setComments(commentsObj);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Failed to fetch comments. Please try again later.",
  //     });
  //   }
  // };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleBlogEdit = (blogId) => {
    handleEditBlog(blogId);
  };

  const handleBlogDelete = async (blogId) => {
    try {
      await handleDeleteBlog(blogId);
      console.log("Blog deleted successfully:", blogId);
    } catch (error) {
      console.error("Error deleting blog:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response.data.error ||
          "Failed to delete blog. Please try again later.",
      });
    }
  };

  const handleCommentEdit = (commentId) => {
    handleEditComment(commentId);
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await handleDeleteComment(commentId);
      console.log("Comment deleted successfully:", commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response.data.error ||
          "Failed to delete comment. Please try again later.",
      });
    }
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Latest Blogs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="mb-8 border-t-2 border-b-2 border-gray-300 py-4"
            >
              <h3 className="text-2xl mb-5 font-semibold">{blog.title}</h3>
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-1/3 h-1/3 object-cover object-center mb-4"
              />
              <p className="text-gray-600 mb-2">Author: {blog.authorEmail}</p>
              <div>
                {showFullContent ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.content.length > 100
                          ? blog.content.substring(0, 1000) + "..."
                          : blog.content,
                    }}
                  />
                )}
                {blog.content.length > 100 && (
                  <button
                    onClick={toggleContent}
                    className="text-blue-500 hover:underline"
                  >
                    {showFullContent ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
              {/* Comment Section */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Comments:</h4>
                {comments[blog._id] && comments[blog._id].length > 0 ? (
                  comments[blog._id].map((comment) => (
                    <div key={comment._id} className="mb-2">
                      <p>{comment.content}</p>
                      <p className="text-gray-600 text-sm">
                        Comment by: {comment.authorEmail}
                      </p>
                      {user && user.email === comment.authorEmail && (
                        <div className="flex mt-1">
                          <button
                            onClick={() => handleCommentEdit(comment._id)}
                            className="text-green-500 hover:underline mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleCommentDelete(comment._id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
                {user && (
                  <CommentForm blogId={blog._id} />
                )}
              </div>
              {/* Edit and Delete Buttons for Blogs */}
              {user && user.email === blog.authorEmail && (
                <div className="flex mt-4">
                  <button
                    onClick={() => handleBlogEdit(blog._id)}
                    className="text-green-500 hover:underline mr-2"
                  >
                    Edit Blog
                  </button>
                  <button
                    onClick={() => handleBlogDelete(blog._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete Blog
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No blogs to display.</p>
        )
      )}
    </div>
  );
};

export default BlogList;
