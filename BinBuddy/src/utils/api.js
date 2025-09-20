// API utility functions for CleanCity app
// In a real application, these would make actual HTTP requests to a backend server

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Simulate API delays for realistic UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database - in real app this would be handled by backend
let mockDatabase = {
  reports: [],
  users: {},
  notifications: []
};

export const api = {
  // Reports endpoints
  reports: {
    getAll: async () => {
      await delay(500);
      return { data: mockDatabase.reports, success: true };
    },
    
    getById: async (id) => {
      await delay(300);
      const report = mockDatabase.reports.find(r => r.id === id);
      return report ? { data: report, success: true } : { error: 'Report not found', success: false };
    },
    
    create: async (reportData) => {
      await delay(800);
      const newReport = {
        id: Date.now(),
        ...reportData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockDatabase.reports.push(newReport);
      return { data: newReport, success: true };
    },
    
    update: async (id, updateData) => {
      await delay(500);
      const index = mockDatabase.reports.findIndex(r => r.id === id);
      if (index === -1) {
        return { error: 'Report not found', success: false };
      }
      mockDatabase.reports[index] = {
        ...mockDatabase.reports[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      return { data: mockDatabase.reports[index], success: true };
    },
    
    delete: async (id) => {
      await delay(400);
      const index = mockDatabase.reports.findIndex(r => r.id === id);
      if (index === -1) {
        return { error: 'Report not found', success: false };
      }
      mockDatabase.reports.splice(index, 1);
      return { success: true };
    }
  },
  
  // User endpoints
  users: {
    getProfile: async (userId) => {
      await delay(300);
      const user = mockDatabase.users[userId];
      return user ? { data: user, success: true } : { error: 'User not found', success: false };
    },
    
    updateProfile: async (userId, userData) => {
      await delay(500);
      if (!mockDatabase.users[userId]) {
        return { error: 'User not found', success: false };
      }
      mockDatabase.users[userId] = {
        ...mockDatabase.users[userId],
        ...userData,
        updatedAt: new Date().toISOString()
      };
      return { data: mockDatabase.users[userId], success: true };
    }
  },
  
  // Notifications endpoints
  notifications: {
    getAll: async (userId) => {
      await delay(300);
      const userNotifications = mockDatabase.notifications.filter(n => n.userId === userId);
      return { data: userNotifications, success: true };
    },
    
    markAsRead: async (notificationId) => {
      await delay(200);
      const notification = mockDatabase.notifications.find(n => n.id === notificationId);
      if (!notification) {
        return { error: 'Notification not found', success: false };
      }
      notification.read = true;
      notification.readAt = new Date().toISOString();
      return { data: notification, success: true };
    }
  },
  
  // Analytics endpoints
  analytics: {
    getReportStats: async () => {
      await delay(600);
      const reports = mockDatabase.reports;
      const stats = {
        total: reports.length,
        open: reports.filter(r => r.status === 'open').length,
        inProgress: reports.filter(r => r.status === 'in_progress').length,
        resolved: reports.filter(r => r.status === 'resolved').length,
        byType: reports.reduce((acc, report) => {
          acc[report.type] = (acc[report.type] || 0) + 1;
          return acc;
        }, {}),
        byPriority: reports.reduce((acc, report) => {
          acc[report.priority] = (acc[report.priority] || 0) + 1;
          return acc;
        }, {})
      };
      return { data: stats, success: true };
    }
  },
  
  // File upload endpoint
  files: {
    upload: async (file) => {
      await delay(1000);
      // In real app, this would upload to cloud storage
      const mockUrl = `https://via.placeholder.com/300x200/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=Uploaded+Image`;
      return { 
        data: { 
          url: mockUrl, 
          filename: file.name,
          size: file.size 
        }, 
        success: true 
      };
    }
  }
};

// Error handling wrapper
export const apiCall = async (apiFunction) => {
  try {
    const result = await apiFunction();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    return { 
      error: error.message || 'An unexpected error occurred', 
      success: false 
    };
  }
};

// Request interceptor for adding auth headers
export const setAuthToken = (token) => {
  // In real app, this would set authorization header for all requests
  localStorage.setItem('authToken', token);
};

// Response interceptor for handling common errors
export const handleApiError = (error) => {
  if (error.status === 401) {
    // Handle unauthorized - redirect to login
    window.location.href = '/login';
  } else if (error.status === 403) {
    // Handle forbidden
    console.error('Access denied');
  } else if (error.status >= 500) {
    // Handle server errors
    console.error('Server error occurred');
  }
  
  return error;
};

export default api;