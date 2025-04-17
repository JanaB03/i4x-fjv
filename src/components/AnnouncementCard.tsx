
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Bell } from 'lucide-react';
import { Announcement } from '@/types';
import { format, isAfter } from 'date-fns';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const isExpired = announcement.expiresAt && isAfter(new Date(), new Date(announcement.expiresAt));
  
  const departmentColors: Record<string, string> = {
    housing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    food: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    employment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    general: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  };
  
  const departmentColor = departmentColors[announcement.department] || departmentColors.general;
  
  return (
    <Card className={`w-full mb-4 ${isExpired ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={`mb-2 ${departmentColor}`}>
            {announcement.department}
          </Badge>
          
          {isExpired && (
            <Badge variant="outline" className="text-muted-foreground">
              Expired
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{announcement.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Calendar size={14} className="inline" />
          {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
          {announcement.expiresAt && (
            <span> - expires {format(new Date(announcement.expiresAt), 'MMM d')}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{announcement.content}</p>
      </CardContent>
      {(announcement.latitude && announcement.longitude) && (
        <CardFooter className="pt-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={14} className="mr-1" />
            <span>Location available</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default AnnouncementCard;
