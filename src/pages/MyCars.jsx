import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaCarSide } from "react-icons/fa";
import DocumentTitle from "../hooks/DocumentTitle";

const initialForm = {
  model: "",
  dailyPrice: "",
  available: true,
  registrationNumber: "",
  features: "",
  description: "",
  imageUrl: "",
  location: "",
};

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [editForm, setEditForm] = useState(initialForm);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingCar, setDeletingCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    setLoading(true);
    api.get("/cars")
      .then(res => {
        const userId = localStorage.getItem("userId");
        setCars(res.data.filter(car => car.owner === userId));
      })
      .finally(() => setLoading(false));
  };

  // --- Update ---
  const openEditModal = (car) => {
    setEditingCar(car);
    setEditForm({
      ...car,
      features: Array.isArray(car.features) ? car.features.join(", ") : car.features || "",
      dailyPrice: car.dailyPrice || "",
      available: car.available ? "true" : "false",
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "available") value = value === "true";
    setEditForm({ ...editForm, [e.target.name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/cars/${editingCar._id}`, {
        ...editForm,
        dailyPrice: Number(editForm.dailyPrice),
        features: editForm.features.split(",").map(f => f.trim()).filter(Boolean),
      });
      toast.success("Car updated!");
      setShowEditModal(false);
      fetchCars();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to update car.");
    }
  };

  // --- Delete ---
  const openDeleteModal = (car) => {
    setDeletingCar(car);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cars/${deletingCar._id}`);
      toast.success("Car deleted!");
      setShowDeleteModal(false);
      fetchCars();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to delete car.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DocumentTitle title="Car Rental System | My Cars"/>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-indigo-500 text-white shadow-lg">
            <FaCarSide className="text-3xl" />
          </span>
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight drop-shadow-lg">
            My Cars
          </h2>
        </div>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : cars.length === 0 ? (
          <div className="text-center bg-white/80 rounded-2xl shadow-xl p-10">
            <p className="text-lg font-semibold mb-2">No cars added yet.</p>
            <a
              href="/add-car"
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-red-600 to-indigo-500 text-white font-bold shadow-md hover:from-red-700 hover:to-indigo-600 transition-all"
            >
              Add a car
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md">
            <table className="table w-full">
              <thead>
                <tr className="text-primary text-lg">
                  <th>Image</th>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Bookings</th>
                  <th>Available</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car._id} className="hover:bg-indigo-50/60 transition">
                    <td>
                      <img
                        src={car.imageUrl}
                        alt={car.model}
                        className="h-14 w-24 object-cover rounded-lg shadow"
                      />
                    </td>
                    <td className="font-semibold">{car.model}</td>
                    <td className="text-primary font-bold">${car.dailyPrice}</td>
                    <td>{car.bookingCount || 0}</td>
                    <td>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${car.available ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                        {car.available ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="text-xs text-gray-500">
                      {car.dateAdded ? new Date(car.dateAdded).toLocaleDateString() : "-"}
                    </td>
                    <td className="space-x-2">
                      <button
                        className="inline-flex items-center justify-center btn btn-xs rounded-full bg-indigo-500 text-white hover:bg-indigo-600 shadow transition-all"
                        onClick={() => openEditModal(car)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="inline-flex items-center justify-center btn btn-xs rounded-full bg-red-600 text-white hover:bg-red-700 shadow transition-all"
                        onClick={() => openDeleteModal(car)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Edit Modal --- */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-all">
            <form
              onSubmit={handleEditSubmit}
              className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-4 relative animate-fade-in"
            >
              <button
                type="button"
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
                onClick={() => setShowEditModal(false)}
                aria-label="Close"
              >×</button>
              <h3 className="text-2xl font-bold mb-2 text-indigo-600 flex items-center gap-2">
                <FaEdit /> Update Car
              </h3>
              <input
                name="model"
                value={editForm.model}
                onChange={handleEditChange}
                placeholder="Car Model"
                required
                className="input input-bordered w-full"
              />
              <input
                name="dailyPrice"
                type="number"
                value={editForm.dailyPrice}
                onChange={handleEditChange}
                placeholder="Daily Rental Price"
                required
                className="input input-bordered w-full"
              />
              <select
                name="available"
                value={editForm.available ? "true" : "false"}
                onChange={handleEditChange}
                className="input input-bordered w-full"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
              <input
                name="registrationNumber"
                value={editForm.registrationNumber}
                onChange={handleEditChange}
                placeholder="Registration Number"
                required
                className="input input-bordered w-full"
              />
              <input
                name="features"
                value={editForm.features}
                onChange={handleEditChange}
                placeholder="Features (comma separated)"
                className="input input-bordered w-full"
              />
              <input
                name="imageUrl"
                value={editForm.imageUrl}
                onChange={handleEditChange}
                placeholder="Image URL"
                required
                className="input input-bordered w-full"
              />
              <input
                name="location"
                value={editForm.location}
                onChange={handleEditChange}
                placeholder="Location"
                required
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="textarea textarea-bordered w-full"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-red-500 text-white font-bold text-lg shadow-lg hover:from-indigo-600 hover:to-red-600 transition-all duration-200 mt-2 flex items-center justify-center gap-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* --- Delete Modal --- */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-all">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-fade-in">
              <h3 className="text-2xl font-bold mb-4 text-red-600 flex items-center gap-2 justify-center">
                <FaTrash /> Delete Car
              </h3>
              <p>Are you sure you want to delete <b>{deletingCar.model}</b>?</p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error shadow"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;