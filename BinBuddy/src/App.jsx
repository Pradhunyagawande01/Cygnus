import React, { useState, createContext, useContext, useEffect } from 'react';
import { MapPin, Camera, Bell, Star, Trophy, Calendar, Filter, Download, Users, BarChart3, CheckCircle, Clock, AlertTriangle, User, Home, Settings, LogOut, Menu, X, Upload, Send, Eye, Edit, Trash2, MapIcon } from 'lucide-react';

// Context for managing app state
const AppContext = createContext();

// Sample data
const initialReports = [
  {
    id: 1,
    title: "Overflowing Trash Bin",
    description: "Large garbage bin near Central Park is overflowing with waste",
    location: { lat: 40.7831, lng: -73.9712, address: "Central Park, NYC" },
    type: "overflowing_bin",
    status: "open",
    priority: "high",
    reportedBy: "john_doe",
    reportedAt: "2025-09-19T10:30:00Z",
    assignedTo: "worker_1",
    images: ["https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Overflowing+Bin"],
    updates: []
  },
  {
    id: 2,
    title: "Dirty Public Restroom",
    description: "Public restroom at Main Street needs urgent cleaning",
    location: { lat: 40.7589, lng: -73.9851, address: "Main Street, NYC" },
    type: "dirty_toilet",
    status: "in_progress",
    priority: "medium",
    reportedBy: "jane_smith",
    reportedAt: "2025-09-18T14:15:00Z",
    assignedTo: "worker_2",
    images: ["https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Dirty+Restroom"],
    updates: [
      { date: "2025-09-19T09:00:00Z", message: "Assigned to cleaning crew", by: "admin" }
    ]
  }
];

const users = {
  john_doe: { name: "John Doe", role: "citizen", points: 150, badges: ["Reporter", "Verified"] },
  jane_smith: { name: "Jane Smith", role: "citizen", points: 85, badges: ["Contributor"] },
  admin: { name: "Admin User", role: "admin" },
  worker_1: { name: "Mike Johnson", role: "worker" },
  worker_2: { name: "Sarah Wilson", role: "worker" }
};

// App Provider Component
function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("john_doe");
  const [reports, setReports] = useState(initialReports);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your report #1 has been assigned to a worker", read: false, date: "2025-09-19T09:00:00Z" }
  ]);

  const addReport = (report) => {
    const newReport = {
      ...report,
      id: reports.length + 1,
      reportedBy: currentUser,
      reportedAt: new Date().toISOString(),
      status: "open",
      updates: []
    };
    setReports([...reports, newReport]);
    
    // Award points to user
    if (users[currentUser].role === 'citizen') {
      users[currentUser].points += 10;
    }
  };

  const updateReportStatus = (reportId, status, message) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status,
            updates: [...report.updates, { 
              date: new Date().toISOString(), 
              message, 
              by: currentUser 
            }]
          }
        : report
    ));
  };

  const assignReport = (reportId, workerId) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, assignedTo: workerId }
        : report
    ));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      reports,
      setReports,
      notifications,
      setNotifications,
      users,
      addReport,
      updateReportStatus,
      assignReport
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Shared Components
function StatusBadge({ status }) {
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

function Navbar() {
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

// Citizen Components
function ReportForm() {
  const { addReport } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'overflowing_bin',
    location: { address: '', lat: 40.7831, lng: -73.9712 },
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReport({
      ...formData,
      priority: formData.type === 'illegal_dumping' ? 'high' : 'medium',
      images: ['https://via.placeholder.com/300x200/4ecdc4/ffffff?text=New+Report']
    });
    setFormData({
      title: '',
      description: '',
      type: 'overflowing_bin',
      location: { address: '', lat: 40.7831, lng: -73.9712 },
      images: []
    });
    alert('Report submitted successfully! You earned 10 points.');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Report an Issue</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the issue"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="overflowing_bin">Overflowing Bin</option>
            <option value="dirty_toilet">Dirty Toilet</option>
            <option value="illegal_dumping">Illegal Dumping</option>
            <option value="missed_pickup">Missed Pickup</option>
            <option value="broken_equipment">Broken Equipment</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location.address}
            onChange={(e) => setFormData({...formData, location: {...formData.location, address: e.target.value}})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter address or location"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed description of the issue"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Click to upload photos or drag and drop</p>
            <input type="file" className="hidden" accept="image/*" multiple />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Report
        </button>
      </form>
    </div>
  );
}

function ReportCard({ report }) {
  const { users } = useContext(AppContext);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
        <StatusBadge status={report.status} />
      </div>
      
      {report.images && report.images.length > 0 && (
        <img 
          src={report.images[0]} 
          alt={report.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <p className="text-gray-600 mb-3">{report.description}</p>
      
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        {report.location.address}
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Calendar className="w-4 h-4 mr-1" />
        {new Date(report.reportedAt).toLocaleDateString()}
      </div>
      
      {report.updates.length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-medium text-gray-700 mb-2">Latest Update:</h4>
          <p className="text-sm text-gray-600">{report.updates[report.updates.length - 1].message}</p>
        </div>
      )}
    </div>
  );
}

function ReportsList() {
  const { reports, currentUser } = useContext(AppContext);
  const [filter, setFilter] = useState('all');
  
  const userReports = reports.filter(report => report.reportedBy === currentUser);
  const filteredReports = filter === 'all' ? userReports : userReports.filter(report => report.status === filter);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Reports</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="all">All Reports</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      
      <div className="grid gap-6">
        {filteredReports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
      
      {filteredReports.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reports found</p>
        </div>
      )}
    </div>
  );
}

function Gamification() {
  const { currentUser, users } = useContext(AppContext);
  const user = users[currentUser];
  
  if (user.role !== 'citizen') return null;
  
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <Star className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{user.points}</div>
          <div className="text-sm opacity-90">Points Earned</div>
        </div>
        
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{user.badges.length}</div>
          <div className="text-sm opacity-90">Badges</div>
        </div>
        
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <Users className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">#3</div>
          <div className="text-sm opacity-90">Leaderboard</div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Your Badges</h3>
        <div className="flex flex-wrap gap-2">
          {user.badges.map(badge => (
            <span key={badge} className="bg-white/30 px-3 py-1 rounded-full text-sm">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Admin Components
function AdminDashboard() {
  const { reports } = useContext(AppContext);
  
  const stats = {
    total: reports.length,
    open: reports.filter(r => r.status === 'open').length,
    inProgress: reports.filter(r => r.status === 'in_progress').length,
    resolved: reports.filter(r => r.status === 'resolved').length
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      
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
      
      <IssueManagement />
      <Analytics />
    </div>
  );
}

function IssueManagement() {
  const { reports, updateReportStatus, assignReport, users } = useContext(AppContext);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredReports = filterStatus === 'all' ? reports : reports.filter(r => r.status === filterStatus);
  const workers = Object.keys(users).filter(key => users[key].role === 'worker');
  
  const handleStatusUpdate = (reportId, newStatus) => {
    updateReportStatus(reportId, newStatus, `Status updated to ${newStatus}`);
  };
  
  const handleAssignment = (reportId, workerId) => {
    assignReport(reportId, workerId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Issue Management</h3>
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
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
            {filteredReports.map(report => (
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
  );
}

function Analytics() {
  const { reports } = useContext(AppContext);
  
  const typeStats = reports.reduce((acc, report) => {
    acc[report.type] = (acc[report.type] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Analytics Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Issues by Type</h4>
          <div className="space-y-3">
            {Object.entries(typeStats).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">{type.replace('_', ' ')}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${(count / reports.length) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Resolution Time</h4>
          <div className="text-center py-8">
            <div className="text-3xl font-bold text-blue-600">2.3</div>
            <div className="text-sm text-gray-500">Average days to resolve</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Worker Components
function WorkerTasks() {
  const { reports, currentUser, updateReportStatus, users } = useContext(AppContext);
  const workerReports = reports.filter(report => report.assignedTo === currentUser);
  
  const handleUpdateStatus = (reportId, status, message) => {
    updateReportStatus(reportId, status, message);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>
      
      <div className="grid gap-6">
        {workerReports.map(report => (
          <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                <p className="text-gray-600">{report.description}</p>
              </div>
              <StatusBadge status={report.status} />
            </div>
            
            {report.images && report.images.length > 0 && (
              <img 
                src={report.images[0]} 
                alt={report.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              {report.location.address}
            </div>
            
            <div className="flex space-x-2">
              {report.status === 'open' && (
                <button
                  onClick={() => handleUpdateStatus(report.id, 'in_progress', 'Worker started working on the issue')}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                >
                  Start Working
                </button>
              )}
              {report.status === 'in_progress' && (
                <button
                  onClick={() => handleUpdateStatus(report.id, 'resolved', 'Issue has been resolved by worker')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Mark Resolved
                </button>
              )}
            </div>
            
            {report.updates.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Updates:</h4>
                {report.updates.map((update, index) => (
                  <div key={index} className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">{new Date(update.date).toLocaleDateString()}:</span> {update.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {workerReports.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks assigned</p>
        </div>
      )}
    </div>
  );
}

// Main App Component
function App() {
  const { currentUser, users } = useContext(AppContext);
  const userRole = users[currentUser].role;
  
  const renderContent = () => {
    switch (userRole) {
      case 'citizen':
        return (
          <div className="space-y-8">
            <Gamification />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ReportForm />
              <ReportsList />
            </div>
          </div>
        );
      case 'admin':
        return <AdminDashboard />;
      case 'worker':
        return <WorkerTasks />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to CleanCity</h2>
            <p className="text-gray-600">Please select a user role to continue.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

// Root component with context provider
export default function SanitationApp() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}