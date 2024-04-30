import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);

      // If user creation is successful, register user in MongoDB
      const response = await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
      });
      // Handle success response
      console.log("Registration successful:", response.data);

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have successfully registered.",
      });
    } catch (error) {
      // Handle error
      console.error("Error registering user:", error);

      // Show error alert with Firebase error message
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message, // Display Firebase error message
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Name"
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Email address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Email address"
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 10a10 10 0 1 1 20 0a10 10 0 0 1-20 0zm10-7a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zm1 10.08a2.5 2.5 0 0 0-2 0V15a1 1 0 0 0-2 0v-1.92a2.5 2.5 0 1 0 4 0zm1-4.51v-1.5a3 3 0 1 0-2 0v1.5a5 5 0 1 0 2 0zm-5 0v-1.5a5 5 0 1 0-2 0v1.5a3 3 0 1 0 2 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Create account
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm leading-5 text-center text-gray-700">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out ml-2 duration-150"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
