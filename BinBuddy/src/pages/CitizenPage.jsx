import React from 'react';
import ReportForm from '../components/Citizen/ReportForm';
import ReportsList from '../components/Citizen/ReportLists';
import Gamification from '../components/Citizen/Gamification';
import Notifications from '../components/Citizen/Notification';

export default function CitizenPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Citizen Dashboard</h1>
        <p className="text-gray-600">Report issues, track progress, and help keep your community clean</p>
      </div>
      
      {/* Gamification Section */}
      <Gamification />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ReportForm />
          <Notifications />
        </div>
        
        <div>
          <ReportsList />
        </div>
      </div>
    </div>
  );
}