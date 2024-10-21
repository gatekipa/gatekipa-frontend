import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import router from "./routes";
import "./index.css";
import { Toaster } from "./components/ui/sonner";

const otp = localStorage.getItem("otp");

if (!otp || JSON.parse(otp).isVerified !== true) {
  localStorage.setItem("otp", JSON.stringify({ isVerified: false }));
}

// test commit
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
