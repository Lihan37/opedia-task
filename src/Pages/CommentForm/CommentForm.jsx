// CommentForm.js

import React, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const CommentForm = ({ blogId }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!content.trim()) {
        return;
      }
      // Retrieve access token from local storage
      const token = localStorage.getItem("accessToken");
      console.log("Retrieved access token:", token);

      const response = await axios.post(
        `https://opedia-server.vercel.app/blogs/${blogId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Comment posted successfully:", response.data);
      setContent("");
    } catch (error) {
      console.error("Error posting comment:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to post comment. Please try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your comment..."
        className="border border-gray-300 p-2 w-full"
        rows="4"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
