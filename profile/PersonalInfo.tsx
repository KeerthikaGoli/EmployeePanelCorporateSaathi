import React, { useState } from 'react';

const PersonalInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const initialData = {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.j@company.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, USA',
  };
  
  const [data, setData] = useState(initialData);
  const [draftData, setDraftData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftData({ ...draftData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setDraftData(data);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    console.log('Saving Personal Info:', draftData);
    setData(draftData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setDraftData(data);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-0 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Details</h2>
        <div className="flex space-x-3"> 
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="py-2 px-4 text-sm font-semibold rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white">
              Edit Info
            </button>
          )}

          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="py-2 px-4 text-sm font-semibold rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(data).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 capitalize mb-1">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type={key === 'email' ? 'email' : 'text'}
              name={key}
              value={(isEditing ? draftData : data as any)[key]} 
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full p-3 border rounded-lg transition-all ${
                isEditing
                  ? 'border-blue-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfo;