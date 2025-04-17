
import { User, Message, Location, Department, Announcement, UserRole } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'client1',
    nickname: 'Alex',
    role: 'client',
    accessCode: '1234',
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'client2',
    nickname: 'Jamie',
    role: 'client',
    accessCode: '5678',
    createdAt: new Date('2023-02-10')
  },
  {
    id: 'staff1',
    nickname: 'Counselor Sam',
    role: 'staff',
    accessCode: 'staff1',
    createdAt: new Date('2022-10-01')
  },
  {
    id: 'staff2',
    nickname: 'Nurse Morgan',
    role: 'staff',
    accessCode: 'staff2',
    createdAt: new Date('2022-11-15')
  },
  {
    id: 'admin1',
    nickname: 'Admin Taylor',
    role: 'admin',
    accessCode: 'admin1',
    createdAt: new Date('2022-09-01')
  }
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: 'housing',
    name: 'Housing Services',
    description: 'Assistance with finding permanent or temporary housing.'
  },
  {
    id: 'health',
    name: 'Health Services',
    description: 'Medical check-ups, prescriptions, and mental health resources.'
  },
  {
    id: 'food',
    name: 'Food Services',
    description: 'Information about meals, food pantries, and nutrition programs.'
  },
  {
    id: 'employment',
    name: 'Employment Services',
    description: 'Job search assistance, resume help, and training opportunities.'
  },
  {
    id: 'general',
    name: 'General Assistance',
    description: 'General questions and services that don\'t fit into other categories.'
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg1',
    content: 'Hello, I need information about tonight\'s shelter options.',
    senderId: 'client1',
    senderNickname: 'Alex',
    receiverId: 'staff1',
    department: 'housing',
    isPublic: false,
    createdAt: new Date('2023-04-10T14:30:00'),
    isDeleted: false
  },
  {
    id: 'msg2',
    content: 'We have 5 beds available at the Main Street shelter. You can check in starting at 6pm.',
    senderId: 'staff1',
    senderNickname: 'Counselor Sam',
    receiverId: 'client1',
    department: 'housing',
    isPublic: false,
    createdAt: new Date('2023-04-10T14:45:00'),
    isDeleted: false
  },
  {
    id: 'msg3',
    content: 'Thank you. Can I reserve one?',
    senderId: 'client1',
    senderNickname: 'Alex',
    receiverId: 'staff1',
    department: 'housing',
    isPublic: false,
    createdAt: new Date('2023-04-10T14:50:00'),
    isDeleted: false
  },
  {
    id: 'msg4',
    content: 'Yes, I\'ve put your name on the list. Just give your nickname at check-in.',
    senderId: 'staff1',
    senderNickname: 'Counselor Sam',
    receiverId: 'client1',
    department: 'housing',
    isPublic: false,
    createdAt: new Date('2023-04-10T14:55:00'),
    isDeleted: false
  },
  {
    id: 'msg5',
    content: 'Mobile health clinic will be at Balboa Park from 10am-2pm tomorrow. Services include: basic check-ups, flu shots, and wound care.',
    senderId: 'staff2',
    senderNickname: 'Nurse Morgan',
    department: 'health',
    isPublic: true,
    createdAt: new Date('2023-04-10T09:00:00'),
    isDeleted: false
  },
  {
    id: 'msg6',
    content: 'Can I get help with my prescription at the mobile clinic?',
    senderId: 'client2',
    senderNickname: 'Jamie',
    receiverId: 'staff2',
    department: 'health',
    isPublic: false,
    createdAt: new Date('2023-04-10T10:15:00'),
    isDeleted: false
  },
  {
    id: 'msg7',
    content: `Yes, bring your current prescription bottle or information if you have it. We'll do our best to help.`,
    senderId: 'staff2',
    senderNickname: 'Nurse Morgan',
    receiverId: 'client2',
    department: 'health',
    isPublic: false,
    createdAt: new Date('2023-04-10T10:30:00'),
    isDeleted: false
  }
];

// Mock Locations
export const mockLocations: Location[] = [
  {
    id: 'loc1',
    name: 'Father Joe\'s Villages Main Campus',
    description: 'Main service center with multiple resources',
    latitude: 32.7157,
    longitude: -117.1611,
    type: 'service'
  },
  {
    id: 'loc2',
    name: 'Mobile Health Clinic',
    description: 'Current location of mobile healthcare services',
    latitude: 32.7340,
    longitude: -117.1444, // Balboa Park
    type: 'outreach'
  },
  {
    id: 'loc3',
    name: 'Food Distribution Center',
    description: 'Daily meals and food pantry',
    latitude: 32.7125,
    longitude: -117.1569,
    type: 'service'
  },
  {
    id: 'loc4',
    name: 'Alex\'s check-in',
    latitude: 32.7175,
    longitude: -117.1522,
    type: 'check-in'
  },
  {
    id: 'loc5',
    name: 'Jamie\'s check-in',
    latitude: 32.7198,
    longitude: -117.1601,
    type: 'check-in'
  }
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann1',
    title: 'Emergency Shelter Open Tonight',
    content: 'Due to expected low temperatures, we\'ve opened an emergency shelter at the community center on 10th & Broadway. 25 beds available starting at 7pm.',
    department: 'housing',
    latitude: 32.7165,
    longitude: -117.1554,
    createdAt: new Date('2023-04-09T16:00:00'),
    expiresAt: new Date('2023-04-10T12:00:00')
  },
  {
    id: 'ann2',
    title: 'Free Dental Services This Week',
    content: 'Volunteer dentists will provide free exams, cleanings, and basic procedures this Thursday from 9am-4pm at the Main Campus.',
    department: 'health',
    latitude: 32.7157,
    longitude: -117.1611,
    createdAt: new Date('2023-04-06T10:00:00'),
    expiresAt: new Date('2023-04-13T20:00:00')
  },
  {
    id: 'ann3',
    title: 'Job Fair Next Tuesday',
    content: 'Multiple employers will be at the community center hiring for entry-level positions. Bring ID if possible, but not required.',
    department: 'employment',
    latitude: 32.7165,
    longitude: -117.1554,
    createdAt: new Date('2023-04-08T14:30:00'),
    expiresAt: new Date('2023-04-18T18:00:00')
  },
  {
    id: 'ann4',
    title: 'Extra Food Distribution Today',
    content: 'We received a large donation of fresh produce and prepared meals. Available at the Food Distribution Center until 6pm today.',
    department: 'food',
    latitude: 32.7125,
    longitude: -117.1569,
    createdAt: new Date('2023-04-10T10:30:00'),
    expiresAt: new Date('2023-04-10T18:00:00')
  }
];
