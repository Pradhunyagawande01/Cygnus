import React from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  const styles = {
    open: "bg-red-100 text-red-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800"
  };
  
  const icons = {
    open: AlertTriangle,
    in_progress: Clock,
    resolved: CheckCircle
  };
  
  const Icon = icons[status];
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.replace('_', ' ').toUpperCase()}
    </span>
  );
}