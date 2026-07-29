import React from "react";
import ReactDOM from "react-dom/client";

import { ReactFlowProvider } from "reactflow";
import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";
import "reactflow/dist/style.css";
import "./styles/animations.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>

        <ReactFlowProvider>

            <App />

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 2500,

                    style: {
                        background: "#0f172a",
                        color: "#ffffff",
                        border: "1px solid #1e293b",
                        borderRadius: "12px",
                        fontSize: "14px",
                    },

                    success: {
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "#ffffff",
                        },
                    },

                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#ffffff",
                        },
                    },
                }}
            />

        </ReactFlowProvider>

    </React.StrictMode>
);