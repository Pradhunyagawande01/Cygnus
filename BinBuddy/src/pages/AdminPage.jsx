import React from 'react';
import Dashboard from '../components/Admin/Dashboard';
import Analytics from '../components/Admin/Analitics';
import ExportData from '../components/Admin/ExportData';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage reports, assign tasks, and monitor system performance</p>
      </div>
      
      <Dashboard />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Analytics />
        <ExportData />
      </div>
    </div>
  );
}