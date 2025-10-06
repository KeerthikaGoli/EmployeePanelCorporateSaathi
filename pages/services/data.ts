import { Service } from './types';

export const mockServices: Service[] = [
  {
    id: 'SRV-001',
    title: 'Website Development & Maintenance',
    description: 'Complete website development for client including frontend, backend, and ongoing maintenance services. The project includes responsive design, database integration, and SEO optimization.',
    status: 'in-progress',
    priority: 'high',
    category: 'technical',
    assignee: {
      name: 'Sarah Johnson',
      avatar: 'https://picsum.photos/seed/user1/100/100',
      email: 'sarah.j@company.com'
    },
    participants: [
      { name: 'Sarah Johnson', avatar: 'https://picsum.photos/seed/user1/100/100', email: 'sarah.j@company.com' },
      { name: 'John Smith', avatar: 'https://picsum.photos/seed/client1/100/100', email: 'john@techcorp.com' }
    ],
    client: {
      name: 'John Smith',
      company: 'TechCorp Solutions',
      email: 'john@techcorp.com',
      phone: '+1-555-0123'
    },
    dueDate: new Date(2025, 10, 15),
    createdDate: new Date(2025, 9, 1),
    estimatedHours: 120,
    actualHours: 45,
    progress: 38,
    tags: ['Web Development', 'React', 'Node.js', 'Database'],
    files: [
      { id: 'f1', name: 'project-requirements.pdf', size: '2.4 MB', url: '#', type: 'document', uploadedBy: 'client' },
      { id: 'f2', name: 'design-mockups.fig', size: '8.2 MB', url: '#', type: 'image', uploadedBy: 'client' },
      { id: 'f3', name: 'database-schema.sql', size: '156 KB', url: '#', type: 'document', uploadedBy: 'employee' }
    ],
    comments: [
      { id: 'c1', author: 'John Smith', avatar: 'https://picsum.photos/seed/client1/100/100', content: 'The initial design looks great! Please make sure the mobile responsiveness is perfect.', timestamp: new Date(2025, 9, 3) },
      { id: 'c2', author: 'Sarah Johnson', avatar: 'https://picsum.photos/seed/user1/100/100', content: 'Working on the mobile optimization. Will have updates by end of week.', timestamp: new Date(2025, 9, 4) }
    ],
    requirements: [
      'Responsive design for all devices',
      'User authentication system',
      'Payment integration',
      'Admin dashboard',
      'SEO optimization'
    ],
    deliverables: [
      'Fully functional website',
      'Source code documentation',
      'User manual',
      'Deployment guide',
      '3 months maintenance support'
    ],
    budget: 15000,
    location: 'Remote'
  },
  {
    id: 'SRV-002',
    title: 'IT Infrastructure Setup',
    description: 'Complete IT infrastructure setup for new office including network configuration, server setup, and security implementation.',
    status: 'review',
    priority: 'urgent',
    category: 'technical',
    assignee: {
      name: 'Mike Chen',
      avatar: 'https://picsum.photos/seed/user2/100/100',
      email: 'mike.c@company.com'
    },
    participants: [
      { name: 'Mike Chen', avatar: 'https://picsum.photos/seed/user2/100/100', email: 'mike.c@company.com' }
    ],
    client: {
      name: 'Lisa Anderson',
      company: 'StartupXYZ',
      email: 'lisa@startupxyz.com',
      phone: '+1-555-0456'
    },
    dueDate: new Date(2025, 9, 20),
    createdDate: new Date(2025, 8, 15),
    estimatedHours: 80,
    actualHours: 75,
    progress: 94,
    tags: ['Infrastructure', 'Networking', 'Security', 'Servers'],
    files: [
      { id: 'f4', name: 'network-diagram.pdf', size: '1.2 MB', url: '#', type: 'document', uploadedBy: 'client' },
      { id: 'f5', name: 'security-checklist.xlsx', size: '45 KB', url: '#', type: 'document', uploadedBy: 'employee' }
    ],
    comments: [
      { id: 'c3', author: 'Lisa Anderson', avatar: 'https://picsum.photos/seed/client2/100/100', content: 'The network setup is working perfectly. Great job!', timestamp: new Date(2025, 9, 18) }
    ],
    requirements: [
      'Secure network configuration',
      'Server virtualization setup',
      'Backup system implementation',
      'Security protocols',
      'User access management'
    ],
    deliverables: [
      'Configured network infrastructure',
      'Server setup and configuration',
      'Security implementation',
      'Documentation and training',
      '6 months support'
    ],
    budget: 25000,
    location: 'On-site'
  },
  {
    id: 'SRV-003',
    title: 'Digital Marketing Consultation',
    description: 'Comprehensive digital marketing strategy consultation including SEO, social media, and content marketing recommendations.',
    status: 'pending',
    priority: 'medium',
    category: 'consultation',
    assignee: {
      name: 'Emily Rodriguez',
      avatar: 'https://picsum.photos/seed/user3/100/100',
      email: 'emily.r@company.com'
    },
    participants: [
      { name: 'Emily Rodriguez', avatar: 'https://picsum.photos/seed/user3/100/100', email: 'emily.r@company.com' }
    ],
    client: {
      name: 'David Park',
      company: 'Local Business Inc',
      email: 'david@localbusiness.com',
      phone: '+1-555-0789'
    },
    dueDate: new Date(2025, 10, 5),
    createdDate: new Date(2025, 9, 20),
    estimatedHours: 40,
    actualHours: 0,
    progress: 0,
    tags: ['Marketing', 'SEO', 'Social Media', 'Strategy'],
    files: [],
    comments: [],
    requirements: [
      'Market analysis and research',
      'SEO audit and recommendations',
      'Social media strategy',
      'Content marketing plan',
      'Performance metrics setup'
    ],
    deliverables: [
      'Digital marketing strategy document',
      'SEO audit report',
      'Social media strategy',
      'Content calendar',
      'Implementation timeline'
    ],
    budget: 8000,
    location: 'Remote'
  },
  {
    id: 'SRV-004',
    title: 'Software Training Program',
    description: 'Comprehensive training program for new software implementation including user training, documentation, and support.',
    status: 'completed',
    priority: 'medium',
    category: 'training',
    assignee: {
      name: 'Alex Thompson',
      avatar: 'https://picsum.photos/seed/user4/100/100',
      email: 'alex.t@company.com'
    },
    participants: [
      { name: 'Alex Thompson', avatar: 'https://picsum.photos/seed/user4/100/100', email: 'alex.t@company.com' }
    ],
    client: {
      name: 'Maria Garcia',
      company: 'Enterprise Corp',
      email: 'maria@enterprise.com',
      phone: '+1-555-0321'
    },
    dueDate: new Date(2025, 9, 10),
    createdDate: new Date(2025, 8, 1),
    estimatedHours: 60,
    actualHours: 58,
    progress: 100,
    tags: ['Training', 'Software', 'Documentation', 'Support'],
    files: [
      { id: 'f6', name: 'training-materials.pdf', size: '3.1 MB', url: '#', type: 'document', uploadedBy: 'employee' },
      { id: 'f7', name: 'video-tutorials.zip', size: '125 MB', url: '#', type: 'video', uploadedBy: 'employee' }
    ],
    comments: [
      { id: 'c4', author: 'Maria Garcia', avatar: 'https://picsum.photos/seed/client3/100/100', content: 'Excellent training program! All our staff are now proficient with the new software.', timestamp: new Date(2025, 9, 12) }
    ],
    requirements: [
      'User training sessions',
      'Training materials creation',
      'Documentation development',
      'Support system setup',
      'Performance evaluation'
    ],
    deliverables: [
      'Training program completion',
      'User documentation',
      'Video tutorials',
      'Support system',
      'Performance report'
    ],
    budget: 12000,
    location: 'Hybrid'
  },
  {
    id: 'SRV-005',
    title: 'System Maintenance & Updates',
    description: 'Regular system maintenance including updates, security patches, and performance optimization for existing systems.',
    status: 'in-progress',
    priority: 'low',
    category: 'maintenance',
    assignee: {
      name: 'David Wilson',
      avatar: 'https://picsum.photos/seed/user5/100/100',
      email: 'david.w@company.com'
    },
    participants: [
      { name: 'David Wilson', avatar: 'https://picsum.photos/seed/user5/100/100', email: 'david.w@company.com' }
    ],
    client: {
      name: 'Jennifer Lee',
      company: 'Retail Solutions',
      email: 'jennifer@retailsolutions.com',
      phone: '+1-555-0654'
    },
    dueDate: new Date(2025, 10, 1),
    createdDate: new Date(2025, 9, 15),
    estimatedHours: 20,
    actualHours: 8,
    progress: 40,
    tags: ['Maintenance', 'Updates', 'Security', 'Performance'],
    files: [
      { id: 'f8', name: 'maintenance-log.xlsx', size: '32 KB', url: '#', type: 'document', uploadedBy: 'employee' }
    ],
    comments: [
      { id: 'c5', author: 'David Wilson', avatar: 'https://picsum.photos/seed/user5/100/100', content: 'Security patches applied successfully. System performance has improved by 15%.', timestamp: new Date(2025, 9, 18) }
    ],
    requirements: [
      'Regular system updates',
      'Security patch implementation',
      'Performance monitoring',
      'Backup verification',
      'System optimization'
    ],
    deliverables: [
      'Updated system components',
      'Security patches applied',
      'Performance optimization',
      'Maintenance report',
      'Ongoing support'
    ],
    budget: 5000,
    location: 'Remote'
  }
];
