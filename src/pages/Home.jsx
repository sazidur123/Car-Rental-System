import React from 'react';
import Navbar from '../components/Navbar';
import WhyChooseUs from '../components/WhyChooseUs';
import SpecialOffers from '../components/SpecialOffers';
import BannerSection from '../components/BannerSection';
import RecentListings from '../components/RecentListings';

const Home = () => (
  <>
    <Navbar />
    <BannerSection />
    <WhyChooseUs />
    <RecentListings />
    <SpecialOffers />
  </>
);

export default Home;