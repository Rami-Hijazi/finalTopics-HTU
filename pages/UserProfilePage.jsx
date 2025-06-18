
import React from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar';

export default function UserProfilePage() {
  
  const user = {
    name: 'Guest User',
    email: 'guest@example.com',
    picture: '/default-avatar.png',
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <UserAvatar src={user.picture} alt={user.name} size={80} />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <Link
          to="/events/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Event
        </Link>
        <Link
          to="/my-rsvps"
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          My RSVPs
        </Link>
      </div>
    </div>
  );
}
