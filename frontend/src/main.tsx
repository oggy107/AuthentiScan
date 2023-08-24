import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Root from "./routes/root";
import Home from "./routes/home";
import About from "./routes/about";
import Register from "./routes/register";

import { Route } from "./types";

import Web3Provider from "./Web3Config";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
    {
        path: Route.home,
        Component: Root,
        children: [
            {
                path: Route.home,
                Component: Home,
            },
            {
                path: Route.about,
                Component: About,
            },
            {
                path: Route.register,
                Component: Register,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Web3Provider>
            <RouterProvider router={router} />
            <ToastContainer position="bottom-right" />
        </Web3Provider>
    </React.StrictMode>
);
