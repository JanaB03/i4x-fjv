
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Message, Location, Department, Announcement, UserRole } from '@/types';
import { toast } from "sonner";

// Mock data for initial development
import { mockUsers, mockMessages, mockLocations, mockDepartments, mockAnnouncements } from '@/data/mockData';

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (accessCode: string) => Promise<boolean>;
  logout: () => void;
  
  // Users
  users: User[];
  getUser: (id: string) => User | undefined;
  
  // Messages
  messages: Message[];
  sendMessage: (content: string, receiverId?: string, department?: string, isPublic?: boolean) => Promise<Message>;
  deleteMessage: (id: string) => Promise<boolean>;
  getConversation: (userId: string, otherUserId?: string) => Message[];
  getPublicMessages: (departmentId?: string) => Message[];
  
  // Locations
  locations: Location[];
  addCheckIn: (nickname: string, latitude: number, longitude: number) => Promise<Location>;
  
  // Departments
  departments: Department[];
  
  // Announcements
  announcements: Announcement[];
  createAnnouncement: (title: string, content: string, department: string, latitude?: number, longitude?: number, expiresAt?: Date) => Promise<Announcement>;
  
  // State
  isLoading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Authentication functions
  const login = async (accessCode: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = users.find(u => u.accessCode === accessCode);
      
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success(`Welcome back, ${user.nickname}!`);
        return true;
      } else {
        setError('Invalid access code');
        toast.error('Invalid access code');
        return false;
      }
    } catch (err) {
      setError('Failed to log in');
      toast.error('Failed to log in');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.info('You have been logged out');
  };

  // User functions
  const getUser = (id: string) => {
    return users.find(user => user.id === id);
  };

  // Message functions
  const sendMessage = async (
    content: string, 
    receiverId?: string, 
    department?: string,
    isPublic: boolean = false
  ): Promise<Message> => {
    if (!currentUser) throw new Error('You must be logged in to send messages');
    
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        content,
        senderId: currentUser.id,
        senderNickname: currentUser.nickname,
        receiverId,
        department,
        isPublic,
        createdAt: new Date(),
        isDeleted: false
      };
      
      setMessages(prev => [newMessage, ...prev]);
      
      if (!isPublic) {
        toast.success('Message sent');
      } else {
        toast.success('Public message posted');
      }
      
      return newMessage;
    } catch (err) {
      setError('Failed to send message');
      toast.error('Failed to send message');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMessage = async (id: string): Promise<boolean> => {
    if (!currentUser) throw new Error('You must be logged in to delete messages');
    
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const message = messages.find(m => m.id === id);
      
      if (!message) {
        throw new Error('Message not found');
      }
      
      if (message.senderId !== currentUser.id && currentUser.role !== 'admin') {
        throw new Error('You can only delete your own messages');
      }
      
      setMessages(prev => prev.map(m => 
        m.id === id ? { ...m, isDeleted: true } : m
      ));
      
      toast.success('Message deleted');
      return true;
    } catch (err) {
      setError('Failed to delete message');
      toast.error('Failed to delete message');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getConversation = (userId: string, otherUserId?: string): Message[] => {
    return messages
      .filter(message => 
        !message.isDeleted && 
        !message.isPublic && 
        ((message.senderId === userId && message.receiverId === otherUserId) ||
        (message.senderId === otherUserId && message.receiverId === userId))
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  const getPublicMessages = (departmentId?: string): Message[] => {
    return messages
      .filter(message => 
        !message.isDeleted && 
        message.isPublic && 
        (!departmentId || message.department === departmentId)
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  // Location functions
  const addCheckIn = async (nickname: string, latitude: number, longitude: number): Promise<Location> => {
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newLocation: Location = {
        id: `loc_${Date.now()}`,
        name: `${nickname}'s check-in`,
        latitude,
        longitude,
        type: 'check-in'
      };
      
      setLocations(prev => [...prev, newLocation]);
      
      toast.success('Location shared');
      return newLocation;
    } catch (err) {
      setError('Failed to share location');
      toast.error('Failed to share location');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Announcement functions
  const createAnnouncement = async (
    title: string, 
    content: string, 
    department: string,
    latitude?: number,
    longitude?: number,
    expiresAt?: Date
  ): Promise<Announcement> => {
    if (!currentUser || currentUser.role === 'client') {
      throw new Error('Only staff members can create announcements');
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newAnnouncement: Announcement = {
        id: `ann_${Date.now()}`,
        title,
        content,
        department,
        latitude,
        longitude,
        createdAt: new Date(),
        expiresAt
      };
      
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      
      toast.success('Announcement posted');
      return newAnnouncement;
    } catch (err) {
      setError('Failed to create announcement');
      toast.error('Failed to create announcement');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    // Auth
    currentUser,
    login,
    logout,
    
    // Users
    users,
    getUser,
    
    // Messages
    messages,
    sendMessage,
    deleteMessage,
    getConversation,
    getPublicMessages,
    
    // Locations
    locations,
    addCheckIn,
    
    // Departments
    departments,
    
    // Announcements
    announcements,
    createAnnouncement,
    
    // State
    isLoading,
    error
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
