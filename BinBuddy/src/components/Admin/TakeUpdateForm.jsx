import React, { useState, useContext } from 'react';
import { Camera, Send, Upload } from 'lucide-react';
import { AppContext } from '../shared/context/ReportsContext';

export default function TaskUpdateForm({ reportId, onClose }) {
  const { updateReportStatus } = useContext(AppContext);
  const [formData, setFormData] = useState({
    status: '',
    message: '',
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.status && formData.message) {
      updateReportStatus(reportId, formData.status, formData.message);
      onClose?.();
      setFormData({ status: '', message: '', images: [] });
      alert('Task updated successfully!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Update Task</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status Update</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Status</option>
            <option value="in_progress">Start Working</option>
            <option value="resolved">Mark as Resolved</option>
            <option value="open">Need More Information</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Update Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the work done, issues encountered, or next steps..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Progress Photos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-2">Upload photos showing progress</p>
            <input type="file" className="hidden" accept="image/*" multiple />
            <button
              type="button"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center mx-auto"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </button>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Update
          </button>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Tips for Good Updates:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Be specific about what work was completed</li>
          <li>• Include photos showing before/after if possible</li>
          <li>• Mention any obstacles or additional resources needed</li>
          <li>• Estimate completion time for ongoing work</li>
        </ul>
      </div>
    </div>
  );
}