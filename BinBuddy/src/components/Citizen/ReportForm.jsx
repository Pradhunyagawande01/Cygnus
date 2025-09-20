import React, { useState, useContext } from 'react';
import { Camera, Send } from 'lucide-react';
import { AppContext } from '../../context/ReportsContext';

export default function ReportForm() {
  const { addReport } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'overflowing_bin',
    location: { address: '', lat: 40.7831, lng: -73.9712 },
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReport({
      ...formData,
      priority: formData.type === 'illegal_dumping' ? 'high' : 'medium',
      images: ['https://via.placeholder.com/300x200/4ecdc4/ffffff?text=New+Report']
    });
    setFormData({
      title: '',
      description: '',
      type: 'overflowing_bin',
      location: { address: '', lat: 40.7831, lng: -73.9712 },
      images: []
    });
    alert('Report submitted successfully! You earned 10 points.');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Report an Issue</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the issue"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="overflowing_bin">Overflowing Bin</option>
            <option value="dirty_toilet">Dirty Toilet</option>
            <option value="illegal_dumping">Illegal Dumping</option>
            <option value="missed_pickup">Missed Pickup</option>
            <option value="broken_equipment">Broken Equipment</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location.address}
            onChange={(e) => setFormData({...formData, location: {...formData.location, address: e.target.value}})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter address or location"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed description of the issue"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Click to upload photos or drag and drop</p>
            <input type="file" className="hidden" accept="image/*" multiple />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Report
        </button>
      </form>
    </div>
  );
}