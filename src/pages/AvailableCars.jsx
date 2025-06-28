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
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by model or location"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input input-bordered pl-10"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <label className="font-semibold mr-2">Sort by:</label>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="select select-bordered"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            className={`btn btn-sm ml-4 ${view === "grid" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setView("grid")}
            title="Grid View"
          >
            <FaTh />
          </button>
          <button
            className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setView("list")}
            title="List View"
          >
            <FaList />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : filteredCars.length === 0 ? (
        <div className="text-center text-gray-500">No cars available.</div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCars.map(car => (
            <CarCard key={car._id} car={car}>
              <Link to={`/car/${car._id}`} className="btn btn-primary w-full mt-2">
                Book Now
              </Link>
            </CarCard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCars.map(car => (
            <div key={car._id} className="flex flex-col md:flex-row bg-base-100 rounded shadow p-4 items-center">
              <img
                src={car.imageUrl}
                alt={car.model}
                className="h-32 w-48 object-cover rounded mb-3 md:mb-0 md:mr-6"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{car.model}</h3>
                <div className="text-primary font-semibold">${car.dailyPrice}/day</div>
                <div className="text-sm text-gray-500">{car.location}</div>
                <div className="text-xs text-gray-400">
                  Added: {new Date(car.dateAdded).toLocaleDateString()}
                </div>
                <p className="text-sm mt-2">{car.description}</p>
              </div>
              <div className="flex flex-col gap-2 ml-0 md:ml-6 mt-4 md:mt-0">
                <Link
                  to={`/car/${car._id}`}
                  className="btn btn-outline btn-primary"
                >
                  View Details
                </Link>
                <Link
                  to={`/car/${car._id}`}
                  className="btn btn-primary"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
