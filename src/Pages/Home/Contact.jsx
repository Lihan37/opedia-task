import React from 'react';
import { FaFacebook, FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const phoneNumber = '+8801716285196';
  const facebookProfile = 'https://www.facebook.com/eanur.rahman.9';
  const linkedinProfile = 'https://www.linkedin.com/in/eanurlihan/';
  const githubProfile = 'https://github.com/Lihan37';

  return (
    <div className="contact-container mt-12 mb-12 md:mt-24 text-center">
      <h2 className="text-3xl md:text-4xl text-gray-800 font-bold mb-8">Contact Me</h2>

      <div className="max-w-lg mx-auto grid gap-6 md:grid-cols-2 lg:max-w-3xl">
        <div className="contact-item bg-gray-200 rounded-lg p-6 transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-xl md:text-2xl text-gray-800 font-bold mb-4">Connect on Facebook</h3>
          <a href={facebookProfile} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 hover:text-blue-600">
            <FaFacebook className="mr-2 text-xl md:text-2xl" />
            Facebook
          </a>
        </div>
        <div className="contact-item bg-gray-200 rounded-lg p-6 transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-xl md:text-2xl text-gray-800 font-bold mb-4">Call or Text</h3>
          <a href={`tel:${phoneNumber}`} className="flex items-center justify-center text-gray-800 hover:text-blue-600">
            <FaPhone className="mr-2 text-xl md:text-2xl" />
            Phone
          </a>
        </div>
        <div className="contact-item bg-gray-200 rounded-lg p-6 transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-xl md:text-2xl text-gray-800 font-bold mb-4">Connect on LinkedIn</h3>
          <a href={linkedinProfile} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 hover:text-blue-600">
            <FaLinkedin className="mr-2 text-xl md:text-2xl" />
            LinkedIn
          </a>
        </div>
        <div className="contact-item bg-gray-200 rounded-lg p-6 transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-xl md:text-2xl text-gray-800 font-bold mb-4">Check out GitHub</h3>
          <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 hover:text-blue-600">
            <FaGithub className="mr-2 text-xl md:text-2xl" />
            GitHub
          </a>
        </div>
        <div className="contact-item bg-gray-200 rounded-lg p-6 transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-xl md:text-2xl text-gray-800 font-bold mb-4">Send an Email</h3>
          <form action="https://formspree.io/f/mqkvrwaz" method="POST">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-600 transition duration-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="_replyto"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-600 transition duration-300"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-600 transition duration-300"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
