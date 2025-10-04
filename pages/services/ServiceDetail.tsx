import React, { useState } from 'react';
import { CalendarIcon, PaperclipIcon, UserIcon, ClockIcon, TagIcon, XIcon, DownloadIcon, EditIcon, CheckIcon, BuildingIcon, PhoneIcon, MailIcon, DollarSignIcon, MapPinIcon } from '../../icons/Icons';
import { Service, ServiceStatus } from './types';

type Props = { 
  service: Service; 
  onClose: () => void;
  onUpdate?: (serviceId: string) => void;
};

const ServiceDetail: React.FC<Props> = ({ service, onClose, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
      case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'high': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      case 'urgent': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'support': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'maintenance': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'consultation': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'training': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400';
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

  const dueInfo = getDaysUntilDue(service.dueDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500 font-mono">{service.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(service.status)}`}>
                  {service.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(service.priority)}`}>
                  {service.priority.toUpperCase()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(service.category)}`}>
                  {service.category.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onUpdate && (
              <button 
                onClick={() => onUpdate(service.id)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <EditIcon className="w-4 h-4" />
                Update Service
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <XIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area (Description, Progress, Files, Comments) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Service Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{service.description}</p>
              </div>

              {/* Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Progress</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{service.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${service.progress}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Estimated Hours:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{service.estimatedHours}h</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Actual Hours:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{service.actualHours}h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {service.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckIcon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Deliverables</h3>
                <ul className="space-y-2">
                  {service.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Files */}
              {service.files.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Attachments ({service.files.length})</h3>
                  <div className="space-y-2">
                    {service.files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <PaperclipIcon className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{file.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{file.size}</div>
                          </div>
                        </div>
                        <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          <DownloadIcon className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comments ({service.comments.length})</h3>
                  <button 
                    onClick={() => setShowComments(!showComments)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {showComments ? 'Hide' : 'Show'} Comments
                  </button>
                </div>
                
                {showComments && (
                  <div className="space-y-4">
                    {service.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full" />
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

            {/* Sidebar (Service Info, Client Info, Tags) */}
            <div className="space-y-6">
              {/* Service Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Assigned to</div>
                      <div className="font-medium text-gray-900 dark:text-white">{service.assignee.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Due Date</div>
                      <div className={`font-medium ${dueInfo.urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                        {service.dueDate.toLocaleDateString()}
                      </div>
                      <div className={`text-xs ${dueInfo.urgent ? 'text-red-500' : 'text-gray-500'}`}>
                        {dueInfo.text}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Time Tracking</div>
                      <div className="font-medium text-gray-900 dark:text-white">{service.actualHours}h / {service.estimatedHours}h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Created</div>
                      <div className="font-medium text-gray-900 dark:text-white">{service.createdDate.toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{service.client.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{service.client.company}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MailIcon className="w-5 h-5 text-gray-500" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">{service.client.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-gray-500" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">{service.client.phone}</div>
                  </div>
                </div>
              </div>

              {/* Budget & Location */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DollarSignIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Budget</div>
                      <div className="font-medium text-gray-900 dark:text-white">${service.budget.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                      <div className="font-medium text-gray-900 dark:text-white">{service.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {service.tags.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">
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

export default ServiceDetail;
