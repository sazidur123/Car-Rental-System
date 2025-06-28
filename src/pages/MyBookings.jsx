import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { FaTrash, FaCalendarAlt, FaEraser } from "react-icons/fa";
import DocumentTitle from "../hooks/DocumentTitle";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyBooking, setModifyBooking] = useState(null);
  const [newDates, setNewDates] = useState({ start: "", end: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBooking, setDeleteBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    api.get("/bookings/my")
      .then(res => setBookings(res.data))
      .finally(() => setLoading(false));
  };

  const handleCancel = async () => {
    try {
      console.log(cancelBooking._id);
      await api.patch(`/bookings/${cancelBooking._id}/cancel`);
      toast.success("Booking canceled!");
      setShowCancelModal(false);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to cancel booking.");
    }
  };

  const handleModify = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/bookings/${modifyBooking._id}/modify`, {
        startDate: newDates.start,
        endDate: newDates.end,
      });
      toast.success("Booking updated!");
      setShowModifyModal(false);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to modify booking.");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/bookings/${deleteBooking._id}`);
      toast.success("Booking removed from history!");
      setShowDeleteModal(false);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to remove booking.");
    }
  };

  const formatDateTime = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB") + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const rowBg = (i) => (i % 2 === 0 ? "bg-white/80" : "bg-blue-50/60");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-10 mt-14">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <DocumentTitle title="Car Rental System | My Bookings"/>
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center text-primary drop-shadow-lg">
          My Bookings
        </h2>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center bg-white/70 rounded-xl shadow-lg p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold mb-2">No bookings found.</p>
            <a href="/available-cars" className="inline-block btn btn-primary mt-2 shadow-md">
              Book a car
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-2xl bg-white/70 backdrop-blur-md">
            <table className="table w-full min-w-[700px]">
              <thead>
                <tr className="text-primary text-base sm:text-lg bg-blue-100/80">
                  <th className="min-w-[100px]">Car Image</th>
                  <th className="min-w-[120px]">Car Model</th>
                  <th className="min-w-[160px]">Booking Date</th>
                  <th className="min-w-[100px]">Total Price</th>
                  <th className="min-w-[100px]">Status</th>
                  <th className="min-w-[140px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => {
                  return (
                    <tr
                      key={b._id}
                      className={`${rowBg(i)} hover:shadow-lg hover:bg-blue-200/40 transition`}
                    >
                      <td>
                        <img
                          src={b.car?.imageUrl}
                          alt={b.car?.model}
                          className="h-10 w-16 sm:h-14 sm:w-24 object-cover rounded-lg shadow"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fallback-image.png"; // Optional fallback image
                            console.error("Failed to load image:", b.car?.imageUrl);
                          }}
                        />
                      </td>
                      <td className="font-semibold text-xs sm:text-base">{b.car?.model}</td>
                      <td className="text-xs text-gray-700">
                        {formatDateTime(b.startDate)}<br />
                        <span className="text-gray-400">to</span><br />
                        {formatDateTime(b.endDate)}
                      </td>
                      <td className="text-primary font-bold text-xs sm:text-base">${b.totalPrice}</td>
                      <td>
                        <span className={`badge px-2 py-1 text-xs sm:text-sm ${
                          b.status === "confirmed"
                            ? "bg-red-100 text-red-700"
                            : b.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </td>
                      <td className="space-x-1 sm:space-x-2">
                        {b.status !== "canceled" ? (
                          <>
                            <button
                              className="btn btn-xs btn-error shadow flex items-center gap-1"
                              onClick={() => {
                                setCancelBooking(b);
                                setShowCancelModal(true);
                              }}
                              title="Cancel Booking"
                            >
                              <FaTrash /> <span className="hidden sm:inline">Cancel</span>
                            </button>
                            <button
                              className="btn btn-xs btn-info shadow flex items-center gap-1"
                              onClick={() => {
                                setModifyBooking(b);
                                setNewDates({
                                  start: b.startDate.slice(0, 16),
                                  end: b.endDate.slice(0, 16),
                                });
                                setShowModifyModal(true);
                              }}
                              title="Modify Booking Date"
                            >
                              <FaCalendarAlt /> <span className="hidden sm:inline">Modify Date</span>
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-xs btn-warning shadow flex items-center gap-1"
                            onClick={() => {
                              setDeleteBooking(b);
                              setShowDeleteModal(true);
                            }}
                            title="Remove from History"
                          >
                            <FaEraser /> <span className="hidden sm:inline">Clear History</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-fade-in">
              <h3 className="text-2xl font-bold mb-4 text-red-600">Cancel Booking</h3>
              <p>Are you sure you want to cancel your booking for <b>{cancelBooking.car?.model}</b>?</p>
              <div className="flex justify-center gap-4 mt-6">
                <button className="btn btn-ghost" onClick={() => setShowCancelModal(false)}>
                  No
                </button>
                <button className="btn btn-error shadow" onClick={handleCancel}>
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modify Modal */}
        {showModifyModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
              onSubmit={handleModify}
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md text-center animate-fade-in"
            >
              <button
                type="button"
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
                onClick={() => setShowModifyModal(false)}
              >×</button>
              <h3 className="text-2xl font-bold mb-4 text-primary">Modify Booking Dates</h3>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={newDates.start}
                  onChange={e => setNewDates({ ...newDates, start: e.target.value })}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={newDates.end}
                  onChange={e => setNewDates({ ...newDates, end: e.target.value })}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModifyModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-info shadow">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-fade-in">
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">Remove Booking</h3>
              <p>Are you sure you want to remove this booking for <b>{deleteBooking.car?.model}</b> from your history?</p>
              <div className="flex justify-center gap-4 mt-6">
                <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>
                  No
                </button>
                <button className="btn btn-warning shadow" onClick={handleDelete}>
                  Yes, Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
