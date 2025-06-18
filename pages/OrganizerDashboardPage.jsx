
import React, { useState, useEffect, useContext } from 'react';
import '../styles/global.css';
import { getOrganizerEvents, deleteEvent } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function OrganizerDashboardPage() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      setEvents(await getOrganizerEvents(user));
    }
    load();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Really delete this event?')) return;
    await deleteEvent(id);
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  if (!user) return <p>Please log in to see your dashboard.</p>;

  const today = new Date();
  const upcoming = events.filter(e => new Date(e.date) >= today);
  const past     = events.filter(e => new Date(e.date) <  today);

  return (
    <main className="dashboard-container">
      <h2>My Dashboard</h2>

      <section>
        <h3>Upcoming Events</h3>
        {upcoming.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          <div className="event-grid">
            {upcoming.map(evt => (
              <div key={evt.id} className="event-card">
                {evt.image_url && (
                  <img
                    src={evt.image_url}
                    alt={evt.title}
                    className="event-image"
                  />
                )}
                <div className="event-details">
                  <h4>{evt.title}</h4>
                  <p><strong>Date:</strong> {evt.date}</p>
                  <p><strong>Time:</strong> {evt.time}</p>
                  <p><strong>Location:</strong> {evt.location}</p>
                  <p><strong>Category:</strong> {evt.category}</p>
                  <p><strong>Attendees:</strong></p>
                  <ul className="mb-2">
                    {evt.attendees.map(u => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="delete-button"
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h3>Past Events</h3>
        {past.length === 0 ? (
          <p>No past events.</p>
        ) : (
          <div className="event-grid">
            {past.map(evt => (
              <div key={evt.id} className="event-card">
                {evt.image_url && (
                  <img
                    src={evt.image_url}
                    alt={evt.title}
                    className="event-image"
                  />
                )}
                <div className="event-details">
                  <h4>{evt.title}</h4>
                  <p><strong>Date:</strong> {evt.date}</p>
                  <p><strong>Time:</strong> {evt.time}</p>
                  <p><strong>Location:</strong> {evt.location}</p>
                  <p><strong>Category:</strong> {evt.category}</p>
                  <p><strong>Attendees:</strong></p>
                  <ul>
                    {evt.attendees.map(u => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
