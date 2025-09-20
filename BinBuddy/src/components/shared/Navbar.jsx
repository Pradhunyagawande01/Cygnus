import React, { useState, useContext } from 'react';
import { MapPin, Bell, User, Menu, X } from 'lucide-react';
import { AppContext } from './context/ReportsContext';

export default function Navbar() {
  const { currentUser, setCurrentUser, users, notifications } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const userRoles = [
    { id: "john_doe", label: "John (Citizen)" },
    { id: "jane_smith", label: "Jane (Citizen)" },
    { id: "admin", label: "Admin" },
    { id: "worker_1", label: "Mike (Worker)" },
    { id: "worker_2", label: "Sarah (Worker)" }
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 mr-2" />
            <span className="font-bold text-xl">CleanCity</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <select 
              value={currentUser} 
              onChange={(e) => setCurrentUser(e.target.value)}
              className="bg-blue-700 border border-blue-500 rounded px-3 py-1 text-sm"
            >
              {userRoles.map(role => (
                <option key={role.id} value={role.id}>{role.label}</option>
              ))}
            </select>
            
            <div className="relative">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span className="text-sm">{users[currentUser].name}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}