
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/PageContainer';
import { useApp } from '@/context/AppContext';
import { MessageCircle, Bell, MapPin, ChevronRight, AlertTriangle, Clock } from 'lucide-react';
import AccessibilityControls from '@/components/AccessibilityControls';
import { format } from 'date-fns';

const Index: React.FC = () => {
  const { currentUser, announcements, getPublicMessages } = useApp();
  
  // Get latest announcement
  const latestAnnouncement = announcements.length > 0 
    ? announcements.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] 
    : null;
  
  // Get latest public message
  const publicMessages = getPublicMessages();
  const latestPublicMessage = publicMessages.length > 0 ? publicMessages[0] : null;
  
  if (!currentUser) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h1 className="text-4xl font-bold text-fjv-purple mb-4">BridgeGap</h1>
          <p className="text-xl mb-8">Connect with Father Joe's Villages services</p>
          
          <Card className="w-full max-w-md mb-6">
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
              <CardDescription>
                BridgeGap helps you connect with support services.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MessageCircle className="mr-2 h-5 w-5 text-fjv-purple" />
                  <span>Message staff securely</span>
                </li>
                <li className="flex items-start">
                  <Bell className="mr-2 h-5 w-5 text-fjv-purple" />
                  <span>Get updates about available services</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-fjv-purple" />
                  <span>Find resources near you</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link to="/login">Log In</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Need help? Visit any Father Joe's Villages location.
              </p>
            </CardFooter>
          </Card>
          
          <div className="w-full max-w-md">
            <AccessibilityControls />
          </div>
        </div>
      </PageContainer>
    );
  }
  
  // User is logged in
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          Welcome, {currentUser.nickname}
        </h1>
        <p className="text-muted-foreground">
          Stay connected with Father Joe's Villages services
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-fjv-purple" />
              Latest Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestAnnouncement ? (
              <div>
                <h3 className="font-semibold">{latestAnnouncement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {format(new Date(latestAnnouncement.createdAt), 'MMM d, h:mm a')}
                </p>
                <p className="line-clamp-3">{latestAnnouncement.content}</p>
              </div>
            ) : (
              <p>No recent updates</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/announcements" className="flex items-center justify-between">
                <span>View All Updates</span>
                <ChevronRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-fjv-purple" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestPublicMessage ? (
              <div>
                <h3 className="font-semibold">{latestPublicMessage.senderNickname}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {format(new Date(latestPublicMessage.createdAt), 'MMM d, h:mm a')}
                </p>
                <p className="line-clamp-3">{latestPublicMessage.content}</p>
              </div>
            ) : (
              <p>No recent messages</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/messages" className="flex items-center justify-between">
                <span>View Messages</span>
                <ChevronRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-fjv-purple" />
              Services Near You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>View help centers and share your approximate location to find nearby services.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/locations" className="flex items-center justify-between">
                <span>Open Map</span>
                <ChevronRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Privacy Reminder</h3>
                <p className="text-sm">
                  For your safety, avoid sharing personal details. Messages are encrypted but not 100% secure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <AccessibilityControls />
      </div>
    </PageContainer>
  );
};

export default Index;
