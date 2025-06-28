import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { auth } from "../auth";
import DocumentTitle from "../hooks/DocumentTitle";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setLoading(true);
    api
      .get(`/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch(() => toast.error("Failed to load car details."))
      .finally(() => setLoading(false));
  }, [id]);

  const today = new Date().toISOString().split("T")[0]; 

  const handleBooking = async () => {
    if (!auth.currentUser) {
      toast.error("Please log in to book a car.");
      return;
    }

    if (!booking.startDate || !booking.endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    if (new Date(booking.endDate) <= new Date(booking.startDate)) {
      toast.error("End date must be after start date.");
      return;
    }

    // Calculate total price based on days and daily price
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.dailyPrice;

    setBookingLoading(true);

    try {
      await api.post("/bookings", {
        carId: car._id,       // use 'carId' key as backend expects
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalPrice,          // send calculated total price
      });
      toast.success("Booking successful!");
      setShowModal(false);
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to book car.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!car) return <div className="text-center mt-10">Car not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-14">
      <DocumentTitle title="Car Rental System | Car Details"/>
      <div className="bg-base-100 rounded shadow p-6 flex flex-col md:flex-row gap-6">
        <img
          src={car.imageUrl}
          alt={car.model}
          className="w-full md:w-80 h-56 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{car.model}</h2>
          <div className="text-primary font-semibold mb-2">${car.dailyPrice} / day</div>
          <div className="mb-2">
            <span className={`badge ${car.available ? "badge-success" : "badge-error"}`}>
              {car.available ? "Available" : "Not Available"}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Features:</span>
            <ul className="list-disc list-inside ml-2">
              {(car.features || []).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Description:</span>
            <p className="text-gray-700">{car.description}</p>
          </div>
          <button
            className="btn btn-primary"
            disabled={!car.available}
            onClick={() => setShowModal(true)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>
            <div className="mb-2"><b>Model:</b> {car.model}</div>
            <div className="mb-2"><b>Price Per Day:</b> ${car.dailyPrice}</div>
            <div className="mb-2"><b>Location:</b> {car.location}</div>
            <div className="mb-2"><b>Features:</b> {(car.features || []).join(", ")}</div>
            <div className="mb-4"><b>Description:</b> {car.description}</div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Start Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={booking.startDate}
                onChange={(e) => setBooking({ ...booking, startDate: e.target.value })}
                required
                min={today}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">End Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={booking.endDate}
                onChange={(e) => setBooking({ ...booking, endDate: e.target.value })}
                required
                min={booking.startDate || today}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleBooking}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Confirm & Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
