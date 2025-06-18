
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { getEventById, rsvpEvent, leaveEvent } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function EventDetailPage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const e = await getEventById(id);
      setEvent(e);
      setAttendees(e.attendees || []);
      setJoined(user ? e.attendees?.includes(user) : false);
      setLoading(false);
    }
    load();
  }, [id, user]);

  const handleRSVP = async () => {
    if (!user) return alert('Please log in first.');
    if (joined) {
      await leaveEvent(id, user);
      setAttendees(a => a.filter(u => u !== user));
      setJoined(false);
    } else {
      await rsvpEvent(id, user);
      setAttendees(a => [...a, user]);
      setJoined(true);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!event) return <p>Event not found.</p>;

  return (
    <main className="max-w-3xl mx-auto p-4">
      <div className="mb-4 h-64 w-full bg-gray-200 rounded-lg overflow-hidden">
        {event.image_url
          ? <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
          : <div className="flex items-center justify-center h-full text-gray-400">No Image</div>}
      </div>

      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-1">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
      <p className="text-gray-600 mb-4">{event.location}</p>

      {user && (
        <button
          onClick={handleRSVP}
          className={`px-4 py-2 rounded text-white ${joined ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
        >
          {joined ? 'Leave Event' : 'RSVP'}
        </button>
      )}

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{event.description}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Attendees ({attendees.length})</h2>
        {attendees.length === 0
          ? <p className="text-gray-600">No attendees yet.</p>
          : <ul className="list-disc list-inside">
            {attendees.map(u => <li key={u}>{u}</li>)}
          </ul>}
      </section>
    </main>
  );
}
