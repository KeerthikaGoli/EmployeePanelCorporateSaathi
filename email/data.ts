import { EmailItem } from '../types';

export const mockEmails: EmailItem[] = [
  { id: 'e1', from: { name: 'HR Team', email: 'hr@corporatesaathi.com' }, to: { name: 'Admin User', email: 'admin@corporatesaathi.com' }, subject: 'Welcome to CorporateSaathi', body: 'Hello!', timestamp: new Date().toISOString(), read: false },
  { id: 'e2', from: { name: 'IT Support', email: 'it@corporatesaathi.com' }, to: { name: 'Admin User', email: 'admin@corporatesaathi.com' }, subject: 'Password Policy Update', body: 'Please review.', timestamp: new Date().toISOString(), read: true },
];


