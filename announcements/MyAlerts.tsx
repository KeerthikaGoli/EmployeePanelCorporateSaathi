import React from 'react';
import { ClockIcon, CheckIcon, ArrowRightIcon } from '../icons/Icons'; // Reusing icons

const mockAlerts = [
    {
        id: 1,
        type: 'Task',
        title: 'New Feature Assignment: V2 Dashboard',
        detail: 'A new task has been assigned to your queue. Deadline is end of next week.',
        date: '2 hours ago',
        color: 'blue',
    },
    {
        id: 2,
        type: 'Deadline',
        title: 'Q4 Performance Review Due',
        detail: 'The deadline for submitting your self-review is in 3 days.',
        date: '1 day ago',
        color: 'red',
    },
    {
        id: 3,
        type: 'Leave',
        title: 'Leave Request Approved',
        detail: 'Your vacation request for 2024-11-15 to 2024-11-20 has been approved.',
        date: '3 days ago',
        color: 'green',
    },
    {
        id: 4,
        type: 'Task',
        title: 'Design Mockup Finalization',
        detail: 'Final sign-off needed on the Q3 marketing assets.',
        date: '5 days ago',
        color: 'blue',
    },
];

const MyAlerts: React.FC = () => {
    
    // Helper to determine icon and color based on alert type
    const getAlertStyling = (type: string, color: string) => {
        let Icon = ArrowRightIcon; // Default icon
        let colorClasses = '';

        if (type === 'Task' || type === 'Deadline') {
            Icon = ClockIcon;
            colorClasses = color === 'red' 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/30' 
                : 'text-blue-500 bg-blue-50 dark:bg-blue-900/30';
        } else if (type === 'Leave') {
            Icon = CheckIcon;
            colorClasses = 'text-green-500 bg-green-50 dark:bg-green-900/30';
        }

        return { Icon, colorClasses };
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Personalized Alerts</h2>
            
            <div className="space-y-4">
                {mockAlerts.map((alert) => {
                    const { Icon, colorClasses } = getAlertStyling(alert.type, alert.color);

                    return (
                        <div 
                            key={alert.id} 
                            className="flex items-start p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-shadow hover:shadow-lg"
                        >
                            {/* Icon / Status Indicator */}
                            <div className={`flex-shrink-0 p-3 rounded-full ${colorClasses} mr-4`}>
                                <Icon className="w-5 h-5" />
                            </div>

                            {/* Content */}
                            <div className="flex-grow space-y-0.5">
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{alert.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{alert.date}</p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{alert.detail}</p>
                            </div>
                            
                            {/* Action Arrow */}
                            <button className="flex-shrink-0 ml-4 p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    );
                })}
            </div>
            
            <button className="w-full mt-6 py-3 border border-transparent rounded-lg text-sm font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
                View All Alerts
            </button>
        </div>
    );
};

export default MyAlerts;