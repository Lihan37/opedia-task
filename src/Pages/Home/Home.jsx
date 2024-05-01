import React, { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
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

  useEffect(() => {
    fetchBlogs();
  }, []); // Fetch blogs on initial render

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/blogs");
      setBlogs(response.data);
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

  const handleSearch = () => {
    console.log("Searching...");

    if (!searchQuery.trim()) {
      // Empty search query
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

      await axios.post("http://localhost:5000/blogs", {
        title,
        content,
        authorEmail: user.email,
        thumbnail: thumbnailUrl,
      });

      // Clear form fields after successful post
      setTitle("");
      setContent("");
      setSelectedFile(null);

      // Fetch blogs after posting
      fetchBlogs();

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
      await axios.delete(`http://localhost:5000/blogs/${blogId}`);
      console.log("Blog deleted successfully:", blogId);
      // Refetch blogs after deletion
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete blog. Please try again later.",
      });
    }
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
      />
    </div>
  );
};

export default Home;
