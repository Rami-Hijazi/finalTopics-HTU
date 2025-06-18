
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  location: yup.string().required('Location is required'),
  category: yup.string().required('Category is required'),
  imageUrl: yup.string().url('Must be a valid URL').nullable(),
});

const categories = [
  { value: '', label: 'Select category' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'social', label: 'Social' },
  { value: 'charity', label: 'Charity' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' },
];

export default function EventForm({ initialValues = {}, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      imageUrl: '',
      ...initialValues
    }
  });

  const submitHandler = (data) => {
    
    const dateTime = new Date(`${data.date}T${data.time}`);
    onSubmit({
      ...data,
      date: dateTime.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date')}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
          {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            {...register('time')}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
          {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>}
        </div>
      </div>

      {}
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          {...register('location')}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
        {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
      </div>

      {}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('category')}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
      </div>

      {}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          {...register('imageUrl')}
          placeholder="https://example.com/image.jpg"
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
        {errors.imageUrl && <p className="text-red-600 text-sm mt-1">{errors.imageUrl.message}</p>}
      </div>

      {}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {submitting ? 'Saving...' : 'Save Event'}
        </button>
      </div>
    </form>
  );
}
