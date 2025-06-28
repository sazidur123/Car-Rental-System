import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import api from '../utils/api';

const CarList = ({ limit = 8 }) => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    api.get(`/cars?limit=${limit}`).then(res => setCars(res.data));
  }, [limit]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cars.map(car => <CarCard key={car._id} car={car} />)}
    </div>
  );
};

export default CarList;