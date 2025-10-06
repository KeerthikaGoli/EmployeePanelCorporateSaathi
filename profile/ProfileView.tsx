import React, { useState } from 'react';
import { UserIcon, BriefcaseIcon, StarIcon } from '../icons/Icons'; 
import SecuritySettings from '../settings/SecuritySettings';
import PersonalInfo from './PersonalInfo';
import EmploymentDetails from './EmploymentDetails';
import SkillsAchievements from './SkillsAchievements';

type ProfileTab = 'personal' | 'employment' | 'skills' | 'security';

interface ProfileViewProps {
}

const ProfileView: React.FC<ProfileViewProps> = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');

  const tabs = [
    { id: 'personal' as ProfileTab, label: 'Personal Information', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'employment' as ProfileTab, label: 'Employment Details', icon: <BriefcaseIcon className="w-5 h-5" /> },
    { id: 'skills' as ProfileTab, label: 'Skills / Achievements', icon: <StarIcon className="w-5 h-5" /> },
    { id: 'security' as ProfileTab, label: 'Security', icon: <UserIcon className="w-5 h-5" /> },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfo />;
      case 'employment':
        return <EmploymentDetails />;
      case 'skills':
        return <SkillsAchievements />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Employee Profile</h1>
            <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm space-y-0.5">
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
              <UserIcon className="w-9 h-8 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700">
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex" aria-label="Profile Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-2 px-4 font-semibold text-lg flex items-center transition-all duration-200 ease-in-out rounded-lg mx-1
                  ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {React.cloneElement(tab.icon, { 
                    className: `w-5 h-5 mr-1.5 transition-colors ${
                      activeTab === tab.id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }` 
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

export default ProfileView;