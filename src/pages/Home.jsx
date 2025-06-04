import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const username = localStorage.getItem("username") || "!";


  const handleLogout = () => {
    navigate("/login");
  };

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === null) return;
    
    if (loggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

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
  }, []);

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
            {["dashboard", "profile"].map((section) => (
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
            <div
              className="items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <div className="pr-2 md:mb-14 py-14 md:py-0">
                <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                  <span className="block w-full">Explore new jobs</span> and
                  grow your career!
                </h1>
                <p className="py-4 text-lg text-gray-500 2xl:py-8 md:py-6 2xl:pr-5">
                  Find a new job
                </p>
                <div className="mt-4">
                  <a
                    href="#contact"
                    className="px-5 py-3 text-lg tracking-wider text-white bg-blue-500 rounded-lg md:px-8 hover:bg-blue-600 group"
                  >
                    <span>Explore More</span>{" "}
                  </a>
                </div>
              </div>

              <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
                <img
                  id="heroImg1"
                  className="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
                  src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
                  alt="Awesome hero page image"
                  width="500"
                  height="488"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 m-4">
              {jobs.map((job) => (
                <div className="w-full h-30 bg-white flex flex-col justify-around items-center">
                  <div className="text-3xl">{job.title}</div>
                  <button className="text-blue-400 cursor-pointer">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
