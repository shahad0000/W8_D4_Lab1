import axios from "axios";
import React, { use, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Admin = () => {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
  });
  const [jobs, setJobs] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const username = localStorage.getItem("username") || "";

  useEffect(() => {
    const type = localStorage.getItem("type");
    const loggedIn = localStorage.getItem("loggedIn");

    if (type === null || loggedIn === null) return;

    if (type !== "admin" || loggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    navigate("/login");
  };

  const postJob = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://683ff5425b39a8039a5641c5.mockapi.io/jobs",
        newJob
      );
      setJobs([...jobs, newJob]);
      setNewJob({ title: "" });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://683ff5425b39a8039a5641c5.mockapi.io/jobs/${id}`
      );
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const getJobs = async () => {
    try {
      const res = await axios.get(
        "https://683ff5425b39a8039a5641c5.mockapi.io/jobs"
      );
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobs();
  }, [jobs]);

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-50 ${
          openSidebar ? "w-64" : "hidden md:block md:w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h1
            className={`text-xl font-bold text-green-600 transition-opacity duration-300 ${
              openSidebar ? "opacity-100 block" : "opacity-0 hidden md:block"
            }`}
          >
            Jobs Dashboard
          </h1>
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="md:hidden p-2 rounded-full hover:bg-gray-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <nav className="py-4">
          <ul className="space-y-2">
            {["dashboard", "Jobs", "profile"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => {
                    setActiveSection(section);
                    setOpenSidebar(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors w-full text-left ${
                    activeSection === section ? "bg-gray-100" : ""
                  }`}
                >
                  <span className="text-gray-700 capitalize">{section}</span>
                </button>
              </li>
            ))}
            <button
              onClick={handleLogout}
              className="text-red-700 flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors w-full text-left"
            >
              Logout
            </button>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Job Dashboard</h1>
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {activeSection === "dashboard" && (
          <div className="space-y-6">
            <header>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome Back, {username}
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your account today.
              </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Job Listings
                </h2>
                <p className="text-2xl font-bold text-green-600">
                  {jobs.length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700">
                  Number of users
                </h2>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Spent
                </h2>
                <p className="text-2xl font-bold text-blue-600">$500.00</p>
              </div>
            </div>

            <div>
              <form
                onSubmit={postJob}
                className="bg-white flex justify-end gap-1 p-2"
              >
                <input
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  type="text"
                  className="border border-gray-400 rounded-xl"
                  placeholder="Type a job name"
                />
                <button type="submit" className="bg-blue-300 p-2 rounded-md">
                  Post
                </button>
              </form>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 m-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="w-full h-30 bg-white flex flex-col justify-around items-center"
                  >
                    <div className="text-3xl">{job.title}</div>
                    <div className="flex justify-end px-9 w-full">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-700 cursor-pointer  w-fit"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
