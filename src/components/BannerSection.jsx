import React from "react";
import { useNavigate } from "react-router-dom";

const BannerSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full"
      style={{
        height: "65vh",
        maxHeight: "500px",
        minHeight: "220px",
        backgroundImage: "url('/exotic-cars-and-supercars-whats-the-difference.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex flex-col items-start text-white px-4 sm:px-8 md:ml-16 h-full justify-center">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-6 text-left">
          Drive Your Dreams Today!
        </h1>
        <button
          className="px-6 py-2 sm:px-10 sm:py-3 text-base sm:text-lg rounded-full font-bold bg-gradient-to-r from-red-600 to-indigo-500 shadow-lg hover:from-red-700 hover:to-indigo-600 transition-all duration-200"
          onClick={() => navigate("/available-cars")}
        >
          View Available Cars
        </button>
      </div>
    </section>
  );
};

export default BannerSection;