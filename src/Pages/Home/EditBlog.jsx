import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://opedia-server.vercel.app/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleFormSubmit = async (formData) => {
    try {
      await axios.patch(`https://opedia-server.vercel.app/blogs/${id}`, formData);
      console.log('Blog updated successfully');
      // Optionally, redirect the user to the updated blog page
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (!user) {
    // Redirect to login page or display an error message
    return <div>Please log in to edit blogs</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  // Ensure that only the user who posted the blog can edit it
  if (user.email !== blog.authorEmail) {
    return <div>You are not authorized to edit this blog</div>;
  }

  return (
    <div>
      <h1>Edit Blog</h1>
      {/* Form for editing the blog */}
      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />
        <label>Content:</label>
        <textarea
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
        ></textarea>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBlog;
