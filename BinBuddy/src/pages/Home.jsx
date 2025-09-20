import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Sanitation & Waste Reporting</h1>
      <div className="space-x-4">
        <Link to="/report" className="btn-primary">Report Issue</Link>
        <Link to="/track" className="btn-primary">Track Reports</Link>
      </div>
    </div>
  );
}
