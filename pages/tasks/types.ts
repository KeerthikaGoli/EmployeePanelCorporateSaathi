export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskFile {
  id: string;
  name: string;
  size: string;
  url: string;
}

export interface TaskComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: {
    name: string;
    avatar: string;
    email: string;
  };
  dueDate: Date;
  createdDate: Date;
  tags: string[];
  files: TaskFile[];
  comments: TaskComment[];
  progress: number;
  estimatedHours: number;
  actualHours: number;
}


