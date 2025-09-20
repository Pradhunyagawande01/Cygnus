import React from 'react';
// import TaskList from './components/Worker/TaskList';

export default function WorkerPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Worker Dashboard</h1>
        <p className="text-gray-600">View and manage your assigned cleaning tasks</p>
      </div>
      
      <TaskList />
    </div>
  );
}