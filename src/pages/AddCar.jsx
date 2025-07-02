import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  FaCarSide,
  FaDollarSign,
  FaMapMarkerAlt,
  FaRegListAlt,
  FaImage,
  FaClipboardList,
} from "react-icons/fa";
import toast from "react-hot-toast";
import DocumentTitle from "../hooks/DocumentTitle";

const AddCar = () => {
  const [form, setForm] = useState({
    model: "",
    dailyPrice: "",
    available: true,
    registrationNumber: "",
    features: "",
    description: "",
    bookingCount: 0,
    imageUrl: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "available") value = e.target.value === "true";
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/cars", {
        model: form.model,
        dailyPrice: Number(form.dailyPrice),
        available: form.available,
        registrationNumber: form.registrationNumber,
        features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
        description: form.description,
        bookingCount: 0,
        imageUrl: form.imageUrl,
        location: form.location,
      });
      toast.success("Car added!");
      navigate("/my-cars");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to add car.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 space-y-8 border border-gray-100"
      >
        <DocumentTitle title="Car Rental System | Add Car" />
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-indigo-500 text-white shadow-lg">
            <FaCarSide className="text-2xl" />
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Add a New Car
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Car Model */}
          <div className="relative">
            <FaCarSide className="absolute left-4 top-4 text-red-400" />
            <input
              name="model"
              placeholder="Car Model"
              value={form.model}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm placeholder-gray-400"
            />
          </div>
          {/* Daily Price */}
          <div className="relative">
            <FaDollarSign className="absolute left-4 top-4 text-red-400" />
            <input
              name="dailyPrice"
              type="number"
              placeholder="Daily Rental Price"
              value={form.dailyPrice}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm placeholder-gray-400"
            />
          </div>
          {/* Registration Number */}
          <div className="relative">
            <FaClipboardList className="absolute left-4 top-4 text-red-400" />
            <input
              name="registrationNumber"
              placeholder="Registration Number"
              value={form.registrationNumber}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm placeholder-gray-400"
            />
          </div>
          {/* Location */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-4 top-4 text-red-400" />
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm placeholder-gray-400"
            />
          </div>
          {/* Features */}
          <div className="relative md:col-span-2">
            <FaRegListAlt className="absolute left-4 top-4 text-red-400" />
            <input
              name="features"
              placeholder="Features (comma separated, e.g. GPS, AC)"
              value={form.features}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm placeholder-gray-400"
            />
          </div>
          {/* Image URL */}
          <div className="relative md:col-span-2">
            <FaImage className="absolute left-4 top-4 text-red-400" />
            <input
              name="imageUrl"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm placeholder-gray-400"
            />
          </div>
          {/* Description */}
          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm min-h-[80px] placeholder-gray-400"
            />
          </div>
          {/* Availability */}
          <div className="md:col-span-2">
            <select
              name="available"
              value={form.available ? "true" : "false"}
              onChange={handleChange}
              className="w-full pl-4 pr-8 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-gray-50 text-gray-700 transition-all duration-200 shadow-sm"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-indigo-500 text-white font-bold text-lg shadow-lg hover:from-red-700 hover:to-indigo-600 transition-all duration-200 mt-2 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Adding...
            </>
          ) : (
            <>
              <FaCarSide /> Add Car
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCar;