import React from 'react';
import { ClockIcon, CheckIcon, XIcon, FilterIcon } from '../icons/Icons';

interface Request {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const mockRequests: Request[] = [
  { id: 101, type: 'Vacation', startDate: '2025-11-01', endDate: '2025-11-05', status: 'Approved' },
  { id: 102, type: 'Sick Leave', startDate: '2025-10-15', endDate: '2025-10-15', status: 'Pending' },
  { id: 103, type: 'Casual', startDate: '2025-09-20', endDate: '2025-09-22', status: 'Rejected' },
  { id: 104, type: 'Vacation', startDate: '2025-12-24', endDate: '2025-12-31', status: 'Pending' },
];

interface RequestStatusTrackerProps {
  searchQuery?: string; 
}

const RequestStatusTracker: React.FC<RequestStatusTrackerProps> = ({ searchQuery }) => {

  const getStatusClasses = (status: Request['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Pending':
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const getStatusIcon = (status: Request['status']) => {
    switch (status) {
      case 'Approved':
        return <CheckIcon className="w-4 h-4" />;
      case 'Rejected':
        return <XIcon className="w-4 h-4" />;
      case 'Pending':
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700">
      <h2 className="text-xl font-semibold text-text-primary dark:text-white mb-6 flex justify-between items-center">
        Leave Request History
        <button className="text-sm text-primary flex items-center space-x-1 hover:text-primary-dark">
          <FilterIcon className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Request ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {mockRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                  #{request.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {request.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {request.startDate} to {request.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(request.status)} flex items-center space-x-1`}
                  >
                    {getStatusIcon(request.status)}
                    <span>{request.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {mockRequests.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No requests found.</p>
      )}
    </div>
  );
};

export default RequestStatusTracker;