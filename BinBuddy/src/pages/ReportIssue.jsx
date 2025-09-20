import React, { useState } from 'react';
import MapPicker from '../components/MapPicker';

export default function ReportIssue() {
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('overflowing_bin');
  const [photo, setPhoto] = useState(null);

  const submitReport = () => {
    // Placeholder for submitting report logic (e.g., send to backend)
    alert('Report submitted!');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Report Sanitation Issue</h2>
      <div className="mb-4">
        <label className="block mb-1">Issue Type</label>
        <select value={type} onChange={e => setType(e.target.value)} className="input-select">
          <option value="overflowing_bin">Overflowing Bin</option>
          <option value="illegal_dumping">Illegal Dumping</option>
          <option value="unsanitary_location">Unsanitary Location</option>
          <option value="missed_pickup">Missed Pickup</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="input-textarea"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Upload Photo</label>
        <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Pick Location</label>
        <MapPicker location={location} onChange={setLocation} />
      </div>
      <button onClick={submitReport} className="btn-primary">Submit Report</button>
    </div>
  );
}
