
import React from 'react';

export default function EventFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        {}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        {}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">All</option>
            <option value="workshop">Workshop</option>
            <option value="social">Social</option>
            <option value="charity">Charity</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
        </div>
        {}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter city or venue"
            value={filters.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
      </div>
    </div>
  );
}
