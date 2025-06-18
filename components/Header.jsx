import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Community Events
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link to="/events" className="text-gray-600 hover:text-gray-800">Events</Link>
          <Link to="/my-rsvps" className="text-gray-600 hover:text-gray-800">My RSVPs</Link>
          <Link to="/events/new" className="text-gray-600 hover:text-gray-800">Create Event</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</Link>
        </nav>

        <div className="ml-4">
          {!user ? (
            <Link
              to="/login"
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Log In
            </Link>
          ) : (
            <>
              <span className="mr-2">Hi, {user}</span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
