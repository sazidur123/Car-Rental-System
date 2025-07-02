import React from "react";

const About = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 mt-16">
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center">
      <img
        src="/automobile-car-drive-ride-silhouette-styli-car-rental-logo-11563237916okmwcwglxx.png"
        alt="Car Rental Logo"
        className="w-20 h-20 rounded-full object-cover mb-4 shadow"
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-4 text-center">
        About Car Rental Service
      </h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        Welcome to <span className="font-semibold text-red-600">Car Rental Service</span> – your trusted partner for convenient, affordable, and reliable car rentals. Whether you need a car for a weekend getaway, a business trip, or daily commuting, we offer a wide selection of vehicles to suit every need and budget.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-6">
        <div className="bg-gradient-to-r from-red-100 to-indigo-100 rounded-xl p-6 shadow flex flex-col items-center">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Our Mission</h2>
          <p className="text-gray-600 text-center">
            To make car rental easy, transparent, and accessible for everyone. We focus on customer satisfaction, safety, and providing the best value for your money.
          </p>
        </div>
        <div className="bg-gradient-to-r from-indigo-100 to-red-100 rounded-xl p-6 shadow flex flex-col items-center">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Why Choose Us?</h2>
          <ul className="text-gray-600 list-disc list-inside text-center">
            <li>Wide range of cars: economy, luxury, SUVs, and more</li>
            <li>Simple online booking and instant confirmation</li>
            <li>Transparent pricing, no hidden fees</li>
            <li>24/7 customer support</li>
            <li>Fully insured vehicles</li>
          </ul>
        </div>
      </div>
      <div className="w-full bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
        <h2 className="text-xl font-bold text-indigo-700 mb-2">Contact Us</h2>
        <p className="text-gray-700 mb-1">Have questions or need help?</p>
        <p className="text-gray-700 mb-1">
          Email: <a href="mailto:support@carrental.com" className="text-red-600 underline">support@carrental.com</a>
        </p>
        <p className="text-gray-700">
          Phone: <a href="tel:+1234567890" className="text-red-600 underline">+1 234 567 890</a>
        </p>
      </div>
    </div>
  </div>
);

export default About;