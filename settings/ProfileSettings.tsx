import React from 'react';

const ProfileSettings: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Profile Information</h2>
            
            <div className="flex items-center space-x-6 pb-6 mb-6">
                
                <div>
                    <p className="text-lg  text-gray-900 dark:text-white">Update Profile Photo</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">JPG, PNG, GIF, max 5MB.</p>
                    <button className="px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors
                                       border border-gray-300 dark:border-gray-600 
                                       text-gray-700 dark:text-gray-300 
                                       py-2 px-4 text-sm font-semibold rounded-lg transition-colors bg-blue-600 hover:bg-gray-50 text-black
                                       hover:bg-gray-50 dark:hover:bg-gray-600">
                        Upload Photo
                    </button>
                </div>
            </div>

            <form className="space-y-3 pt-6  border-gray-200 dark:border-gray-700">
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address (ID)</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value="employee.name@company.com"
                        readOnly
                        className="mt-1 block w-full rounded-md shadow-sm p-3 
                                   border border-gray-300 dark:border-gray-600 
                                   bg-gray-100 dark:bg-gray-700/50 
                                   text-gray-500 dark:text-gray-400 
                                   cursor-not-allowed"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input 
                        type="text" 
                        name="phone" 
                        id="phone" 
                        defaultValue="555-123-4567"
                        className="mt-1 block w-full rounded-md shadow-sm p-3 transition-colors
                                   border border-gray-300 dark:border-gray-600 
                                   bg-white dark:bg-gray-800 
                                   text-gray-900 dark:text-white 
                                   focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Residential Address</label>
                    <textarea
                        id="address"
                        name="address"
                        rows={3}
                        defaultValue="123 Corporate Ave, City, State, 10001"
                        className="mt-1 block w-full rounded-md shadow-sm p-3 transition-colors
                                   border border-gray-300 dark:border-gray-600 
                                   bg-white dark:bg-gray-800 
                                   text-gray-900 dark:text-white 
                                   focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="w-full md:w-auto px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-grey 
                                   bg-indigo-600 hover:bg-indigo-700 
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Save Profile 
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;