import React, { useState, useContext } from 'react';
import { AppContext } from '../shared/context/ReportsContext';
import ReportCard from './ReportCard';

export default function ReportsList() {
  const { reports, currentUser } = useContext(AppContext);
  const [filter, setFilter] = useState('all');
  
  const userReports = reports.filter(report => report.reportedBy === currentUser);
  const filteredReports = filter === 'all' ? userReports : userReports.filter(report => report.status === filter);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Reports</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="all">All Reports</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      
      <div className="grid gap-6">
        {filteredReports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
      
      {filteredReports.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reports found</p>
        </div>
      )}
    </div>
  );
}