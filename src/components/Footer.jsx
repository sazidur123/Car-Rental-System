import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-900 text-red-100 py-10 mt-16 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 px-4">
        {/* Left Section: Logo, Title, About, Location */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/automobile-car-drive-ride-silhouette-styli-car-rental-logo-11563237916okmwcwglxx.png"
              alt="CarRental Logo"
              className="w-12 h-12 rounded-full shadow-lg border-2 border-red-100"
            />
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide drop-shadow-lg">
              CarRental
            </span>
          </div>
          <div className="mb-2 text-sm opacity-90">
            <span className="font-semibold">About Us:</span>
            <p className="mt-1">
              CarRental is your trusted partner for premium car rentals, offering a wide range of vehicles for every journey.
            </p>
          </div>
          <div className="text-sm opacity-90 mt-2">
            <span className="font-semibold">Location:</span>
            <p className="mt-1">2685 California Street, Mountain View CA 94040</p>
          </div>
        </div>

        {/* Middle Section: Contact & Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-base sm:text-lg font-bold mb-2">Contact</h3>
          <div className="text-sm mb-2">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:support@carrental.com"
              className="underline hover:text-red-300 transition"
            >
              support@carrental.com
            </a>
          </div>
          <div className="text-sm mb-4">
            <span className="font-semibold">Phone:</span>{" "}
            <a
              href="tel:+1234567890"
              className="underline hover:text-red-300 transition"
            >
              +1 234 567 890
            </a>
          </div>
          <div className="flex gap-4 mt-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:scale-110 transition-transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.388 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.855 2.01-.855 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:scale-110 transition-transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-110 transition-transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Section: Payment Systems */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-base sm:text-lg font-bold mb-2">We Support</h3>
          <div className="flex gap-3 sm:gap-4 mt-2 flex-wrap justify-center md:justify-end">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvGspplJJLok3PvZdIoyIpKQ6q-TtIEy5PzQ&s" alt="Visa" className="h-7 w-12 sm:h-8 sm:w-14 object-contain bg-white rounded p-1" />
            <img src="https://icon2.cleanpng.com/20180201/syq/aviebu6z5.webp" alt="Mastercard" className="h-7 w-12 sm:h-8 sm:w-14 object-contain bg-white rounded p-1" />
            <img src="https://www.citypng.com/public/uploads/preview/transparent-hd-paypal-logo-701751694777788ilpzr3lary.png" alt="PayPal" className="h-7 w-12 sm:h-8 sm:w-14 object-contain bg-white rounded p-1" />
            <img src="https://img.favpng.com/13/1/22/logo-american-express-computer-icons-sign-payment-png-favpng-HCQznhg3JtcZuTZ499cTjaR44.jpg" alt="Amex" className="h-7 w-12 sm:h-8 sm:w-14 object-contain bg-white rounded p-1" />
          </div>
          <div className="text-xs text-gray-200 mt-2 text-center md:text-right">Visa, Mastercard, PayPal, Amex</div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-200 mt-8 opacity-80 px-2">
        © {new Date().getFullYear()} CarRental. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;