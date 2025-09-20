import React, { useContext } from 'react';
import { BarChart3, AlertTriangle, Clock, CheckCircle, Download } from 'lucide-react';
import { AppContext } from '../shared/context/ReportsContext';
import StatusBadge from '../shared/StatusBadge';

export default function Dashboard() {
  const { reports, updateReportStatus, assignReport, users } = useContext(AppContext);
  
  const stats = {
    total: reports.length,
    open: reports.filter(r => r.status === 'open').length,
    inProgress: reports.filter(r => r.status === 'in_progress').length,
    resolved: reports.filter(r => r.status === 'resolved').length
  };
  
  const workers = Object.keys(users).filter(key => users[key].role === 'worker');
  
  const handleStatusUpdate = (reportId, newStatus) => {
    updateReportStatus(reportId, newStatus, `Status updated to ${newStatus}`);
  };
  
  const handleAssignment = (reportId, workerId) => {
    assignReport(reportId, workerId);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm opacity-90">Total Reports</div>
            </div>
            <BarChart3 className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-red-500 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.open}</div>
              <div className="text-sm opacity-90">Open Issues</div>
            </div>
            <AlertTriangle className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-yellow-500 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <div className="text-sm opacity-90">In Progress</div>
            </div>
            <Clock className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-green-500 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.resolved}</div>
              <div className="text-sm opacity-90">Resolved</div>
            </div>
            <CheckCircle className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
      
      {/* Issue Management Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Issue Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Issue</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assigned To</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{report.title}</div>
                    <div className="text-sm text-gray-500">{report.type.replace('_', ' ')}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {report.location.address}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {report.assignedTo ? users[report.assignedTo].name : 'Unassigned'}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusUpdate(report.id, e.target.value)}
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <select
                        value={report.assignedTo || ''}
                        onChange={(e) => handleAssignment(report.id, e.target.value)}
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="">Assign Worker</option>
                        {workers.map(workerId => (
                          <option key={workerId} value={workerId}>
                            {users[workerId].name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}