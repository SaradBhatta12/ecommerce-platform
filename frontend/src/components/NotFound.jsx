import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-pink-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Page Not Found</p>
      <Link
        to="/"
        className="text-pink-500 text-lg underline hover:text-pink-600 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
