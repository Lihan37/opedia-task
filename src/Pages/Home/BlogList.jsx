import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const BlogList = ({ blogs, loading, handleDelete }) => {
  const { user } = useContext(AuthContext);

  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleEdit = (blogId) => {
    // Implement edit functionality
    console.log("Editing blog with ID:", blogId);
  };

  const handleDeleteClick = async (blogId) => {
    try {
      await handleDelete(blogId); // Call the handleDelete function passed as prop
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

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Latest Blogs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
              {/* Edit and Delete Buttons */}
              {user && user.email === blog.authorEmail && (
                <>
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="ml-2 text-green-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(blog._id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
