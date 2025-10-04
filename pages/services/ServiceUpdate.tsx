import React, { useState } from 'react';
import { Service, ServiceStatus, ServicePriority } from './types';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, SaveIcon, XIcon, DollarSignIcon, MapPinIcon } from '../../icons/Icons';

type Props = { 
  service: Service; 
  onSave: (updated: Service) => void; 
  onCancel: () => void; 
};

const ServiceUpdate: React.FC<Props> = ({ service, onSave, onCancel }) => {
  const [status, setStatus] = useState<ServiceStatus>(service.status);
  const [progress, setProgress] = useState<number>(service.progress);
  const [priority, setPriority] = useState<ServicePriority>(service.priority);
  const [actualHours, setActualHours] = useState<number>(service.actualHours);
  const [budget, setBudget] = useState<number>(service.budget);
  const [notes, setNotes] = useState<string>('');

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const getPriorityColor = (priority: ServicePriority) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
      case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'high': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      case 'urgent': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const handleSave = () => {
    const updatedService = {
      ...service,
      status,
      progress,
      priority,
      actualHours,
      budget,
      comments: notes.trim() ? [
        ...service.comments,
        {
          id: `c${Date.now()}`,
          author: 'Current User',
          avatar: 'https://picsum.photos/seed/current/100/100',
          content: notes,
          timestamp: new Date()
        }
      ] : service.comments
    };
    onSave(updatedService);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg border border-gray-200 dark:border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Update Service Status</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{service.title}</p>
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
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                  {service.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Priority:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(service.priority)}`}>
                  {service.priority.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Progress:</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{service.progress}%</span>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status and Priority */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as ServiceStatus)} 
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value as ServicePriority)} 
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Progress and Hours */}
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

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hours: {actualHours}h / {service.estimatedHours}h
                </label>
                <input 
                  type="number" 
                  min={0} 
                  max={service.estimatedHours * 2} 
                  value={actualHours} 
                  onChange={(e) => setActualHours(parseInt(e.target.value) || 0)} 
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-green-600 h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((actualHours / service.estimatedHours) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Budget: ${budget.toLocaleString()}
            </label>
            <input 
              type="number" 
              min={0} 
              value={budget} 
              onChange={(e) => setBudget(parseInt(e.target.value) || 0)} 
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Update Notes (Optional)
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
              <div className="flex items-center gap-1">
                <span className="text-blue-700 dark:text-blue-400">Budget:</span>
                <span className="font-bold text-blue-900 dark:text-blue-300">${budget.toLocaleString()}</span>
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

export default ServiceUpdate;
