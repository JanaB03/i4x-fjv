
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Home, MessageCircle, Bell, MapPin, User } from 'lucide-react';

const MainNav: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useApp();
  
  if (!currentUser) return null;
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-4 flex justify-around items-center z-10 md:hidden">
      <Button variant={isActive('/') ? "default" : "ghost"} size="icon" asChild className="flex flex-col items-center justify-center h-16 w-16">
        <Link to="/">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
      </Button>
      
      <Button variant={isActive('/messages') ? "default" : "ghost"} size="icon" asChild className="flex flex-col items-center justify-center h-16 w-16">
        <Link to="/messages">
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Messages</span>
        </Link>
      </Button>
      
      <Button variant={isActive('/announcements') ? "default" : "ghost"} size="icon" asChild className="flex flex-col items-center justify-center h-16 w-16">
        <Link to="/announcements">
          <Bell size={24} />
          <span className="text-xs mt-1">Updates</span>
        </Link>
      </Button>
      
      <Button variant={isActive('/locations') ? "default" : "ghost"} size="icon" asChild className="flex flex-col items-center justify-center h-16 w-16">
        <Link to="/locations">
          <MapPin size={24} />
          <span className="text-xs mt-1">Map</span>
        </Link>
      </Button>
      
      <Button variant={isActive('/profile') ? "default" : "ghost"} size="icon" asChild className="flex flex-col items-center justify-center h-16 w-16">
        <Link to="/profile">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </Button>
    </div>
  );
};

export default MainNav;
