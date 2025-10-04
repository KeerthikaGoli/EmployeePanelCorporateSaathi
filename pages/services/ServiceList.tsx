import React, { useMemo, useState } from 'react';
import { SearchIcon, FilterIcon, CalendarIcon, PaperclipIcon, PlusIcon, EyeIcon, EditIcon, UserIcon, BuildingIcon, PhoneIcon, MailIcon } from '../../icons/Icons';
import { Service, ServiceStatus, ServicePriority, ServiceCategory } from './types';
import { mockServices } from './data';

type Props = { 
  onOpenService: (serviceId: string) => void;
  onCreateService?: () => void;
  onUpdateService?: (serviceId: string) => void;
};

const ServiceList: React.FC<Props> = ({ onOpenService, onCreateService, onUpdateService }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ServiceStatus | 'all'>('all');
  const [priority, setPriority] = useState<ServicePriority | 'all'>('all');
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all');

  const services = useMemo(() => {
    return mockServices.filter(s => {
      const q = query.toLowerCase();
      const matches = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tags.some(tag => tag.toLowerCase().includes(q)) || s.client.name.toLowerCase().includes(q) || s.client.company.toLowerCase().includes(q);
      const matchesStatus = status === 'all' || s.status === status;
      const matchesPriority = priority === 'all' || s.priority === priority;
      const matchesCategory = category === 'all' || s.category === category;
      return matches && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [query, status, priority, category]);

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

  const getCategoryColor = (category: ServiceCategory) => {
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

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Service Management</h1>
        {onCreateService && (
          <button 
            onClick={onCreateService}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Create Service
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
            placeholder="Search services..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5 text-gray-500" />
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value as ServiceStatus | 'all')} 
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value as ServicePriority | 'all')} 
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value as ServiceCategory | 'all')} 
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="support">Support</option>
            <option value="maintenance">Maintenance</option>
            <option value="consultation">Consultation</option>
            <option value="training">Training</option>
          </select>
        </div>
      </div>

      {/* Service Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{services.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Services</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{services.filter(s => s.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{services.filter(s => s.status === 'review').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Review</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{services.filter(s => s.status === 'completed').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{services.filter(s => s.status === 'pending').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => {
          const dueInfo = getDaysUntilDue(service.dueDate);
          return (
            <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{service.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(service.priority)}`}>
                    {service.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(service.status)}`}>
                    {service.status.replace('-', ' ')}
                  </span>
                  {onUpdateService && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateService(service.id);
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
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{service.description}</p>
              </div>

              {/* Category and Client Info */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(service.category)}`}>
                    {service.category.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <BuildingIcon className="w-4 h-4" />
                  <span className="truncate">{service.client.company}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <UserIcon className="w-4 h-4" />
                  <span className="truncate">{service.client.name}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{service.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${service.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Tags */}
              {service.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {service.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {service.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{service.tags.length - 2} more</span>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <img src={service.assignee.avatar} className="w-6 h-6 rounded-full" alt={service.assignee.name} />
                  <span className="truncate">{service.assignee.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 ${dueInfo.urgent ? 'text-red-600 dark:text-red-400' : ''}`}>
                    <CalendarIcon className="w-4 h-4" />
                    <span>{dueInfo.text}</span>
                  </div>
                  {service.files.length > 0 && (
                    <div className="flex items-center gap-1">
                      <PaperclipIcon className="w-4 h-4" />
                      <span>{service.files.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Budget and Hours */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Budget: ${service.budget.toLocaleString()}</span>
                <span>{service.actualHours}h / {service.estimatedHours}h</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => onOpenService(service.id)}
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

      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No services found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or create a new service.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
