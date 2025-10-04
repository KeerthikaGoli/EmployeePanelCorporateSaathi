import React, { useState } from 'react';
import PerformanceLeaderboard from './PerformanceLeaderboard';
import Achievements from './Achievements';

const LeaderboardApp: React.FC = () => {
  const [activeView, setActiveView] = useState<'performance' | 'achievements'>('performance');

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveView('performance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'performance'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Performance Leaderboard
            </button>
            <button
              onClick={() => setActiveView('achievements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'achievements'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Achievements & Rewards
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeView === 'performance' && <PerformanceLeaderboard />}
      {activeView === 'achievements' && <Achievements />}
    </div>
  );
};

export default LeaderboardApp;
