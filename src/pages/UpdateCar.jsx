import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import DocumentTitle from "../hooks/DocumentTitle";
const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(() => toast.error("Failed to load car"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/cars/${id}`, car);
      toast.success("Car updated!");
      navigate("/my-cars");
    } catch {
      toast.error("Failed to update car.");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!car) return <div className="text-center mt-10">Car not found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <DocumentTitle title="Car Rental System | Update Car"/>
      <h2 className="text-2xl font-bold mb-4">Update Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Model</label>
          <input
            type="text"
            name="model"
            value={car.model || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Daily Price</label>
          <input
            type="number"
            name="dailyPrice"
            value={car.dailyPrice || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={car.description || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={car.imageUrl || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Available</label>
          <select
            name="available"
            value={car.available ? "true" : "false"}
            onChange={e => setCar({ ...car, available: e.target.value === "true" })}
            className="border p-2 rounded w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={saving}
        >
          {saving ? "Saving..." : "Update Car"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;