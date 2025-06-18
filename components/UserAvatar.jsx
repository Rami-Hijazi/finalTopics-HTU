
import React from 'react';

export default function UserAvatar({ src, alt = 'User avatar', size = 32 }) {
  const dimension = `${size}px`;
  return (
    <img
      src={src || '/default-avatar.png'}
      alt={alt}
      style={{ width: dimension, height: dimension }}
      className="rounded-full object-cover"
    />
  );
}
