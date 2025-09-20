import React from 'react';
// For simplicity, a placeholder for a map picker
export default function MapPicker({ location, onChange }) {
  return (
    <input
      type="text"
      placeholder="Enter location or coordinates"
      value={location || ''}
      onChange={e => onChange(e.target.value)}
      className="input-text"
    />
  );
}
