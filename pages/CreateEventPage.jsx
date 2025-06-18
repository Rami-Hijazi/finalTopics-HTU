
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import { createEvent } from '../services/api';       
import { AuthContext } from '../context/AuthContext';

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData(prev => ({ ...prev, imageFile: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const payload = {
      title:       formData.title,
      description: formData.description,
      date:        formData.date,
      time:        formData.time,
      location:    formData.location,
      category:    formData.category,
      image_url:   imagePreview || '',
      organizer:   user,
    };

    try {
      await createEvent(payload);      
      navigate('/events');
    } catch (err) {
      console.error(err);
      alert('Failed to create event.');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="create-event-form">
        {}
        <div>
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {}
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {}
        <div>
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {}
        <div>
          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {}
        <div>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {}
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {}
        {imagePreview && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px' }}
            />
          </div>
        )}

        {}
        <button type="submit">Save Event</button>
      </form>
    </div>
  );
}
