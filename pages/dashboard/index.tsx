import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import {
  CheckIcon,
  ClockIcon,
  CalendarIcon,
  TrendingUpIcon,
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
  BellIcon,
  MegaphoneIcon,
  XIcon,
  PlusIcon,
  SaveIcon
} from '../../icons/Icons';
import { ViewType, Theme } from '../../App';

type LayoutBridgeProps = {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
};

// Mock data for employee
const initialTasks = [
  {
    id: 1,
    title: 'Complete Q4 Financial Report',
    description: 'Prepare and submit quarterly financial analysis',
    deadline: '2025-10-05',
    priority: 'high',
    status: 'in-progress',
    project: 'Finance',
    assignedBy: 'Sarah Johnson',
    progress: 65
  },
  {
    id: 2,
    title: 'Review Marketing Campaign Proposal',
    description: 'Evaluate new social media campaign strategy',
    deadline: '2025-10-03',
    priority: 'high',
    status: 'pending',
    project: 'Marketing',
    assignedBy: 'Mike Chen',
    progress: 20
  },
  {
    id: 3,
    title: 'Employee Performance Reviews',
    description: 'Conduct mid-year performance evaluations for team',
    deadline: '2025-10-08',
    priority: 'medium',
    status: 'in-progress',
    project: 'HR',
    assignedBy: 'Emma Davis',
    progress: 45
  },
  {
    id: 4,
    title: 'Update System Documentation',
    description: 'Revise technical documentation for new features',
    deadline: '2025-10-10',
    priority: 'low',
    status: 'pending',
    project: 'IT',
    assignedBy: 'David Park',
    progress: 0
  },
  {
    id: 5,
    title: 'Client Meeting Preparation',
    description: 'Prepare presentation materials for stakeholder meeting',
    deadline: '2025-10-02',
    priority: 'high',
    status: 'in-progress',
    project: 'Sales',
    assignedBy: 'Lisa Anderson',
    progress: 80
  }
];

const initialReminders = [
  {
    id: 1,
    title: 'Team Stand-up Meeting',
    time: '09:00 AM',
    date: '2025-10-01',
    type: 'meeting',
    location: 'Conference Room A'
  },
  {
    id: 2,
    title: 'Project Deadline: Website Redesign',
    time: '05:00 PM',
    date: '2025-10-01',
    type: 'deadline',
    location: 'Online'
  },
  {
    id: 3,
    title: 'Benefits Enrollment Period Ends',
    time: '11:59 PM',
    date: '2025-10-05',
    type: 'alert',
    location: 'HR Portal'
  },
  {
    id: 4,
    title: 'One-on-One with Manager',
    time: '02:30 PM',
    date: '2025-10-02',
    type: 'meeting',
    location: 'Office 305'
  }
];

const EmployeeDashboard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [reminders, setReminders] = useState(initialReminders);
  const [taskFilter, setTaskFilter] = useState<'all' | 'in-progress' | 'pending'>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <UsersIcon className="w-5 h-5 text-blue-500" />;
      case 'deadline': return <MegaphoneIcon className="w-5 h-5 text-red-500" />;
      case 'alert': return <BellIcon className="w-5 h-5 text-yellow-500" />;
      default: return <CalendarIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date('2025-10-01');
    const deadline = new Date(dateString);
    const diffTime = Number(deadline) - Number(today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  const filteredTasks = taskFilter === 'all' ? tasks : tasks.filter(task => task.status === taskFilter);

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement & {
      title: { value: string };
      description: { value: string };
      project: { value: string };
      deadline: { value: string };
      priority: { value: string };
    };
    const task = {
      id: tasks.length + 1,
      title: form.title.value,
      description: form.description.value,
      deadline: form.deadline.value,
      priority: form.priority.value,
      status: 'pending',
      project: form.project.value,
      assignedBy: 'Self',
      progress: 0
    } as (typeof initialTasks)[number];
    setTasks(prev => [...prev, task]);
    (e.target as HTMLFormElement).reset();
  };

  const handleScheduleMeeting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement & {
      mtitle: { value: string };
      mdate: { value: string };
      mtime: { value: string };
      mlocation: { value: string };
    };
    const meeting = {
      id: reminders.length + 1,
      title: form.mtitle.value,
      time: form.mtime.value,
      date: form.mdate.value,
      type: 'meeting',
      location: form.mlocation.value
    } as (typeof initialReminders)[number];
    setReminders(prev => [...prev, meeting]);
    (e.target as HTMLFormElement).reset();
  };

  const updateTaskProgress = (taskId: number, newProgress: number) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, progress: newProgress, status: newProgress === 100 ? 'completed' : 'in-progress' } : task));
  };

  const getCalendarDates = () => {
    const dates: (number | null)[] = [];
    const today = new Date('2025-10-01');
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    for (let i = 0; i < startingDayOfWeek; i++) dates.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) dates.push(day);
    return dates;
  };

  const statsCards = [
    {
      title: 'Active Tasks',
      value: tasks.filter(t => t.status !== 'completed').length.toString(),
      change: '+3',
      trend: 'up',
      icon: <BriefcaseIcon className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Completed This Week',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: <CheckIcon className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Tasks',
      value: tasks.filter(t => t.status === 'pending').length.toString(),
      change: '-1',
      trend: 'down',
      icon: <ClockIcon className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'My Performance',
      value: '94%',
      change: '+5%',
      trend: 'up',
      icon: <TrendingUpIcon className="w-6 h-6" />,
      color: 'bg-purple-500'
    }
  ];

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Employee! 👋</h1>
        <p className="text-blue-100 dark:text-blue-200">Here's what's happening with your work today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Tasks</h2>
                <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">View All</button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setTaskFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${taskFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>All ({tasks.length})</button>
                <button onClick={() => setTaskFilter('in-progress')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${taskFilter === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>In Progress ({tasks.filter(t => t.status === 'in-progress').length})</button>
                <button onClick={() => setTaskFilter('pending')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${taskFilter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>Pending ({tasks.filter(t => t.status === 'pending').length})</button>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTasks.map(task => (
                <div key={task.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>{task.priority.toUpperCase()}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" />{getDaysUntil(task.deadline)}</span>
                        <span className="flex items-center gap-1"><UsersIcon className="w-4 h-4" />{task.assignedBy}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>{task.status.replace('-', ' ').toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1"><span className="text-xs font-medium text-gray-600 dark:text-gray-400">Progress</span><span className="text-xs font-semibold text-gray-900 dark:text-white">{task.progress}%</span></div>
                    <input type="range" min="0" max="100" value={task.progress} onChange={(e) => updateTaskProgress(task.id, parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button onClick={() => setShowMeetingModal(true)} className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-sm flex items-center justify-center gap-2 shadow focus:ring-2 focus:ring-blue-400"><CalendarIcon className="w-4 h-4" />Schedule Meeting</button>
              <button onClick={() => setShowCalendarModal(true)} className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition text-sm flex items-center justify-center gap-2 shadow focus:ring-2 focus:ring-purple-400"><ClockIcon className="w-4 h-4" />View Calendar</button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700"><h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Reminders</h2></div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {reminders.map(reminder => (
                <div key={reminder.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getReminderIcon(reminder.type)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{reminder.title}</h3>
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div className="flex items-center gap-1"><ClockIcon className="w-3 h-3" />{reminder.time}</div>
                        <div className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" />{new Date(reminder.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Task removed as per requirement */}

      {showMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Schedule Meeting</h3>
              <button onClick={() => setShowMeetingModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleScheduleMeeting} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Meeting Title</label>
                <input name="mtitle" type="text" required className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter meeting title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <input name="mdate" type="date" required className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                  <input name="mtime" type="time" required className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input name="mlocation" type="text" required className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter meeting location" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowMeetingModal(false)} className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">Cancel</button>
                <button type="submit" className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCalendarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-10"><h3 className="text-xl font-bold text-gray-900 dark:text-white">Calendar - October 2025</h3><button onClick={() => setShowCalendarModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><XIcon className="w-6 h-6" /></button></div>
            <div className="p-6">
              <div className="mb-6">
                <div className="grid grid-cols-7 gap-2 mb-2">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (<div key={day} className="text-center font-semibold text-sm text-gray-600 dark:text-gray-400 py-2">{day}</div>))}</div>
                <div className="grid grid-cols-7 gap-2">
                  {getCalendarDates().map((date, index) => {
                    const dateString = date ? `2025-10-${String(date).padStart(2,'0')}` : null;
                    const hasTask = Boolean(date && tasks.some(t => t.deadline === dateString));
                    const hasReminder = Boolean(date && reminders.some(r => r.date === dateString));
                    const isToday = date === 1;
                    return (
                      <div key={index} className={`aspect-square p-2 rounded-lg border ${date ? 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer' : 'border-transparent'} ${isToday ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500' : ''}`}>
                        {date && (
                          <div className="h-full flex flex-col">
                            <span className={`text-sm font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>{date}</span>
                            <div className="mt-1 flex gap-1">{hasTask && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}{hasReminder && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-sm text-gray-600 dark:text-gray-400">Task Deadline</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-sm text-gray-600 dark:text-gray-400">Meeting/Reminder</span></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Upcoming Events</h4>
                <div className="space-y-2">
                  {[...tasks.filter(t => new Date(t.deadline) >= new Date('2025-10-01')).map(t => ({ ...t, type: 'task' as const, date: t.deadline })), ...reminders.filter(r => new Date(r.date) >= new Date('2025-10-01')).map(r => ({ ...r, type: 'reminder' as const }))].sort((a,b) => Number(new Date(a.date as string)) - Number(new Date(b.date as string))).slice(0,5).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      {item.type === 'task' ? (<MegaphoneIcon className="w-5 h-5 text-red-500" />) : getReminderIcon((item as any).type)}
                      <div className="flex-1"><p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p><p className="text-xs text-gray-600 dark:text-gray-400">{new Date((item as any).date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}{(item as any).time && ` at ${(item as any).time}`}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper that plugs into existing MainLayout props if you want to render this page directly.
export const DashboardPage: React.FC<LayoutBridgeProps> = (props) => (
  <MainLayout {...props}>
    <EmployeeDashboard />
  </MainLayout>
);

export default EmployeeDashboard;


