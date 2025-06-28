import React from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from '../hooks/DocumentTitle';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
    <DocumentTitle title="Car Rental System | Not Found"/>
    <img src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="404" className="w-72 mb-6" />
    <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
    <Link to="/">
      <button className="btn btn-primary">Back to Home</button>
    </Link>
  </div>
);

export default NotFound;