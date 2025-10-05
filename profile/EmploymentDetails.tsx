import React from 'react';

const EmploymentDetails: React.FC = () => {
  const employmentData = [
    { label: 'Employee ID', value: 'EMP456', icon: 'ID' },
    { label: 'Department', value: 'Technology', icon: 'Briefcase' },
    { label: 'Designation', value: 'Senior Software Engineer', icon: 'Tool' },
    { label: 'Manager', value: 'Jane Doe', icon: 'User' },
    { label: 'Date of Joining', value: '2020-08-15', icon: 'Calendar' },
    { label: 'Employment Status', value: 'Full-time Permanent', icon: 'Check' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-0 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Job Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employmentData.map((item) => (
          <div 
            key={item.label} 
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Salary Information (View Only)</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Salary details are managed securely by HR and cannot be edited here.
        </p>
      </div>
    </div>
  );
};

export default EmploymentDetails;