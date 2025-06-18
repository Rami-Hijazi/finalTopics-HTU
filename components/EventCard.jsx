import React, { useContext } from 'react';
import '../styles/global.css';
import { EventContext } from '../context/EventContext';
import { useNavigate } from 'react-router-dom';

export default function EventCard({ event }) {
  const { joinedEvents, joinEvent, leaveEvent } = useContext(EventContext);
  const isJoined = joinedEvents.includes(event.id);
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Category:</strong> {event.category}</p>
      </div>

      <div className="card-buttons">
        <button
          className="btn-view"
          onClick={() => navigate(`/events/${event.id}`)}
        >
          View Details
        </button>

        {!isJoined ? (
          <button
            className="btn-join"
            onClick={() => joinEvent(event.id)}
          >
            Join the Event
          </button>
        ) : (
          <button
            className="btn-leave"
            onClick={() => leaveEvent(event.id)}
          >
            Leave Event
          </button>
        )}
      </div>
    </div>
  );
}
