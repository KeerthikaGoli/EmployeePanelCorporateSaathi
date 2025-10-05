import React, { useState } from 'react';

const PreferenceSettings: React.FC = () => {
    const [isEmailEnabled, setIsEmailEnabled] = useState(true);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Application Preferences</h2>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Performance Review Updates</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive an email when your review status changes.</p>
                    </div>
                  
                    <button 
                        onClick={() => setIsEmailEnabled(!isEmailEnabled)}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                                    ${isEmailEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`} 
                    >
                       
                    </button>
                </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Display Theme</h3>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setTheme('light')}
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                            theme === 'light'
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        Light Mode
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                            theme === 'dark'
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        Dark Mode
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreferenceSettings;