import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaCarSide, FaDollarSign, FaMapMarkerAlt, FaRegListAlt, FaImage, FaClipboardList } from "react-icons/fa";
import toast from "react-hot-toast";
import DocumentTitle from '../hooks/DocumentTitle'

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
        features: form.features.split(",").map(f => f.trim()).filter(Boolean),
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
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <DocumentTitle title="Car Rental System | Add Car"/>
        <h2 className="text-3xl font-extrabold text-primary mb-2 flex items-center gap-2">
          <FaCarSide className="text-2xl" /> Add a New Car
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <FaCarSide className="absolute left-3 top-3 text-gray-400" />
            <input
              name="model"
              placeholder=" "
              value={form.model}
              onChange={handleChange}
              required
              className="input input-bordered w-full pl-10 peer"
            />
            <label className="absolute left-10 top-1 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">
              Car Model
            </label>
          </div>
          <div className="relative">
            <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
            <input
              name="dailyPrice"
              type="number"
              placeholder=" "
              value={form.dailyPrice}
              onChange={handleChange}
              required
              className="input input-bordered w-full pl-10 peer"
            />
            <label className="absolute left-10 top-1 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">
              Daily Rental Price
            </label>
          </div>
          <div className="relative">
            <FaClipboardList className="absolute left-3 top-3 text-gray-400" />
            <input
              name="registrationNumber"
              placeholder=" "
              value={form.registrationNumber}
              onChange={handleChange}
              required
              className="input input-bordered w-full pl-10 peer"
            />
            <label className="absolute left-10 top-1 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">
              Registration Number
            </label>
          </div>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              name="location"
              placeholder=" "
              value={form.location}
              onChange={handleChange}
              required
              className="input input-bordered w-full pl-10 peer"
            />
            <label className="absolute left-10 top-1 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">
              Location
            </label>
          </div>
          <div className="relative md:col-span-2">
            <FaRegListAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              name="features"
              placeholder=" "
              value={form.features}
              onChange={handleChange}
              className="input input-bordered w-full pl-10 peer"
            />
            <label className="absolute left-10 top-1 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">
              Features (comma separated, e.g. GPS, AC)
            </label>
          </div>
          <div className="relative md:col-span-2">
            <FaImage className="absolute left-3 top-3 text-gray-400" />
            <input
              name="imageUrl"
              placeholder=" "
              value={form.imageUrl}
              onChange={handleChange}
              required
              className="input input-bordered w-full pl-10 peer"
            />
            <label className="absolute left-10 top-1 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">
              Image URL
            </label>
          </div>
          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full min-h-[80px]"
            />
          </div>
          <div className="md:col-span-2">
            <select
              name="available"
              value={form.available ? "true" : "false"}
              onChange={handleChange}
              className="input input-bordered w-full"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4 shadow-lg transition-transform duration-200 hover:scale-105"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;