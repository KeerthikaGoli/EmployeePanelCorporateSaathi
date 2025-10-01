import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import MainLayout from '../layout/MainLayout';
import EmployeeDashboard from '../pages/Dashboard';
import { ViewType, Theme } from '../App';

const AppRoot: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('light');

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
      {currentView !== 'dashboard' && (
        <div className="text-gray-700 dark:text-gray-200">{currentView} page coming soon...</div>
      )}
    </MainLayout>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);


