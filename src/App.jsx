import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './auth';
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AvailableCars from './pages/AvailableCars';
import AddCar from './pages/AddCar';
import MyCars from './pages/MyCars';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import UpdateCar from './pages/UpdateCar';
import About from './pages/About';

function Layout({ user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout user={user} onLogout={handleLogout} />}>
            <Route path="/" element={<Home />} />
            <Route path="/available-cars" element={<AvailableCars />} />
            <Route path='/about' element={<About />} />
            <Route path="/add-car" element={
              <PrivateRoute>
                <AddCar />
              </PrivateRoute>
            } />
            <Route path="/my-cars" element={
              <PrivateRoute>
                <MyCars />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/my-bookings" element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update-car/:id" element={<UpdateCar />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
