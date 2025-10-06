import React, { useState } from 'react';
import { MailIcon, CalendarIcon, ClockIcon } from '../icons/Icons'; // Assuming icons are available

const LeaveSubmissionForm: React.FC = () => {
  const [leaveType, setLeaveType] = useState('full-day');
  const [dayPortion, setDayPortion] = useState<'full' | 'half-am' | 'half-pm'>('full');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Leave Request Submitted:', { leaveType, startDate, endDate, reason });
    alert('Leave request submitted successfully!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border dark:border-gray-700">
      <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-6">New Leave Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Leave Type
            </label>
            <select
              id="leaveType"
              name="leaveType"
              required
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-200">
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Day Portion
            </label>
            <select
              value={dayPortion}
              onChange={(e) => setDayPortion(e.target.value as any)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="full">Full Day</option>
              <option value="half-am">Half Day - Morning</option>
              <option value="half-pm">Half Day - Afternoon</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reason for Leave
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={3}
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-200"
            placeholder="e.g., Family trip, medical appointment, etc."
          ></textarea>
        </div>

        <div className="pt-4 ">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">
            Submit 
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveSubmissionForm;