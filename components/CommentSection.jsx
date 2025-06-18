
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { getComments, postComment } from '../services/api';
import { toast } from 'react-toastify';

export default function CommentSection({ eventId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      try {
        const data = await getComments(eventId);
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
        toast.error('Failed to load comments.');
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !newComment.trim()) return;

    setSubmitting(true);
    try {
      const commentData = {
        name,
        text: newComment,
        eventId,
      };
      await postComment(eventId, commentData);
      setComments((prev) => [...prev, { ...commentData, createdAt: new Date().toISOString() }]);
      setNewComment('');
      toast.success('Comment added!');
    } catch (err) {
      console.error('Error posting comment:', err);
      toast.error('Failed to post comment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <ul className="space-y-4 mb-4">
        {comments.map((c, idx) => (
          <li key={idx} className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-800">
              <strong>{c.name}</strong>{' '}
              <span className="text-gray-500 text-xs">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </p>
            <p className="mt-1 text-gray-700">{c.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          disabled={submitting}
          className="border border-gray-300 rounded p-2"
        />
        <textarea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          disabled={submitting}
          className="border border-gray-300 rounded p-2 resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className={`self-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}
