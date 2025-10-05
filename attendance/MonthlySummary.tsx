import React from 'react';

const mockSummary = {
    totalDays: 22,
    presentDays: 20,
    lateDays: 2,
    absentDays: 2, 
    totalHours: '160h 20m',
    payrollSync: 'Last synced 2024-10-31',
    overtimeHours: '5h 10m',
};

const MonthlySummary: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Monthly Attendance Summary (Oct 2024)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 
                <div className="p-5 bg-blue-50 dark:bg-blue-900/50 rounded-xl shadow-md">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Hours Worked</p>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{mockSummary.totalHours}</p>
                </div>

                <div className="p-5 bg-green-50 dark:bg-green-900/50 rounded-xl shadow-md">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Present Days</p>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{mockSummary.presentDays} / {mockSummary.totalDays}</p>
                </div>

                <div className="p-5 bg-yellow-50 dark:bg-yellow-900/50 rounded-xl shadow-md">
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Late Punches</p>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{mockSummary.lateDays}</p>
                </div>

                <div className="p-5 bg-red-50 dark:bg-red-900/50 rounded-xl shadow-md">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">Days Absent (Unplanned)</p>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">{mockSummary.absentDays}</p>
                </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg space-y-3">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Payroll Integration Status</h3>
                
                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                    <p className="font-medium">Attendance Data Sync:</p>
                    <span className="font-semibold text-green-600 dark:text-green-400">Auto Synced (Daily)</span>
                </div>
                
                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                    <p className="font-medium">Last Sync Time:</p>
                    <span className="font-semibold">{mockSummary.payrollSync}</span>
                </div>

                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                    <p className="font-medium">Calculated Overtime (Gross):</p>
                    <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{mockSummary.overtimeHours}</span>
                </div>
            </div>
        </div>
    );
};

export default MonthlySummary;