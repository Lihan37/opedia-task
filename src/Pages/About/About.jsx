import React from 'react';
import { motion } from 'framer-motion'; 

const About = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">About Opedia Blogs</h2>
                <p className="text-gray-700 mb-8">Opedia Blogs is a platform for sharing knowledge, experiences, and stories with the world. We believe in the power of blogging to inspire, educate, and connect people from all walks of life.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-gray-700">Our mission is to empower individuals to express themselves freely through blogging. We strive to provide a user-friendly platform that encourages creativity, fosters community, and promotes meaningful conversations.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                    <p className="text-gray-700">Our vision is to become the premier destination for bloggers worldwide. We envision a diverse and inclusive community where every voice is heard, valued, and respected. Together, we aim to inspire, inform, and entertain.</p>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
