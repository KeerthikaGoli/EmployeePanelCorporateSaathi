export type ServiceStatus = 'pending' | 'in-progress' | 'review' | 'completed' | 'cancelled';
export type ServicePriority = 'low' | 'medium' | 'high' | 'urgent';
export type ServiceCategory = 'technical' | 'support' | 'maintenance' | 'consultation' | 'training';

export interface ServiceFile {
  id: string;
  name: string;
  size: string;
  url: string;
  type: 'document' | 'image' | 'video' | 'other';
}

export interface ServiceComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  status: ServiceStatus;
  priority: ServicePriority;
  category: ServiceCategory;
  assignee: {
    name: string;
    avatar: string;
    email: string;
  };
  client: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  dueDate: Date;
  createdDate: Date;
  estimatedHours: number;
  actualHours: number;
  progress: number;
  tags: string[];
  files: ServiceFile[];
  comments: ServiceComment[];
  requirements: string[];
  deliverables: string[];
  budget: number;
  location: string;
}
