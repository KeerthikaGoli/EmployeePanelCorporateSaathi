import React, { useState, useMemo } from 'react';
import { TrendingUpIcon, TrophyIcon, StarIcon, MedalIcon, AwardIcon, CrownIcon, FireIcon, TargetIcon } from '../../icons/Icons';

interface Employee {
  id: string;
  name: string;
  avatar: string;
  department: string;
  position: string;
  performance: number;
  tasksCompleted: number;
  tasksTotal: number;
  rating: number;
  achievements: string[];
  rank: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    department: 'Engineering',
    position: 'Senior Developer',
    performance: 95,
    tasksCompleted: 28,
    tasksTotal: 30,
    rating: 4.9,
    achievements: ['Top Performer', 'Task Master', 'Team Player'],
    rank: 1,
    trend: 'up',
    change: 5
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://picsum.photos/seed/user2/100/100',
    department: 'Design',
    position: 'UI/UX Designer',
    performance: 92,
    tasksCompleted: 24,
    tasksTotal: 26,
    rating: 4.8,
    achievements: ['Creative Genius', 'Design Excellence'],
    rank: 2,
    trend: 'up',
    change: 3
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'https://picsum.photos/seed/user3/100/100',
    department: 'Marketing',
    position: 'Marketing Manager',
    performance: 89,
    tasksCompleted: 22,
    tasksTotal: 25,
    rating: 4.7,
    achievements: ['Campaign Master', 'Growth Driver'],
    rank: 3,
    trend: 'stable',
    change: 0
  },
  {
    id: '4',
    name: 'David Park',
    avatar: 'https://picsum.photos/seed/user4/100/100',
    department: 'Engineering',
    position: 'DevOps Engineer',
    performance: 87,
    tasksCompleted: 20,
    tasksTotal: 23,
    rating: 4.6,
    achievements: ['Infrastructure Hero'],
    rank: 4,
    trend: 'up',
    change: 2
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    avatar: 'https://picsum.photos/seed/user5/100/100',
    department: 'Sales',
    position: 'Sales Director',
    performance: 85,
    tasksCompleted: 18,
    tasksTotal: 22,
    rating: 4.5,
    achievements: ['Sales Champion'],
    rank: 5,
    trend: 'down',
    change: -1
  },
  {
    id: '6',
    name: 'Alex Thompson',
    avatar: 'https://picsum.photos/seed/user6/100/100',
    department: 'Engineering',
    position: 'Frontend Developer',
    performance: 83,
    tasksCompleted: 16,
    tasksTotal: 20,
    rating: 4.4,
    achievements: ['Code Quality'],
    rank: 6,
    trend: 'up',
    change: 4
  },
  {
    id: '7',
    name: 'Maria Garcia',
    avatar: 'https://picsum.photos/seed/user7/100/100',
    department: 'HR',
    position: 'HR Manager',
    performance: 81,
    tasksCompleted: 15,
    tasksTotal: 18,
    rating: 4.3,
    achievements: ['Team Builder'],
    rank: 7,
    trend: 'stable',
    change: 0
  },
  {
    id: '8',
    name: 'John Wilson',
    avatar: 'https://picsum.photos/seed/user8/100/100',
    department: 'Finance',
    position: 'Financial Analyst',
    performance: 79,
    tasksCompleted: 14,
    tasksTotal: 17,
    rating: 4.2,
    achievements: ['Financial Wizard'],
    rank: 8,
    trend: 'up',
    change: 1
  }
];

const PerformanceLeaderboard: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'department'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');

  const departments = ['all', ...Array.from(new Set(mockEmployees.map(emp => emp.department)))];

  const filteredEmployees = useMemo(() => {
    let filtered = mockEmployees;
    
    if (filter === 'department' && selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }
    
    return filtered.sort((a, b) => b.performance - a.performance);
  }, [filter, selectedDepartment]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <CrownIcon className="w-6 h-6 text-yellow-500" />;
      case 2: return <MedalIcon className="w-6 h-6 text-gray-400" />;
      case 3: return <AwardIcon className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUpIcon className="w-4 h-4 text-red-500 rotate-180" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600 dark:text-green-400';
    if (performance >= 80) return 'text-blue-600 dark:text-blue-400';
    if (performance >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPerformanceBg = (performance: number) => {
    if (performance >= 90) return 'bg-green-100 dark:bg-green-900/20';
    if (performance >= 80) return 'bg-blue-100 dark:bg-blue-900/20';
    if (performance >= 70) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and celebrate top performers across the organization</p>
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
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">8</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Top Performers</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TargetIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">92%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Performance</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <StarIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4.6</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FireIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">+22%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">147</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeframe</label>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value as 'month' | 'quarter' | 'year')}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Department</label>
            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Rankings</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Ranked by overall performance score</p>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredEmployees.map((employee, index) => (
            <div key={employee.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700">
                    {getRankIcon(employee.rank)}
                  </div>

                  {/* Employee Info */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{employee.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{employee.position}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{employee.department}</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="flex items-center gap-6">
                  {/* Performance Score */}
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getPerformanceColor(employee.performance)}`}>
                      {employee.performance}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Performance</div>
                  </div>

                  {/* Tasks Completed */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {employee.tasksCompleted}/{employee.tasksTotal}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Tasks</div>
                  </div>

                  {/* Rating */}
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {employee.rating}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center gap-2">
                    {getTrendIcon(employee.trend)}
                    <span className={`text-sm font-medium ${
                      employee.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                      employee.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      {employee.change > 0 ? '+' : ''}{employee.change}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {employee.achievements.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {employee.achievements.map((achievement, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                    >
                      <AwardIcon className="w-3 h-3" />
                      {achievement}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceLeaderboard;
