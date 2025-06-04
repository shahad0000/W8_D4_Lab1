import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const SignUp = () => {
  const [creds, setCreds] = useState({
    email: "",
    username: "",
    password: "",
    type: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getRes = await axios.get(
        "https://683ff5425b39a8039a5641c5.mockapi.io/users"
      );
      const userExist = getRes.data.find(
        (user) => user.username === creds.username
      );
      if (userExist) {
        return Swal.fire({
          icon: "warning",
          title: "This username already exist",
        });
      }
      const postRes = await axios.post("https://683ff5425b39a8039a5641c5.mockapi.io/users", creds);
      console.log(postRes)
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="bg-blue-50 flex items-center justify-center min-h-screen">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={creds.username}
                onChange={handleChange}
                placeholder="Enter a username"
                autoComplete="username"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={creds.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={creds.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Enter a password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center mb-5">
              <input type="checkbox" id="terms" name="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-700">
                I agree to the
                <a href="#" className="text-blue-500 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
