"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  return (
    <ToastContainer
      toastStyle={{ backgroundColor: "var(--whiteShadow)" }}
      hideProgressBar
      stacked
      position="top-right"
      style={{ zIndex: 99999999 }}
    />
  );
}
