export type NotificationType = 'project' | 'service' | 'leave' | 'announcement' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  priority?: 'Normal' | 'Urgent';
  read: boolean;
}

export interface EmailAddress {
  name: string;
  email: string;
}

export interface EmailItem {
  id: string;
  from: EmailAddress;
  to: EmailAddress;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
}


