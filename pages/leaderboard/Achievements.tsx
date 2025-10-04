import React, { useState } from 'react';
import { TrophyIcon, MedalIcon, StarIcon, AwardIcon, CrownIcon, FireIcon, TargetIcon, GiftIcon, BadgeIcon, CheckIcon } from '../../icons/Icons';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  category: 'performance' | 'milestone' | 'teamwork' | 'innovation' | 'leadership';
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedDate?: Date;
  progress?: number;
  maxProgress?: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'gift' | 'experience' | 'recognition' | 'benefit';
  available: boolean;
  claimed: boolean;
  claimedDate?: Date;
  icon: React.ReactElement;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Task Master',
    description: 'Complete 50 tasks successfully',
    icon: <TargetIcon className="w-6 h-6" />,
    category: 'performance',
    points: 100,
    rarity: 'common',
    unlocked: true,
    unlockedDate: new Date('2024-09-15'),
    progress: 50,
    maxProgress: 50
  },
  {
    id: '2',
    title: 'Team Player',
    description: 'Collaborate on 20 team projects',
    icon: <StarIcon className="w-6 h-6" />,
    category: 'teamwork',
    points: 150,
    rarity: 'rare',
    unlocked: true,
    unlockedDate: new Date('2024-09-20'),
    progress: 20,
    maxProgress: 20
  },
  {
    id: '3',
    title: 'Innovation Pioneer',
    description: 'Propose 5 innovative solutions',
    icon: <FireIcon className="w-6 h-6" />,
    category: 'innovation',
    points: 200,
    rarity: 'epic',
    unlocked: false,
    progress: 3,
    maxProgress: 5
  },
  {
    id: '4',
    title: 'Leadership Excellence',
    description: 'Lead 3 successful projects',
    icon: <CrownIcon className="w-6 h-6" />,
    category: 'leadership',
    points: 300,
    rarity: 'legendary',
    unlocked: false,
    progress: 1,
    maxProgress: 3
  },
  {
    id: '5',
    title: 'Perfect Attendance',
    description: 'Maintain 100% attendance for 3 months',
    icon: <CheckIcon className="w-6 h-6" />,
    category: 'milestone',
    points: 75,
    rarity: 'common',
    unlocked: true,
    unlockedDate: new Date('2024-10-01'),
    progress: 90,
    maxProgress: 90
  },
  {
    id: '6',
    title: 'Mentor Master',
    description: 'Mentor 5 junior colleagues',
    icon: <AwardIcon className="w-6 h-6" />,
    category: 'leadership',
    points: 250,
    rarity: 'epic',
    unlocked: false,
    progress: 2,
    maxProgress: 5
  }
];

const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'Extra Day Off',
    description: 'Take an additional paid day off',
    points: 500,
    category: 'benefit',
    available: true,
    claimed: false,
    icon: <GiftIcon className="w-6 h-6" />
  },
  {
    id: '2',
    title: 'Conference Pass',
    description: 'Attend a professional conference of your choice',
    points: 750,
    category: 'experience',
    available: true,
    claimed: true,
    claimedDate: new Date('2024-09-25'),
    icon: <TrophyIcon className="w-6 h-6" />
  },
  {
    id: '3',
    title: 'Lunch with CEO',
    description: 'One-on-one lunch meeting with the CEO',
    points: 1000,
    category: 'recognition',
    available: true,
    claimed: false,
    icon: <CrownIcon className="w-6 h-6" />
  },
  {
    id: '4',
    title: 'Gift Card $100',
    description: 'Amazon gift card worth $100',
    points: 300,
    category: 'gift',
    available: true,
    claimed: false,
    icon: <GiftIcon className="w-6 h-6" />
  },
  {
    id: '5',
    title: 'Training Course',
    description: 'Enroll in any professional training course',
    points: 600,
    category: 'experience',
    available: true,
    claimed: false,
    icon: <StarIcon className="w-6 h-6" />
  }
];

const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'rewards'>('achievements');
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'performance', 'milestone', 'teamwork', 'innovation', 'leadership'];
  const rewardCategories = ['all', 'gift', 'experience', 'recognition', 'benefit'];

  const filteredAchievements = mockAchievements.filter(achievement => {
    const statusMatch = filter === 'all' || 
      (filter === 'unlocked' && achievement.unlocked) || 
      (filter === 'locked' && !achievement.unlocked);
    
    const categoryMatch = categoryFilter === 'all' || achievement.category === categoryFilter;
    
    return statusMatch && categoryMatch;
  });

  const filteredRewards = mockRewards.filter(reward => {
    const categoryMatch = categoryFilter === 'all' || reward.category === categoryFilter;
    return categoryMatch;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'epic': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'milestone': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'teamwork': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'innovation': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'leadership': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const totalPoints = mockAchievements
    .filter(a => a.unlocked)
    .reduce((sum, achievement) => sum + achievement.points, 0);

  const unlockedCount = mockAchievements.filter(a => a.unlocked).length;
  const totalCount = mockAchievements.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Achievements & Rewards</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your progress and redeem rewards</p>
        </div>
        <div className="flex items-center gap-2">
          <TrophyIcon className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <TrophyIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+2</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{unlockedCount}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Achievements Unlocked</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <StarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+150</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{totalPoints}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <GiftIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+1</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">3</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Rewards Available</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <MedalIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+25%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {Math.round((unlockedCount / totalCount) * 100)}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'achievements'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rewards'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rewards
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {activeTab === 'achievements' ? 'Status' : 'Category'}
              </label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {activeTab === 'achievements' ? (
                  <>
                    <option value="all">All Achievements</option>
                    <option value="unlocked">Unlocked</option>
                    <option value="locked">Locked</option>
                  </>
                ) : (
                  <>
                    <option value="all">All Rewards</option>
                    <option value="available">Available</option>
                    <option value="claimed">Claimed</option>
                  </>
                )}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {(activeTab === 'achievements' ? categories : rewardCategories).map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'achievements' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`rounded-xl p-6 border-2 transition-all duration-200 ${
                    achievement.unlocked 
                      ? 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-green-100 dark:bg-green-900/20' 
                        : 'bg-gray-100 dark:bg-gray-600'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity.toUpperCase()}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {achievement.points} pts
                      </span>
                    </div>
                  </div>

                  <h3 className={`font-bold text-lg mb-2 ${
                    achievement.unlocked 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {achievement.description}
                  </p>

                  <div className="space-y-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
                      {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                    </span>
                    
                    {achievement.unlocked && achievement.unlockedDate && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Unlocked on {achievement.unlockedDate.toLocaleDateString()}
                      </p>
                    )}
                    
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(achievement.progress / achievement.maxProgress!) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map(reward => (
                <div 
                  key={reward.id} 
                  className={`rounded-xl p-6 border-2 transition-all duration-200 ${
                    reward.claimed 
                      ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600' 
                      : reward.available
                      ? 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      reward.claimed 
                        ? 'bg-gray-100 dark:bg-gray-600' 
                        : reward.available
                        ? 'bg-blue-100 dark:bg-blue-900/20'
                        : 'bg-gray-100 dark:bg-gray-600'
                    }`}>
                      {reward.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {reward.points} pts
                      </span>
                      {reward.claimed && reward.claimedDate && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Claimed {reward.claimedDate.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <h3 className={`font-bold text-lg mb-2 ${
                    reward.claimed 
                      ? 'text-gray-500 dark:text-gray-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {reward.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {reward.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      reward.claimed 
                        ? 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                    </span>
                    
                    {!reward.claimed && reward.available && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Claim Reward
                      </button>
                    )}
                    
                    {reward.claimed && (
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        ✓ Claimed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
