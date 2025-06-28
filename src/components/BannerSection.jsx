import React from "react";
import { useNavigate } from "react-router-dom";

const BannerSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center"
      style={{
        backgroundImage: "url('/exotic-cars-and-supercars-whats-the-difference.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex flex-col items-start text-white px-4 sm:px-8 md:ml-16">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-6 text-left">
          Drive Your Dreams Today!
        </h1>
        <button
          className="btn btn-primary px-5 py-2 sm:px-8 sm:py-3 text-base sm:text-lg shadow-lg"
          onClick={() => navigate("/available-cars")}
        >
          View Available Cars
        </button>
      </div>
    </section>
  );
};

export default BannerSection;