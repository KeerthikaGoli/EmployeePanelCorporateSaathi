import React from 'react';

const mockAnnouncements = [
    {
        id: 1,
        author: 'Admin',
        title: 'New Hybrid Work Policy Effective Jan 1st',
        summary: 'All employees are advised to review the updated hybrid work model details in the document repository.',
        date: 'Oct 2, 2024',
        tag: 'Policy Update',
    },
    {
        id: 2,
        author: 'HOD - Marketing',
        title: 'Mandatory Quarterly Training Session',
        summary: 'A company-wide training on data security compliance is scheduled for all employees on 2024-10-25.',
        date: 'Sep 28, 2024',
        tag: 'Training',
    },
    {
        id: 3,
        author: 'Admin',
        title: 'Office Holiday Party Date Confirmed!',
        summary: 'Get ready for the annual celebration! Details on venue and RSVP coming soon.',
        date: 'Sep 15, 2024',
        tag: 'Social',
    },
];

const CompanyBoard: React.FC = () => {

    const getTagClasses = (tag: string) => {
        if (tag === 'Policy Update' || tag === 'Training') {
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
        } else if (tag === 'Social') {
            return 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300';
        }
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white"> Announcement Board</h2>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700">
                {mockAnnouncements.map((announcement) => (
                    <div 
                        key={announcement.id} 
                        className="p-4 sm:p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            {/* Title and Tag */}
                            <p className="text-xl font-extrabold text-gray-900 dark:text-white">{announcement.title}</p>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getTagClasses(announcement.tag)} flex-shrink-0 ml-4`}>
                                {announcement.tag}
                            </span>
                        </div>
                        
                        {/* Summary */}
                        <p className="text-base text-gray-700 dark:text-gray-300 mb-3">{announcement.summary}</p>
                        
                        {/* Footer: Author and Date */}
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <p className="font-medium">Posted by: <span className="text-gray-900 dark:text-white">{announcement.author}</span></p>
                            <p>{announcement.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button className="w-full mt-6 py-3 border border-transparent rounded-lg text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors">
                Load Announcements
            </button>
        </div>
    );
};

export default CompanyBoard;