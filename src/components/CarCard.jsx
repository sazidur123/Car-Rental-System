import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={car.imageUrl} alt={car.model} className="object-cover h-48 w-full" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{car.model}</h3>
        <p className="text-lg font-semibold text-primary">
          ${car.dailyPrice}
          <span className="text-base font-normal text-base-content/70">/day</span>
        </p>
        <span className={`badge ${car.available ? 'badge-success' : 'badge-error'} mb-2`}>
          {car.available ? 'Available' : 'Not Available'}
        </span>
        <p className="text-sm">
          Bookings: <span className="font-medium">{car.bookingCount}</span>
        </p>
        <p className="text-xs text-base-content/60">
          Added: {new Date(car.dateAdded).toLocaleDateString()}
        </p>
        <div className="card-actions justify-end mt-2 gap-2">
          <Link to={`/car/${car._id}`}>
            <button className="btn btn-outline">View Details</button>
          </Link>
          <Link to={`/car/${car._id}`}>
            <button
              className="btn btn-primary"
              disabled={!car.available}
              title={car.available ? "Book this car" : "Car not available"}
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
