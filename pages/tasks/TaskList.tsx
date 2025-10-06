import React, { useMemo, useState } from 'react';
import { SearchIcon, FilterIcon, CalendarIcon, PaperclipIcon, PlusIcon, EyeIcon, EditIcon } from '../../icons/Icons';
import { Task, TaskStatus, TaskPriority } from './types';
import { mockTasks } from './data';

type Props = { 
  onOpenTask: (taskId: string) => void;
  onCreateTask?: () => void;
  onUpdateTask?: (taskId: string) => void;
};

const statusBadge: Record<TaskStatus, string> = {
  'todo': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  'review': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  'completed': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
};

const priorityBadge: Record<TaskPriority, string> = {
  'low': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  'medium': 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  'high': 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  'urgent': 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
};

const TaskList: React.FC<Props> = ({ onOpenTask, onCreateTask, onUpdateTask }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');
  const [priority, setPriority] = useState<TaskPriority | 'all'>('all');

  const tasks = useMemo(() => {
    return mockTasks.filter(t => {
      const q = query.toLowerCase();
      const matches = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q));
      const matchesStatus = status === 'all' || t.status === status;
      const matchesPriority = priority === 'all' || t.priority === priority;
      return matches && matchesStatus && matchesPriority;
    });
  }, [query, status, priority]);

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: `${Math.abs(diffDays)} days overdue`, urgent: true };
    if (diffDays === 0) return { text: 'Due today', urgent: true };
    if (diffDays === 1) return { text: 'Due tomorrow', urgent: true };
    if (diffDays <= 3) return { text: `${diffDays} days left`, urgent: true };
    return { text: `${diffDays} days left`, urgent: false };
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Management</h1>
        {onCreateTask && (
          <button 
            onClick={onCreateTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Create Task
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </div>
          <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search tasks..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5 text-gray-500" />
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value as TaskStatus | 'all')} 
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value as TaskPriority | 'all')} 
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{tasks.filter(t => t.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{tasks.filter(t => t.status === 'review').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Review</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{tasks.filter(t => t.status === 'completed').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((t: Task) => {
          const dueInfo = getDaysUntilDue(t.dueDate);
          return (
            <div key={t.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{t.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityBadge[t.priority]}`}>
                    {t.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge[t.status]}`}>
                    {t.status.replace('-', ' ')}
                  </span>
                  {onUpdateTask && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateTask(t.id);
                      }}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <EditIcon className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              {/* Title and Description */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{t.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{t.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{t.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${t.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Tags */}
              {t.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {t.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {t.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{t.tags.length - 2} more</span>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <img src={t.assignee.avatar} className="w-6 h-6 rounded-full" alt={t.assignee.name} />
                  <span className="truncate">{t.assignee.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                    <span>{t.participants.length}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${dueInfo.urgent ? 'text-red-600 dark:text-red-400' : ''}`}>
                    <CalendarIcon className="w-4 h-4" />
                    <span>{dueInfo.text}</span>
                  </div>
                  {t.files.length > 0 && (
                    <div className="flex items-center gap-1">
                      <PaperclipIcon className="w-4 h-4" />
                      <span>{t.files.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => onOpenTask(t.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <EyeIcon className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or create a new task.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;


