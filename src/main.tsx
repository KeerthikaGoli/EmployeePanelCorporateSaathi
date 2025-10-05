import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import MainLayout from '../layout/MainLayout';
import EmployeeDashboard from '../pages/dashboard';
import TasksApp from '../pages/tasks';
import ServicesApp from '../pages/services';
import LeaderboardApp from '../pages/leaderboard';
import { ViewType, Theme } from '../App';
import { EmployeeLeaveManagement } from '../leave'; 
import ProfileView from '../profile/ProfileView';
import AttendanceView  from '../attendance/AttendanceView';
import SettingsView  from '../settings/SettingsView';
import EmailView  from '../email/EmailView';
import AnnouncementsView  from '../announcements/AnnouncementsView';

const AppRoot: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }, [theme]);

  return (
    <MainLayout
      currentView={currentView}
      setCurrentView={setCurrentView}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      theme={theme}
      setTheme={setTheme}
    >
      {currentView === 'dashboard' && <EmployeeDashboard />}
      {currentView === 'leave' && <EmployeeLeaveManagement />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'tasks' && <TasksApp />}
      {currentView === 'services' && <ServicesApp />}
      {currentView === 'leaderboard' && <LeaderboardApp />}
      {currentView === 'attendance' && <AttendanceView />}
      {currentView === 'settings' && <SettingsView />}
      {currentView === 'email' && <EmailView />}
      {currentView === 'announcements' && <AnnouncementsView />}
      {currentView === 'dashboard' && (
        <div className="text-gray-700 dark:text-gray-200">{currentView}</div>
      )}
    </MainLayout>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);


