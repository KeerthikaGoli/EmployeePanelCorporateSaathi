import React from 'react';
import { CalendarIcon, ClockIcon, UserIcon } from '../icons/Icons';

interface LeaveBalance {
  type: string;
  balance: number;
  icon: React.ReactElement;
  color: string;
}

const mockBalances: LeaveBalance[] = [
  { type: 'Vacation Days', balance: 15.5, icon: <CalendarIcon className="w-6 h-6" />, color: 'blue' },
  { type: 'Sick Leave', balance: 8.0, icon: <ClockIcon className="w-6 h-6" />, color: 'green' },
  { type: 'Casual Leave', balance: 3.5, icon: <UserIcon className="w-6 h-6" />, color: 'yellow' },
];

const LeaveBalanceCard: React.FC = () => {

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30',
          text: 'text-blue-600 dark:text-blue-400',
        };
      case 'green':
        return {
          bg: 'bg-green-50 dark:bg-green-900/30',
          text: 'text-green-600 dark:text-green-400',
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/30',
          text: 'text-yellow-600 dark:text-yellow-400',
        };
      default:
        return { bg: 'bg-gray-50 dark:bg-gray-700/50', text: 'text-gray-600 dark:text-gray-400' };
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary dark:text-white">Current Leave Balance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockBalances.map((balanceItem) => {
          const { bg, text } = getColorClasses(balanceItem.color);
          return (
            <div 
              key={balanceItem.type}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center space-x-4 ">
                <div className={`${bg} p-3 rounded-full ${text} `}>
                  {balanceItem.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {balanceItem.type}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {balanceItem.balance}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Days Remaining
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          * Balance updates are typically processed within 24 hours of approval.
      </div>
    </div>
  );
};

export default LeaveBalanceCard;