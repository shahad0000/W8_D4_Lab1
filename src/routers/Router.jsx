import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        { path: "/", element: <Home /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/login", element: <Login /> },
        { path: "/admin", element: <Admin /> },
    ]
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
