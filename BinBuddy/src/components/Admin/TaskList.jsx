import React, { useContext } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { AppContext } from '../shared/context/ReportsContext';
import StatusBadge from '../shared/StatusBadge';

export default function TaskList() {
  const { reports, currentUser, updateReportStatus } = useContext(AppContext);
  const workerReports = reports.filter(report => report.assignedTo === currentUser);
  
  const handleUpdateStatus = (reportId, status, message) => {
    updateReportStatus(reportId, status, message);
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        <div className="text-sm text-gray-600">
          {workerReports.filter(r => r.status !== 'resolved').length} active tasks
        </div>
      </div>
      
      <div className="grid gap-6">
        {workerReports.map(report => (
          <div 
            key={report.id} 
            className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getPriorityColor(report.priority)}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                  <StatusBadge status={report.status} />
                </div>
                <p className="text-gray-600 mb-3">{report.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {report.location.address}
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  Reported: {new Date(report.reportedAt).toLocaleDateString()}
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  Priority: <span className="ml-1 capitalize font-medium">{report.priority}</span>
                </div>
              </div>
            </div>
            
            {report.images && report.images.length > 0 && (
              <div className="mb-4">
                <img 
                  src={report.images[0]} 
                  alt={report.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="flex space-x-2 mb-4">
              {report.status === 'open' && (
                <button
                  onClick={() => handleUpdateStatus(report.id, 'in_progress', 'Worker started working on the issue')}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Start Working
                </button>
              )}
              {report.status === 'in_progress' && (
                <button
                  onClick={() => handleUpdateStatus(report.id, 'resolved', 'Issue has been resolved by worker')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark Resolved
                </button>
              )}
              {report.status === 'resolved' && (
                <div className="text-green-600 font-medium">✓ Completed</div>
              )}
            </div>
            
            {report.updates.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Task Updates:</h4>
                <div className="space-y-2">
                  {report.updates.map((update, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-gray-800">
                        {new Date(update.date).toLocaleDateString()}:
                      </span>
                      <span className="ml-2 text-gray-600">{update.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {workerReports.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Clock className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No tasks assigned</h3>
          <p className="text-gray-500">You don't have any tasks assigned at the moment.</p>
        </div>
      )}
    </div>
  );
}