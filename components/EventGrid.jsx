
import React from 'react';
import EventCard from './EventCard';

export default function EventGrid({ events }) {
  if (!events || events.length === 0) {
    return <div className="text-center text-gray-600 py-10">No events found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
