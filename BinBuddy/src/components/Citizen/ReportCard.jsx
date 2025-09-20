import React, { useContext } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { AppContext } from '../shared/context/ReportsContext';
import StatusBadge from '../shared/StatusBadge';

export default function ReportCard({ report }) {
  const { users } = useContext(AppContext);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
        <StatusBadge status={report.status} />
      </div>
      
      {report.images && report.images.length > 0 && (
        <img 
          src={report.images[0]} 
          alt={report.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <p className="text-gray-600 mb-3">{report.description}</p>
      
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        {report.location.address}
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Calendar className="w-4 h-4 mr-1" />
        {new Date(report.reportedAt).toLocaleDateString()}
      </div>
      
      {report.updates.length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-medium text-gray-700 mb-2">Latest Update:</h4>
          <p className="text-sm text-gray-600">{report.updates[report.updates.length - 1].message}</p>
        </div>
      )}
    </div>
  );
}