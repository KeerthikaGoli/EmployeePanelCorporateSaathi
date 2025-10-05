import React from 'react';
import { CheckIcon } from '../icons/Icons';

const SecuritySettings: React.FC = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Security and Access</h2>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-inner space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Change Password</h3>
                <form className="space-y-4 max-w-lg">
                   
                    {[
                        { id: 'current-password', label: 'Current Password' },
                        { id: 'new-password', label: 'New Password' },
                        { id: 'confirm-password', label: 'Confirm New Password' },
                    ].map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                            <input 
                                type="password" 
                                id={field.id} 
                                className="mt-1 block w-full rounded-md shadow-sm p-3 transition-colors
                                           border border-gray-300 dark:border-gray-600 
                                           bg-white dark:bg-gray-800 
                                           text-gray-900 dark:text-white 
                                           focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    ))}
                    
                   
                    <button 
                        type="submit" 
                        className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                   bg-red-600 hover:bg-red-700 
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                        Update Password
                    </button>
                </form>
            </div>

            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">2FA via SMS/Authenticator App</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                    </div>
                    
                    <button className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-grey 
                                       bg-indigo-600 hover:bg-indigo-700 transition-colors">
                        <CheckIcon className="w-4 h-4 mr-1"/> Enabled
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;