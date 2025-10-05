import React, { useState } from 'react';
import { ClockIcon, CalendarIcon, CheckIcon } from '../icons/Icons'; 
import DailyMarking from './DailyMarking';
import AttendanceRecords from './AttendanceRecords';
import MonthlySummary from './MonthlySummary';


type AttendanceTab = 'marking' | 'records' | 'summary';

const AttendanceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AttendanceTab>('marking');

  const tabs = [
    { id: 'marking' as AttendanceTab, label: 'Daily Punch', icon: <ClockIcon className="w-5 h-5" /> },
    { id: 'records' as AttendanceTab, label: 'Personal Records', icon: <CalendarIcon className="w-5 h-5" /> },
    { id: 'summary' as AttendanceTab, label: 'Monthly Summary', icon: <CalendarIcon className="w-5 h-5" /> },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'marking':
        return <DailyMarking />;
      case 'records':
        return <AttendanceRecords />;
      case 'summary':
        return <MonthlySummary />;
      default:
        return <DailyMarking />;
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Attendance Management</h1>
            <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm space-y-0.5">
                
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-xl">
              <ClockIcon className="w-7 h-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700">
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex" aria-label="Attendance Tabs">
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
                
                {tab.icon && React.cloneElement(tab.icon, { 
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

export default AttendanceView;