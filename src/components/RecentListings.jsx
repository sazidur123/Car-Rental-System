import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/cars?sort=date_new")
      .then((res) => setCars(res.data.slice(0, 8)))
      .catch(() => setCars([]));
  }, []);

  // Helper to show "Added X days ago"
  const daysAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : diff === 1 ? "1 day ago" : `${diff} days ago`;
  };

  return (
    <section className="max-w-7xl mx-auto my-10 sm:my-16 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-indigo-700 text-center">Recent Listings</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-[340px] sm:h-[360px] md:h-[380px] lg:h-[400px]"
          >
            <img
              src={car.imageUrl}
              alt={car.model}
              className="h-28 sm:h-32 md:h-36 lg:h-40 w-full object-cover"
            />
            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-1">{car.model}</h3>
              <div className="text-xs text-gray-500 mb-2 line-clamp-2">{car.description || "No description available."}</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary font-semibold text-sm sm:text-base">${car.dailyPrice}/day</span>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  car.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {car.available ? "Available" : "Unavailable"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">
                  {car.bookingCount || 0} bookings
                </span>
                <span className="text-xs text-gray-400">
                  Added: {daysAgo(car.dateAdded)}
                </span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  className="flex-1 px-3 py-2 rounded-full bg-gradient-to-r from-red-600 to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow hover:from-red-700 hover:to-indigo-600 transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-400"
                  disabled={!car.available}
                >
                  Book Now
                </button>
                <button
                  className="flex-1 px-3 py-2 rounded-full bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold border border-gray-300 shadow hover:bg-gradient-to-r hover:from-red-100 hover:to-indigo-100 hover:text-red-700 transition-all duration-200"
                  onClick={() => navigate(`/car/${car._id}`)}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;