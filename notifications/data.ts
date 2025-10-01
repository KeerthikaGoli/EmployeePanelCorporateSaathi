import { Notification } from '../types';

export const mockNotifications: Notification[] = [
  { id: '1', type: 'project', message: 'New task assigned: Client onboarding', timestamp: new Date().toISOString(), read: false },
  { id: '2', type: 'announcement', message: 'System maintenance this weekend', timestamp: new Date().toISOString(), read: false, priority: 'Urgent' },
  { id: '3', type: 'service', message: 'Service request updated by Finance', timestamp: new Date().toISOString(), read: true },
];


