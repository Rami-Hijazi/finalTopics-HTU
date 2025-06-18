
import React, { useState, useEffect, useContext } from 'react';
import '../styles/global.css';
import { getEvents, rsvpEvent, leaveEvent, getUserRsvps } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EventsPage() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [joinedIds, setJoinedIds] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    async function load() {
      const ev = await getEvents();
      setEvents(ev);
      if (user) {
        const my = await getUserRsvps(user);
        setJoinedIds(my.map(e => e.id));
      }
    }
    load();
  }, [user]);

  const handleJoin = async (id) => {
    await rsvpEvent(id, user);
    setJoinedIds(prev => [...prev, id]);
  };
  const handleLeave = async (id) => {
    await leaveEvent(id, user);
    setJoinedIds(prev => prev.filter(x => x !== id));
  };

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <div className="custom-event-grid">
        {events.map(evt => (
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
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => navigate(`/events/${evt.id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  View Details
                </button>
                {user &&
                  (joinedIds.includes(evt.id) ? (
                    <button
                      onClick={() => handleLeave(evt.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoin(evt.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Join
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
