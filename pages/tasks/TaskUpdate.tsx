import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from './types';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, SaveIcon, XIcon } from '../../icons/Icons';

type Props = { 
  task: Task; 
  onSave: (updated: Task) => void; 
  onCancel: () => void; 
};

const TaskUpdate: React.FC<Props> = ({ task, onSave, onCancel }) => {
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [progress, setProgress] = useState<number>(task.progress);
  // Restrict updates to status, progress, and notes only
  const [notes, setNotes] = useState<string>('');
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [filePickers, setFilePickers] = useState<number[]>([0]);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
      case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'high': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      case 'urgent': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const handleSave = () => {
    const uploadedFiles = (newFiles ? Array.from(newFiles) : []).map((f, idx) => ({
      id: `tf-${Date.now()}-${idx}`,
      name: f.name,
      size: `${Math.ceil(f.size / 1024)} KB`,
      url: '#'
    }));

    const updatedTask = {
      ...task,
      status,
      progress,
      files: [...task.files, ...uploadedFiles],
      // Add a comment if notes are provided
      comments: notes.trim() ? [
        ...task.comments,
        {
          id: `c${Date.now()}`,
          author: 'Current User',
          avatar: 'https://picsum.photos/seed/current/100/100',
          content: notes,
          timestamp: new Date()
        }
      ] : task.comments
    };
    onSave(updatedTask);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg border border-gray-200 dark:border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Update Task Status</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{task.title}</p>
          </div>
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Current Status Display */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Status</h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Priority:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Progress:</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{task.progress}%</span>
              </div>
            </div>
          </div>

          {/* Update Form: Status and Progress only */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as TaskStatus)} 
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Progress: {progress}%
                </label>
                <input 
                  type="range" 
                  min={0} 
                  max={100} 
                  value={progress} 
                  onChange={(e) => setProgress(parseInt(e.target.value))} 
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Attach Documents
            </label>
            <div className="space-y-2">
              {filePickers.map((pickerId, idx) => (
                <input
                  key={pickerId}
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    if (files.length > 0) {
                      setNewFiles((prev) => [...prev, ...files]);
                      if (idx === filePickers.length - 1) {
                        setFilePickers((prev) => [...prev, prev.length]);
                      }
                    }
                  }}
                  className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              ))}
            </div>
            {newFiles.length > 0 && (
              <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 list-disc pl-4">
                {newFiles.map((f, i) => (
                  <li key={`${f.name}-${i}`}>{f.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comment (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note about this update..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
          </div>

          {/* Preview */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <h3 className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-2">Preview Changes</h3>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-blue-700 dark:text-blue-400">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                  {status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-700 dark:text-blue-400">Progress:</span>
                <span className="font-bold text-blue-900 dark:text-blue-300">{progress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={onCancel} 
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <SaveIcon className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdate;


