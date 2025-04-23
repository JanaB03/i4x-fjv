import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { BookOpen, MessageSquare, MapPin, LogOut } from 'lucide-react';

const Index: React.FC = () => {
  const { currentUser, logout } = useApp();
  
  // User is logged in
  return (
    <div className="min-h-screen bg-blue-900">
      <div className="flex flex-col h-screen max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center bg-blue-900 text-white p-2">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-500">CommuniCare</h1>
            <div className="ml-2 text-yellow-400">⚛️</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white" asChild>
              <Link to="/">
                <BookOpen className="mr-1" size={20} />
                Resources
              </Link>
            </Button>
            
            <Button variant="ghost" className="text-white" asChild>
              <Link to="/locations">
                <MapPin className="mr-1" size={20} />
                Map
              </Link>
            </Button>
            
            <Button variant="ghost" className="text-white" asChild>
              <Link to="/messages">
                <MessageSquare className="mr-1" size={20} />
                Chat
              </Link>
            </Button>
            
            {currentUser && (
              <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={logout}>
                Logout
                <Avatar className="h-6 w-6 ml-2">
                  <AvatarFallback>{currentUser.nickname?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            )}
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to CommuniCare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Your community health communication platform</p>
                <Button asChild className="w-full">
                  <Link to="/messages">
                    <MessageSquare className="mr-2" size={16} />
                    Go to Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No new updates at this time.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;