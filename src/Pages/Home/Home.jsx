import React, { useState } from 'react';
import JoditEditor from "jodit-react";

const Home = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');

    const handleChange = (value) => {
        setContent(value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.value);
    };

    const handleImageUpload = (file) => {
        setThumbnail(file.url);
    };

    return (
        <div className="px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to Opedia Blogs</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Title</label>
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
                <label htmlFor="thumbnail" className="block text-sm font-semibold text-gray-600">Thumbnail Image</label>
                <input
                    type="file"
                    accept="image/*"
                    id="thumbnail"
                    onChange={(e) => handleThumbnailChange(e.target.files[0])}
                    className="border border-gray-300 p-2 w-full"
                />
            </div>
            <JoditEditor
                value={content}
                onChange={handleChange}
                config={{
                    uploader: {
                        insertImageAsBase64URI: true,
                        imagesExtensions: ["jpg", "png", "jpeg", "gif"],
                        process: handleImageUpload,
                    },
                }}
            />
        </div>
    );
};

export default Home;
