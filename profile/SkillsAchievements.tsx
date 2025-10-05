import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '../icons/Icons';

const mockSkills = ['ReactJS', 'Node.js', 'AWS Cloud', 'REST API Design'];
const mockAchievements = [
    { id: 1, name: 'AWS Certified Developer', date: '2023-05-10' },
    { id: 2, name: 'PMP Certification', date: '2021-11-20' },
];

const SkillsAchievements: React.FC = () => {
  const [skills, setSkills] = useState(mockSkills);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-0 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills & Competencies</h2>

      <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">My Skills</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <span key={skill} className="inline-flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
              {skill}
              <button 
                onClick={() => removeSkill(skill)}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:text-red-600 transition-colors"
                title="Remove skill"
              >
                <TrashIcon className="w-4 h-2" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add new skill (e.g., Python)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={addSkill}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex items-center"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Certifications / Achievements</h3>
        
        <ul className="space-y-3">
            {achievements.map((item) => (
                <li key={item.id} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Achieved: {item.date}</span>
                </li>
            ))}
            {achievements.length === 0 && (
                <li className="text-sm text-gray-500 italic">No achievements recorded.</li>
            )}
        </ul>
      </div>
    </div>
  );
};

export default SkillsAchievements;