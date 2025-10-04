import React, { useMemo, useState } from 'react';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import TaskUpdate from './TaskUpdate';
import { Task } from './types';
import { mockTasks } from './data';
import { PlusIcon } from '../../icons/Icons';

const TasksApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const activeTask = useMemo(() => tasks.find(t => t.id === activeTaskId) || null, [tasks, activeTaskId]);

  const handleSave = (updated: Task) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    setShowUpdate(false);
  };

  const handleCreateTask = () => {
    // For now, just show an alert. In a real app, this would open a create task modal
    alert('Create Task functionality would be implemented here');
  };

  const handleUpdateTask = (taskId: string) => {
    setActiveTaskId(taskId);
    setShowUpdate(true);
  };

  return (
    <div className="space-y-6">
      <TaskList 
        onOpenTask={(id) => setActiveTaskId(id)} 
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
      />
      
      {activeTask && (
        <TaskDetail 
          task={activeTask} 
          onClose={() => setActiveTaskId(null)} 
          onUpdate={handleUpdateTask}
        />
      )}
      
      {activeTask && showUpdate && (
        <TaskUpdate 
          task={activeTask} 
          onSave={handleSave} 
          onCancel={() => setShowUpdate(false)} 
        />
      )}
    </div>
  );
};

export default TasksApp;


