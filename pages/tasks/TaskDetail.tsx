import React, { useState } from 'react';
import { CalendarIcon, PaperclipIcon, UserIcon, ClockIcon, TagIcon, XIcon, DownloadIcon, EditIcon, CheckIcon } from '../../icons/Icons';
import { Task, TaskStatus } from './types';

type Props = { 
  task: Task; 
  onClose: () => void;
  onUpdate?: (taskId: string) => void;
};

const TaskDetail: React.FC<Props> = ({ task, onClose, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
      case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'high': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      case 'urgent': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

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

  const dueInfo = getDaysUntilDue(task.dueDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ').toUpperCase()}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{task.id}</p>
          </div>
          <div className="flex items-center gap-2">
            {onUpdate && (
              <button 
                onClick={() => onUpdate(task.id)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                title="Update Task"
              >
                <EditIcon className="w-5 h-5" />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Task Description</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{task.description}</p>
                </div>
              </div>

              {/* Progress Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Progress</h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completion</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Hours: {task.actualHours}h / {task.estimatedHours}h</span>
                    <span>Remaining: {task.estimatedHours - task.actualHours}h</span>
                  </div>
                </div>
              </div>

              {/* Files Section */}
              {task.files.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Attachments ({task.files.length})</h3>
                  <div className="space-y-3">
                    {task.files.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <PaperclipIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{file.size}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <DownloadIcon className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comments ({task.comments.length})</h3>
                  <button 
                    onClick={() => setShowComments(!showComments)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {showComments ? 'Hide' : 'Show'} Comments
                  </button>
                </div>
                
                {showComments && (
                  <div className="space-y-4">
                    {task.comments.map(comment => (
                      <div key={comment.id} className="flex gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <img src={comment.avatar} className="w-8 h-8 rounded-full" alt={comment.author} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {comment.timestamp.toLocaleDateString()} at {comment.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Comment */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end mt-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Task Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Information</h3>
                
                <div className="space-y-4">
                  {/* Assignee */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignee</label>
                    <div className="flex items-center gap-3 mt-1">
                      <img src={task.assignee.avatar} className="w-8 h-8 rounded-full" alt={task.assignee.name} />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{task.assignee.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{task.assignee.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                    <div className={`flex items-center gap-2 mt-1 ${dueInfo.urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      <CalendarIcon className="w-4 h-4" />
                      <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <p className={`text-xs mt-1 ${dueInfo.urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {dueInfo.text}
                    </p>
                  </div>

                  {/* Time Tracking */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Tracking</label>
                    <div className="flex items-center gap-2 mt-1 text-gray-700 dark:text-gray-300">
                      <ClockIcon className="w-4 h-4" />
                      <span>{task.actualHours}h / {task.estimatedHours}h</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((task.actualHours / task.estimatedHours) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Created</label>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      {task.createdDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {task.tags.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full">
                        <TagIcon className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;


