
import React from 'react';

export default function AttendeeList({ attendees }) {
  if (!attendees || attendees.length === 0) {
    return <p className="text-gray-600">No attendees yet.</p>;
  }

  return (
    <div className="flex -space-x-2">
      {attendees.map(attendee => (
        <img
          key={attendee.userId || attendee.id}
          src={attendee.picture || '/default-avatar.png'}
          alt={attendee.name || 'Attendee'}
          title={attendee.name}
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
        />
      ))}
    </div>
  );
}
