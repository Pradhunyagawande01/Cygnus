import React, { useContext } from 'react';
import { AppContext } from '../shared/context/ReportsContext';

export default function Analytics() {
  const { reports } = useContext(AppContext);
  
  const typeStats = reports.reduce((acc, report) => {
    acc[report.type] = (acc[report.type] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Analytics Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Issues by Type</h4>
          <div className="space-y-3">
            {Object.entries(typeStats).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">{type.replace('_', ' ')}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${(count / reports.length) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Resolution Time</h4>
          <div className="text-center py-8">
            <div className="text-3xl font-bold text-blue-600">2.3</div>
            <div className="text-sm text-gray-500">Average days to resolve</div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">This Month</span>
              <span className="font-medium">1.8 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Month</span>
              <span className="font-medium">2.8 days</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Monthly Report Trends</h4>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
}