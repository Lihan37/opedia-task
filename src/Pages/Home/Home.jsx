import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';

const Home = () => {
    const [editorHtml, setEditorHtml] = useState('');

    const handleChange = (html) => {
        setEditorHtml(html);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto p-4">
                <h2 className="text-3xl font-bold mb-4">Welcome to Opedia Blogs</h2>
                <p className="text-lg mb-4">Share your thoughts, stories, and ideas with the world. Start writing your first blog post now!</p>
                <ReactQuill 
                    theme="snow" 
                    value={editorHtml}
                    onChange={handleChange} 
                />
            </div>
        </motion.div>
    );
};

export default Home;
