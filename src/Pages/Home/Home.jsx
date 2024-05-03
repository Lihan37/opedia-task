import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../providers/AuthProvider";
import BlogList from "./BlogList";
import Swal from "sweetalert2";


const Home = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query)
    );
    setSearchResults(results);
  }, [searchQuery, blogs]);

  const fetchBlogs = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://opedia-server.vercel.app/blogs?page=${page}`
      );
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://opedia-server.vercel.app/blogs?searchQuery=${searchQuery}`
      );
      setSearchResults(response.data.blogs);
    } catch (error) {
      console.error("Error searching blogs:", error);
      setSearchResults([]);
    }
  };

  const handlePost = async () => {
    try {
      if (!selectedFile) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select an image file.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("authorEmail", user.email);

      const imgbbResponse = await uploadToImgbb(formData);
      const thumbnailUrl = imgbbResponse.data.data.url;

      await axios.post("https://opedia-server.vercel.app/blogs", {
        title,
        content,
        authorEmail: user.email,
        thumbnail: thumbnailUrl,
      });

      setTitle("");
      setContent("");
      setSelectedFile(null);

      fetchBlogs(currentPage);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Blog posted successfully!",
      });
    } catch (error) {
      console.error("Error posting blog:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to post blog. Please try again later.",
      });
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`https://opedia-server.vercel.app/blogs/${blogId}`);
      console.log("Blog deleted successfully:", blogId);
      fetchBlogs(currentPage);
    } catch (error) {
      console.error("Error deleting blog:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete blog. Please try again later.",
      });
    }
  };

  const handleEditBlog = (blogId) => {
    window.location.href = `/blogs/${blogId}/edit`;
  };  
  
  
  

  const uploadToImgbb = async (formData) => {
    return await axios.post(
      "https://api.imgbb.com/1/upload?key=dc995ebdc887c4e73f8c06ef1ffa82b9",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="px-4 py-8">
        {user && (
          <p className="text-sm font-semibold text-gray-600">
            *Logged in as {user.email}*
          </p>
        )}
        <h2 className="text-3xl font-bold mb-4">Welcome to Opedia Blogs</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-xl font-semibold text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter the title"
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-xl font-semibold text-gray-600"
          >
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
        />
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        >
          Post
        </button>
      </div>
      <div className="px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Search Blogs</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title or content"
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      <BlogList
        blogs={searchResults.length > 0 ? searchResults : blogs}
        loading={loading}
        handleDelete={handleDelete}
        handleEditBlog={handleEditBlog} // Pass handleEditBlog function as a prop
      />
      <div className="px-4 py-8 flex justify-center">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`mx-2 p-2 border ${
              currentPage === page + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
