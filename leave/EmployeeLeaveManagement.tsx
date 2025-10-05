import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, FilterIcon } from '../icons/Icons'; 
import LeaveBalanceCard from './LeaveBalanceCard'; 
import LeaveSubmissionForm from './LeaveSubmissionForm'; 
import RequestStatusTracker from './RequestStatusTracker'; 

type LeaveTab = 'submit' | 'track' | 'balance';

interface EmployeeLeaveManagementProps {
  searchQuery?: string;
}

const EmployeeLeaveManagement: React.FC<EmployeeLeaveManagementProps> = ({ searchQuery = '' }) => {
  const [activeTab, setActiveTab] = useState<LeaveTab>('submit');

  const tabs = [
    { id: 'submit' as LeaveTab, label: 'Submit Leave Request', icon: <ClockIcon className="w-5 h-5" /> },
    { id: 'track' as LeaveTab, label: 'Track Request Status', icon: <FilterIcon className="w-5 h-5" /> },
    { id: 'balance' as LeaveTab, label: 'View Leave Balance', icon: <CalendarIcon className="w-5 h-5" /> },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'submit':
        return <LeaveSubmissionForm />; 
      case 'track':
        return <RequestStatusTracker searchQuery={searchQuery} />;
      case 'balance':
        return <LeaveBalanceCard />;
      default:
        return <LeaveSubmissionForm />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Employees Leave Management</h1>
            <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm space-y-0.5">    
            </div>

          </div>
          <div className="flex-shrink-0">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
              <CalendarIcon className="w-6 h-7 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl">
        <div className="px-6 sm:px-8 pt-4 pb-2"> 
          <nav className="flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  // Increased font size and padding for better visibility
                  py-2 px-4 font-semibold text-lg flex items-center transition-all duration-200 ease-in-out rounded-full mx-1
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

export default EmployeeLeaveManagement;