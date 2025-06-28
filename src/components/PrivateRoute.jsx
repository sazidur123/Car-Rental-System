import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../auth';
import { onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;