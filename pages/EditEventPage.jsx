
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm from '../components/EventForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { getEventById, updateEvent } from '../services/api';
import { toast } from 'react-toastify';

export default function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      try {
        const data = await getEventById(id);
        setEventData(data);
      } catch (err) {
        console.error('Error loading event for edit:', err);
        toast.error('Failed to load event data.');
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await updateEvent(id, formData);
      toast.success('Event updated successfully!');
      navigate(`/events/${id}`);
    } catch (err) {
      console.error('Error updating event:', err);
      toast.error('Failed to update event.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Event</h1>
      <EventForm
        initialValues={eventData}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}
