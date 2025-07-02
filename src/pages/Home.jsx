import React from 'react';
import WhyChooseUs from '../components/WhyChooseUs';
import SpecialOffers from '../components/SpecialOffers';
import BannerSection from '../components/BannerSection';
import RecentListings from '../components/RecentListings';

// --- Modern Home Sections ---
const HowItWorks = () => (
  <section className="max-w-7xl mx-auto my-14 sm:my-20 px-2 sm:px-4">
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow">
      How It Works
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { icon: "🚗", title: "Choose Your Car", desc: "Browse our wide selection and pick your dream ride." },
        { icon: "📅", title: "Book Instantly", desc: "Select your dates and book in just a few clicks." },
        { icon: "🗝️", title: "Pick Up & Drive", desc: "Collect your car at your chosen location and enjoy." },
        { icon: "⭐", title: "Return & Review", desc: "Drop off the car and share your experience." },
      ].map((step, i) => (
        <div
          key={i}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center p-8 border-t-4 border-indigo-500 hover:border-red-500 transition-all duration-200"
        >
          <div className="text-5xl mb-4">{step.icon}</div>
          <h3 className="font-bold text-lg mb-2 text-indigo-700">{step.title}</h3>
          <p className="text-base text-gray-600 text-center">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const CustomerReviews = () => (
  <section className="max-w-7xl mx-auto my-14 sm:my-20 px-2 sm:px-4">
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow">
      What Our Customers Say
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: "Ayesha K.", review: "Booking was super easy and the car was spotless. Highly recommend!", rating: 5 },
        { name: "Omar R.", review: "Great prices and amazing customer service. Will rent again!", rating: 5 },
        { name: "Fatima S.", review: "Loved the selection of cars. The process was smooth and fast.", rating: 4 },
      ].map((r, i) => (
        <div
          key={i}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col border-l-4 border-red-500 hover:border-indigo-500 transition-all duration-200"
        >
          <div className="flex items-center mb-3">
            <span className="font-bold mr-2 text-indigo-700">{r.name}</span>
            <span className="text-yellow-400 text-lg">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
          </div>
          <p className="text-gray-700 text-base">{r.review}</p>
        </div>
      ))}
    </div>
  </section>
);

const OurPartners = () => (
  <section className="max-w-7xl mx-auto my-14 sm:my-20 px-2 sm:px-4">
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow">
      Our Trusted Partners
    </h2>
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center p-8 border-t-4 border-indigo-500 hover:border-red-500 hover:scale-105 transition-all duration-200">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Toyota_logo_%28Red%29.svg/800px-Toyota_logo_%28Red%29.svg.png?20241022114548" alt="Toyota" className="h-16 w-auto object-contain mb-4" loading="lazy" />
        <span className="text-gray-700 font-semibold text-lg">Toyota</span>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center p-8 border-t-4 border-indigo-500 hover:border-red-500 hover:scale-105 transition-all duration-200">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png" alt="BMW" className="h-16 w-auto object-contain mb-4" loading="lazy" />
        <span className="text-gray-700 font-semibold text-lg">BMW</span>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center p-8 border-t-4 border-indigo-500 hover:border-red-500 hover:scale-105 transition-all duration-200">
        <img src="https://static.vecteezy.com/system/resources/previews/020/498/719/non_2x/mercedes-brand-logo-symbol-black-design-german-car-automobile-illustration-free-vector.jpg" alt="Mercedes" className="h-16 w-auto object-contain mb-4" loading="lazy" />
        <span className="text-gray-700 font-semibold text-lg">Mercedes</span>
      </div>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center p-8 border-t-4 border-indigo-500 hover:border-red-500 hover:scale-105 transition-all duration-200">
        <img src="https://static.vecteezy.com/system/resources/previews/014/414/682/non_2x/audi-logo-on-transparent-background-free-vector.jpg" alt="Audi" className="h-16 w-auto object-contain mb-4" loading="lazy" />
        <span className="text-gray-700 font-semibold text-lg">Audi</span>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="max-w-4xl mx-auto my-14 sm:my-20 px-2 sm:px-4">
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow">
      Frequently Asked Questions
    </h2>
    <div className="space-y-6">
      {[
        {
          q: "What documents do I need to rent a car?",
          a: "You need a valid driving license and a national ID or passport."
        },
        {
          q: "Can I book a car for someone else?",
          a: "Yes, but the driver must present their own valid documents at pickup."
        },
        {
          q: "Is insurance included in the price?",
          a: "Yes, all rentals include basic insurance. Additional coverage is available."
        },
        {
          q: "What is your cancellation policy?",
          a: "You can cancel up to 24 hours before pickup for a full refund."
        }
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow p-6 border-l-4 border-indigo-500 hover:border-red-500 transition-all duration-200"
        >
          <h3 className="font-semibold mb-2 text-indigo-700">{item.q}</h3>
          <p className="text-gray-700 text-base">{item.a}</p>
        </div>
      ))}
    </div>
  </section>
);

const Home = () => (
  <>
    <BannerSection />
    <RecentListings />
    <WhyChooseUs />
    <SpecialOffers />
    <HowItWorks />
    <CustomerReviews />
    <OurPartners />
    <FAQSection />
  </>
);

export default Home;