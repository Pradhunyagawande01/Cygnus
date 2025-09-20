import React, { useContext } from 'react';
import { Download, FileText, Image } from 'lucide-react';
import { AppContext } from '../shared/context/ReportsContext';

export default function ExportData() {
  const { reports } = useContext(AppContext);
  
  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Type', 'Status', 'Location', 'Reported By', 'Reported At', 'Priority'];
    const csvData = reports.map(report => [
      report.id,
      report.title,
      report.type,
      report.status,
      report.location.address,
      report.reportedBy,
      new Date(report.reportedAt).toLocaleDateString(),
      report.priority
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reports_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  const exportAnalytics = () => {
    const stats = {
      total: reports.length,
      open: reports.filter(r => r.status === 'open').length,
      inProgress: reports.filter(r => r.status === 'in_progress').length,
      resolved: reports.filter(r => r.status === 'resolved').length,
      byType: reports.reduce((acc, report) => {
        acc[report.type] = (acc[report.type] || 0) + 1;
        return acc;
      }, {})
    };
    
    const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Export Data</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            <h4 className="font-medium text-gray-800">Reports Data</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Export all report data including titles, descriptions, locations, and status information.
          </p>
          <button 
            onClick={exportToCSV}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as CSV
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Image className="w-6 h-6 text-green-600 mr-2" />
            <h4 className="font-medium text-gray-800">Analytics Report</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Export analytical data including statistics, trends, and performance metrics.
          </p>
          <button 
            onClick={exportAnalytics}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Analytics
          </button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Export Summary</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Total Reports Available: {reports.length}</p>
          <p>Date Range: {reports.length > 0 ? `${new Date(Math.min(...reports.map(r => new Date(r.reportedAt)))).toLocaleDateString()} - ${new Date(Math.max(...reports.map(r => new Date(r.reportedAt)))).toLocaleDateString()}` : 'No data'}</p>
          <p>Last Updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}