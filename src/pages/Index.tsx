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
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">BridgeGap</h1>
          <p className="text-xl mb-8 text-blue-800">Connect with Father Joe's Villages services</p>
          
          <Card className="w-full mb-6">
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
              <CardDescription>
                BridgeGap helps you connect with support services.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MessageCircle className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Message staff securely</span>
                </li>
                <li className="flex items-start">
                  <Bell className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Get updates about available services</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-orange-500" />
                  <span>Find resources near you</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button asChild size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-white">
                <Link to="/login">Log In</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Need help? Visit any Father Joe's Villages location.
              </p>
            </CardFooter>
          </Card>
          
          <div className="w-full">
            <AccessibilityControls />
          </div>
        </div>
      </PageContainer>
    );
  }
  
  // User is logged in - use the existing layout
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1 text-orange-500">
          Welcome, {currentUser.nickname}
        </h1>
        <p className="text-blue-800">
          Stay connected with Father Joe's Villages services
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-blue-200 shadow-md">
          <CardHeader className="pb-2 bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <Bell className="mr-2 h-5 w-5 text-orange-500" />
              Latest Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestAnnouncement ? (
              <div>
                <h3 className="font-semibold text-orange-500">{latestAnnouncement.title}</h3>
                <p className="text-sm text-blue-800 mb-2">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {format(new Date(latestAnnouncement.createdAt), 'MMM d, h:mm a')}
                </p>
                <p className="line-clamp-3 text-gray-700">{latestAnnouncement.content}</p>
              </div>
            ) : (
              <p>No recent updates</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
              <Link to="/announcements" className="flex items-center justify-between">
                <span>View All Updates</span>
                <ChevronRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-blue-200 shadow-md">
          <CardHeader className="pb-2 bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <MessageCircle className="mr-2 h-5 w-5 text-orange-500" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestPublicMessage ? (
              <div>
                <h3 className="font-semibold text-orange-500">{latestPublicMessage.senderNickname}</h3>
                <p className="text-sm text-blue-800 mb-2">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {format(new Date(latestPublicMessage.createdAt), 'MMM d, h:mm a')}
                </p>
                <p className="line-clamp-3 text-gray-700">{latestPublicMessage.content}</p>
              </div>
            ) : (
              <p>No recent messages</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
              <Link to="/messages" className="flex items-center justify-between">
                <span>View Messages</span>
                <ChevronRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-4">
        <Card className="border-blue-200 shadow-md">
          <CardHeader className="pb-2 bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <MapPin className="mr-2 h-5 w-5 text-orange-500" />
              Services Near You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="mb-4 text-gray-700">View help centers and track the mobile clinic's location to find nearby services.</p>
                <div className="bg-blue-100 p-3 rounded-md mb-4 flex items-center">
                  <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
                    <span className="font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Mobile Clinic Update</h4>
                    <p className="text-sm text-gray-700">Mobile clinic is currently at Balboa Park. Estimated arrival at your location: 35 minutes.</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 bg-gray-200 rounded-md min-h-[120px] flex items-center justify-center">
                <Link to="/locations" className="text-blue-800 hover:underline flex flex-col items-center">
                  <MapPin className="h-8 w-8 text-orange-500 mb-2" />
                  <span>View Full Map</span>
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
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