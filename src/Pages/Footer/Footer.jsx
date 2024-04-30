import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-white">
                        <h2 className="text-xl font-bold mb-4">Opedia Blogs</h2>
                        <p className="text-gray-400">Empowering voices, inspiring connections.</p>
                    </div>
                    <ul className="flex items-center space-x-8">
                        <li>
                            <a href="https://www.facebook.com/eanur.rahman.9/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/eanurlihan/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/Lihan37" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                                <i className="fab fa-github"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
