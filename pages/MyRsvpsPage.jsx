
import React, { useState, useEffect, useContext } from 'react';
import '../styles/global.css';
import { getUserRsvps, leaveEvent } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyRsvpsPage() {
  const { user } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    async function load() {
      setMyEvents(await getUserRsvps(user));
    }
    load();
  }, [user]);

  const handleLeave = async (id) => {
    await leaveEvent(id, user);
    setMyEvents(prev => prev.filter(e => e.id !== id));
  };

  if (!user) return <p>Please log in to see your RSVPs.</p>;

  return (
    <main className="rsvps-container">
      <h1>My RSVPs</h1>
      {myEvents.length === 0 ? (
        <p>No upcoming RSVPs.</p>
      ) : (
        <div className="custom-event-grid">
          {myEvents.map(evt => (
            <div key={evt.id} className="custom-event-card">
              {evt.image_url && (
                <img
                  src={evt.image_url}
                  alt={evt.title}
                  className="custom-event-image"
                />
              )}
              <div className="custom-event-content">
                <h3>{evt.title}</h3>
                <p><strong>Date:</strong> {evt.date}</p>
                <p><strong>Time:</strong> {evt.time}</p>
                <p><strong>Location:</strong> {evt.location}</p>
                <p><strong>Category:</strong> {evt.category}</p>
                <button
                  onClick={() => handleLeave(evt.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded mt-2"
                >
                  Leave Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
