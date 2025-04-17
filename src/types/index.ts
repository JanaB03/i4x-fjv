
export type UserRole = 'client' | 'staff' | 'admin';

export interface User {
  id: string;
  nickname: string;
  role: UserRole;
  accessCode: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderNickname: string;
  receiverId?: string;
  department?: string;
  isPublic: boolean;
  createdAt: Date;
  isDeleted: boolean;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  type: 'service' | 'check-in' | 'outreach';
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  department: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  expiresAt?: Date;
}
