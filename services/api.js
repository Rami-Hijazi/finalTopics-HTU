
import axios from 'axios';
const api = axios.create({ baseURL: '/api' });


export async function getEvents(filters = {}) {
  const { data } = await api.get('/events', { params: filters });
  return data;
}
export async function getEventById(id) {
  const { data } = await api.get(`/events/${id}`);
  return data;
}
export async function createEvent(event) {
  const { data } = await api.post('/events', event);
  return data;
}
export async function updateEvent(id, event) {
  const { data } = await api.put(`/events/${id}`, event);
  return data;
}
export async function deleteEvent(id) {
  await api.delete(`/events/${id}`);
}


export async function rsvpEvent(eventId, username) {
  const { data } = await api.post(`/events/${eventId}/rsvp`, { username });
  return data; 
}
export async function leaveEvent(eventId, username) {
  await api.delete(`/events/${eventId}/rsvp`, { data: { username } });
}
export async function getUserRsvps(username) {
  const { data } = await api.get(`/rsvps/${username}`);
  return data; 
}


export async function getOrganizerEvents(username) {
  const { data } = await api.get(`/organizer/${username}`);
  return data; 
}
