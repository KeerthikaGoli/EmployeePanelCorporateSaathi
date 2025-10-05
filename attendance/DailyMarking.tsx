import React, { useState } from 'react';
import { ClockIcon, CheckIcon } from '../icons/Icons'; 

const DailyMarking: React.FC = () => {
    const [status, setStatus] = useState<'pending' | 'in' | 'out'>('pending');

    const handlePunch = (type: 'in' | 'out') => {
        setStatus(type);
        setTimeout(() => {
            alert(`Attendance successfully marked: ${type.toUpperCase()} at ${new Date().toLocaleTimeString()}`);
        }, 100);
    };

    const isPunchedIn = status === 'in';
    const isPunchedOut = status === 'out';
    
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Attendance Punch</h2>
            <div className="p-6 bg-blue-50 dark:bg-blue-900/50 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4">
                <ClockIcon className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-pulse" />
                <p className="text-5xl font-extrabold text-gray-900 dark:text-white">{new Date().toLocaleTimeString()}</p>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <div className={`mt-4 px-4 py-2 rounded-full font-semibold text-sm ${
                    isPunchedOut ? 'bg-red-500 text-white' : isPunchedIn ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}>
                    Status: {isPunchedOut ? 'Punched Out' : isPunchedIn ? 'Punched In' : 'Pending Punch In'}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => handlePunch('in')}
                    disabled={isPunchedIn}
                    className={`flex items-center justify-center p-4 rounded-xl shadow-lg font-bold text-white transition-colors duration-200 ${
                        isPunchedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    <CheckIcon className="w-6 h-6 mr-2" />
                    PUNCH IN
                </button>
                <button
                    onClick={() => handlePunch('out')}
                    disabled={isPunchedOut || !isPunchedIn}
                    className={`flex items-center justify-center p-4 rounded-xl shadow-lg font-bold text-white transition-colors duration-200 ${
                        isPunchedOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    <ClockIcon className="w-6 h-6 mr-2" />
                    PUNCH OUT
                </button>
            </div>
        </div>
    );
};

export default DailyMarking;