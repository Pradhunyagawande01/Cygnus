import React, { useContext } from 'react';
import { AppProvider, AppContext } from './components/shared/context/ReportsContext';
import Navbar from './components/shared/Navbar';
import CitizenPage from './pages/CitizenPage';
import AdminPage from './pages/AdminPage';
import WorkerPage from './pages/WorkerPage';
import Home from './pages/Home';

function App() {
  const { currentUser, users } = useContext(AppContext);
  const userRole = users[currentUser]?.role || 'guest';
  
  const renderContent = () => {
    switch (userRole) {
      case 'citizen':
        return <CitizenPage />;
      case 'admin':
        return <AdminPage />;
      case 'worker':
        return <WorkerPage />;
      default:
        return <Home />;
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

export default function SanitationApp() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}