import { Task } from './types';

export const mockTasks: Task[] = [
  {
    id: 'TSK-001',
    title: 'Implement User Authentication System',
    description: 'Design and implement a secure user authentication system with JWT tokens, password hashing, and session management. Include email verification and password reset functionality.',
    status: 'in-progress',
    priority: 'high',
    assignee: {
      name: 'Sarah Johnson',
      avatar: 'https://picsum.photos/seed/user1/100/100',
      email: 'sarah.j@company.com'
    },
    dueDate: new Date(2025, 9, 15),
    createdDate: new Date(2025, 9, 1),
    tags: ['Backend', 'Security', 'Authentication'],
    files: [
      { id: 'f1', name: 'auth-requirements.pdf', size: '2.4 MB', url: '#' },
      { id: 'f2', name: 'api-documentation.docx', size: '1.1 MB', url: '#' }
    ],
    comments: [
      { id: 'c1', author: 'John Doe', avatar: 'https://picsum.photos/seed/user2/100/100', content: 'Great progress! Please make sure to implement rate limiting.', timestamp: new Date(2025, 9, 3) }
    ],
    progress: 60,
    estimatedHours: 40,
    actualHours: 24
  },
  {
    id: 'TSK-002',
    title: 'Design New Landing Page',
    description: 'Create a modern, responsive landing page design with engaging animations and clear call-to-action buttons.',
    status: 'review',
    priority: 'medium',
    assignee: { name: 'Mike Chen', avatar: 'https://picsum.photos/seed/user3/100/100', email: 'mike.c@company.com' },
    dueDate: new Date(2025, 9, 10),
    createdDate: new Date(2025, 8, 28),
    tags: ['Design', 'Frontend', 'UI/UX'],
    files: [{ id: 'f3', name: 'landing-mockup.fig', size: '5.8 MB', url: '#' }],
    comments: [],
    progress: 90,
    estimatedHours: 20,
    actualHours: 18
  },
  {
    id: 'TSK-003',
    title: 'Database Performance Optimization',
    description: 'Analyze and optimize database queries, add proper indexing, and implement caching strategies.',
    status: 'todo',
    priority: 'urgent',
    assignee: { name: 'Emily Rodriguez', avatar: 'https://picsum.photos/seed/user4/100/100', email: 'emily.r@company.com' },
    dueDate: new Date(2025, 9, 8),
    createdDate: new Date(2025, 9, 2),
    tags: ['Database', 'Performance', 'Backend'],
    files: [],
    comments: [ { id: 'c2', author: 'Admin User', avatar: 'https://picsum.photos/seed/admin/100/100', content: 'This is critical for our upcoming launch. Please prioritize.', timestamp: new Date(2025, 9, 2) } ],
    progress: 0,
    estimatedHours: 30,
    actualHours: 0
  }
];


