import React, { useState } from 'react';
// ICON CHANGE: Replaced NewspaperIcon with MegaphoneIcon
import { BellIcon, MegaphoneIcon, ArrowRightIcon } from '../icons/Icons'; 
import MyAlerts from './MyAlerts';
import CompanyBoard from './CompanyBoard';

// Define the tabs
type AnnouncementTab = 'alerts' | 'board';

const AnnouncementsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnnouncementTab>('alerts');

  const tabs = [
    { id: 'alerts' as AnnouncementTab, label: ' Alerts & Notifications', icon: <BellIcon className="w-5 h-5" /> },
    // ICON CHANGE: Using MegaphoneIcon for the board
    { id: 'board' as AnnouncementTab, label: 'Company Announcement ', icon: <MegaphoneIcon className="w-5 h-5" /> }, 
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'alerts':
        return <MyAlerts />;
      case 'board':
        return <CompanyBoard />;
      default:
        return <MyAlerts />;
    }
  };

  // Define the consistent primary color theme (Amber/Orange)
  const primaryColor = 'text-blue-600 dark:text-blue-400';
  const primaryBg = 'bg-amber-50 dark:bg-amber-900/50';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Announcements</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">View personalized alerts and general company announcements from administration.</p>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
              <BellIcon className="w-7 h-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content Wrapper */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex" aria-label="Announcement Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-2 px-4 font-semibold text-lg flex items-center transition-colors duration-200 ease-in-out rounded-lg mx-1
                  ${
                    activeTab === tab.id
                       ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50' 
                       : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {tab.icon && React.cloneElement(tab.icon, { 
                    className: `w-5 h-5 mr-1.5 transition-colors ${primaryColor}` 
                })}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 sm:p-8">
          {renderActiveTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsView;