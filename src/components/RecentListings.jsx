import React, { useEffect, useState } from "react";
import api from "../utils/api";

const RecentListings = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api
      .get("/cars?sort=date_new")
      .then((res) => setCars(res.data.slice(0, 6))) // Only take the first 6
      .catch(() => setCars([]));
  }, []);

  // Helper to show "Added X days ago"
  const daysAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : diff === 1 ? "1 day ago" : `${diff} days ago`;
  };

  return (
    <section className="max-w-6xl mx-auto my-10 sm:my-16 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Recent Listings</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
          >
            <img
              src={car.imageUrl}
              alt={car.model}
              className="h-40 sm:h-48 w-full object-cover"
            />
            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base sm:text-lg">{car.model}</h3>
                <span className="text-primary font-semibold text-sm sm:text-base">${car.dailyPrice}/day</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`badge ${car.available ? "badge-success" : "badge-error"} text-xs`}>
                  {car.available ? "Available" : "Unavailable"}
                </span>
                <span className="text-xs text-gray-400">
                  {car.bookingCount || 0} bookings
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Added: {daysAgo(car.dateAdded)}
              </div>
              <button
                className="btn btn-primary btn-xs sm:btn-sm mt-auto"
                disabled={!car.available}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;