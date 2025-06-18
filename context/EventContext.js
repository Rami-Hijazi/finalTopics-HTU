import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const EventContext = createContext();

export function EventProvider({ children }) {
  const { user } = useContext(AuthContext);

  
  const [events, setEvents] = useState([]);

  
  const [joinedMap, setJoinedMap] = useState(
    () => JSON.parse(localStorage.getItem('joinedMap') || '{}')
  );

  
  useEffect(() => {
    localStorage.setItem('joinedMap', JSON.stringify(joinedMap));
  }, [joinedMap]);

  
  const joinedEvents = user ? (joinedMap[user] || []) : [];

  
  const addEvent = (eventData) => {
    if (!user) return;
    const id = Date.now().toString();
    setEvents(prev => [
      ...prev,
      { ...eventData, id, createdBy: user }
    ]);
  };

  
  const joinEvent = (eventId) => {
    if (!user) return;
    setJoinedMap(prev => {
      const list = prev[user] || [];
      if (list.includes(eventId)) return prev;
      return { ...prev, [user]: [...list, eventId] };
    });
  };

  
  const leaveEvent = (eventId) => {
    if (!user) return;
    setJoinedMap(prev => {
      const list = prev[user] || [];
      return { ...prev, [user]: list.filter(id => id !== eventId) };
    });
  };

  const deleteEvent = (eventId) => {
    
    setEvents(prev => prev.filter(e => e.id !== eventId));

    
    setJoinedMap(prev => {
      const next = {};
      Object.entries(prev).forEach(([username, ids]) => {
        next[username] = ids.filter(id => id !== eventId);
      });
      return next;
    });
  };

  return (
    <EventContext.Provider value={{
      events,
      joinedMap,
      joinedEvents,
      addEvent,
      joinEvent,
      leaveEvent,
      deleteEvent,
    }}>
      {children}
    </EventContext.Provider>
  );
}
