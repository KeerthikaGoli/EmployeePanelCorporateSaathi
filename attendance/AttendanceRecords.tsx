import React from 'react';

const mockAttendance = [
    { date: '2024-10-01', in: '09:00 AM', out: '05:00 PM', duration: '8h 0m', status: 'Present' },
    { date: '2024-10-02', in: '09:15 AM', out: '05:10 PM', duration: '7h 55m', status: 'Late' },
    { date: '2024-10-03', in: 'N/A', out: 'N/A', duration: '0h 0m', status: 'Leave (Sick)' }, 
    { date: '2024-10-04', in: '08:58 AM', out: '05:05 PM', duration: '8h 7m', status: 'Present' },
    { date: '2024-10-05', in: 'N/A', out: 'N/A', duration: '0h 0m', status: 'Absent (Unplanned)' },
];

const AttendanceRecords: React.FC = () => {
    
    const getStatusBadge = (status: string) => {
        const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
        let statusClasses = '';
        
        if (status.includes('Present')) {
            statusClasses = 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        } else if (status.includes('Late')) {
            statusClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        } else if (status.includes('Absent') || status.includes('Leave')) {
            statusClasses = status.includes('Unplanned') 
                ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' 
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
        } else {
            statusClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
        
        return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Attendance Records</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockAttendance.map((record, index) => (
                        <div 
                            key={index} 
                            className="p-5 space-y-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 
                                odd:bg-white dark:odd:bg-gray-800 
                                even:bg-gray-50 dark:even:bg-gray-900">

                            <div className="flex justify-between items-start pb-2 ">
                                <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                                    {record.date}
                                </h3>
                                {getStatusBadge(record.status)}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Punch In</p>
                                    <p className="font-bold text-gray-800 dark:text-gray-200">{record.in}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Punch Out</p>
                                    <p className="font-bold text-gray-800 dark:text-gray-200">{record.out}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700/50">
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">Total Duration</p>
                                <p className={`text-lg font-extrabold ${record.duration.includes('0h') ? 'text-red-600' : 'text-green-600 dark:text-green-400'}`}>
                                    {record.duration}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">Note: Planned absences (Leave) are processed separately and factored into payroll.</p>
        </div>
    );
};

export default AttendanceRecords;