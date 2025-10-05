import React, { useState } from 'react';
import { UserIcon, CheckIcon, FilterIcon } from '../icons/Icons'; 
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import PreferenceSettings from './PreferenceSettings';

type SettingsTab = 'profile' | 'security' | 'preferences';

const EmployeeSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Personal Profile', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'security' as SettingsTab, label: 'Security & Access', icon: <CheckIcon className="w-5 h-5" /> },
    { id: 'preferences' as SettingsTab, label: 'Notifications & Theme', icon: <FilterIcon className="w-5 h-5" /> },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'preferences':
        return <PreferenceSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  const primaryColor = 'text-indigo-600 dark:text-indigo-400';
  const primaryBg = 'bg-indigo-50 dark:bg-indigo-900/50';

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Employee Settings</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">Manage your profile information, security credentials, and application preferences.</p>
          </div>
          <div className="flex-shrink-0">
            <div className={`bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl`}>
              <UserIcon className={`"w-7 h-6 text-blue-600 dark:text-green-300"`} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700">
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex" aria-label="Settings Tabs">
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

export default EmployeeSettingsView;