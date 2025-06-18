
import React, { useState } from 'react';
import Modal from 'react-modal';
import { rsvpEvent } from '../services/api';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

export default function RSVPModal({ isOpen, onClose, eventId }) {
  const [guestCount, setGuestCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await rsvpEvent(eventId, { guestCount });
      toast.success('RSVP successful!');
      onClose();
    } catch (err) {
      console.error('RSVP failed:', err);
      toast.error('Failed to RSVP.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="RSVP Modal"
      className="bg-white rounded-lg p-6 max-w-md mx-auto mt-20 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      <h2 className="text-xl font-semibold mb-4">RSVP to Event</h2>
      <label className="block mb-2">
        Number of Guests:
        <input
          type="number"
          min="1"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {submitting ? 'Submitting...' : 'Confirm'}
        </button>
      </div>
    </Modal>
  );
}
