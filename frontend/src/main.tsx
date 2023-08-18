import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home";

import Web3Provider from "./Web3Config";

import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Web3Provider>
            <RouterProvider router={router} />
        </Web3Provider>
    </React.StrictMode>
);
