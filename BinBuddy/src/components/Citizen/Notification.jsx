import React, { useContext } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { AppContext } from '../shared/context/ReportsContext';

export default function Notifications() {
  const { notifications, setNotifications } = useContext(AppContext);
  
  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };
  
  const unreadNotifications = notifications.filter(n => !n.read);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Bell className="w-6 h-6 mr-2 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
        {unreadNotifications.length > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {unreadNotifications.length}
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-3 rounded-lg border ${
              notification.read 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-800">{notification.message}</p>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-blue-600 hover:text-blue-800 ml-2"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(notification.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      
      {notifications.length === 0 && (
        <div className="text-center py-8">
          <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      )}
    </div>
  );
}