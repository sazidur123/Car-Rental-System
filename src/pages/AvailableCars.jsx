import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";
import api from "../utils/api";
import { FaTh, FaList, FaSearch } from "react-icons/fa";
import DocumentTitle from "../hooks/DocumentTitle";

const sortOptions = [
  { value: "date_new", label: "Date Added (Newest First)" },
  { value: "date_old", label: "Date Added (Oldest First)" },
  { value: "price_asc", label: "Price (Lowest First)" },
  { value: "price_desc", label: "Price (Highest First)" },
];

const sortCars = (cars, sort) => {
  switch (sort) {
    case "date_new":
      return [...cars].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    case "date_old":
      return [...cars].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    case "price_asc":
      return [...cars].sort((a, b) => a.dailyPrice - b.dailyPrice);
    case "price_desc":
      return [...cars].sort((a, b) => b.dailyPrice - a.dailyPrice);
    default:
      return cars;
  }
};

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("date_new");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/cars?available=true")
      .then((res) => setCars(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Filter and sort on frontend
  const filteredCars = sortCars(
    cars.filter(car =>
      car.model.toLowerCase().includes(search.toLowerCase()) ||
      (car.location && car.location.toLowerCase().includes(search.toLowerCase()))
    ),
    sort
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-14">
      <DocumentTitle title="Car Rental System | Available Cars"/>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-center sm:text-left">Available Cars</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          {/* Modern Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by model or location"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {/* Modern Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-600">Sort by:</label>
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-8 text-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200 shadow-sm"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">&#9662;</span>
            </div>
          </div>
          {/* View Toggle Buttons */}
          <div className="flex items-center gap-1 ml-0 sm:ml-2 mt-2 sm:mt-0">
            <button
              className={`btn btn-sm rounded-full ${view === "grid"
                ? "bg-gradient-to-r from-red-600 to-indigo-500 text-white shadow"
                : "bg-gray-100 text-gray-700"} hover:bg-gradient-to-r hover:from-red-700 hover:to-indigo-600 hover:text-white transition-all`}
              onClick={() => setView("grid")}
              title="Grid View"
            >
              <FaTh />
            </button>
            <button
              className={`btn btn-sm rounded-full ${view === "list"
                ? "bg-gradient-to-r from-red-600 to-indigo-500 text-white shadow"
                : "bg-gray-100 text-gray-700"} hover:bg-gradient-to-r hover:from-red-700 hover:to-indigo-600 hover:text-white transition-all`}
              onClick={() => setView("list")}
              title="List View"
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : filteredCars.length === 0 ? (
        <div className="text-center text-gray-500">No cars available.</div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCars.map(car => (
            <div
              key={car._id}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-[370px] sm:h-[390px] md:h-[410px] lg:h-[430px]"
            >
              <img
                src={car.imageUrl}
                alt={car.model}
                className="h-32 sm:h-36 md:h-40 lg:h-44 w-full object-cover"
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
                    Added: {new Date(car.dateAdded).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/car/${car._id}`}
                    className="flex-1 px-3 py-2 rounded-full bg-gradient-to-r from-red-600 to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow hover:from-red-700 hover:to-indigo-600 transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-400 text-center"
                  >
                    Book Now
                  </Link>
                  <Link
                    to={`/car/${car._id}`}
                    className="flex-1 px-3 py-2 rounded-full bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold border border-gray-300 shadow hover:bg-gradient-to-r hover:from-red-100 hover:to-indigo-100 hover:text-red-700 transition-all duration-200 text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCars.map(car => (
            <div key={car._id} className="flex flex-col md:flex-row bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl items-center">
              <img
                src={car.imageUrl}
                alt={car.model}
                className="h-32 w-full md:w-48 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              />
              <div className="flex-1 p-4 sm:p-5 flex flex-col">
                <h3 className="font-bold text-lg mb-1">{car.model}</h3>
                <div className="text-primary font-semibold mb-1">${car.dailyPrice}/day</div>
                <div className="text-sm text-gray-500 mb-1">{car.location}</div>
                <div className="text-xs text-gray-400 mb-1">
                  Added: {new Date(car.dateAdded).toLocaleDateString()}
                </div>
                <p className="text-sm mb-2">{car.description}</p>
                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/car/${car._id}`}
                    className="flex-1 px-3 py-2 rounded-full bg-gradient-to-r from-red-600 to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow hover:from-red-700 hover:to-indigo-600 transition-all duration-200 text-center"
                  >
                    Book Now
                  </Link>
                  <Link
                    to={`/car/${car._id}`}
                    className="flex-1 px-3 py-2 rounded-full bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold border border-gray-300 shadow hover:bg-gradient-to-r hover:from-red-100 hover:to-indigo-100 hover:text-red-700 transition-all duration-200 text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
