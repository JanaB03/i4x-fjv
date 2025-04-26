import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Book, MessageCircle, MapPin, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useApp();

  return (
    <div className="flex items-center justify-between bg-indigo-800 p-4">
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-orange-500 font-bold text-2xl">BridgeGap</span>
          <div className="ml-2 bg-orange-500 h-8 w-8 rounded-full flex items-center justify-center">
            <div className="text-white font-bold">FJV</div>
          </div>
        </Link>
      </div>

      {currentUser ? (
        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="sm" asChild className="text-white">
            <Link to="/resources" className="flex items-center space-x-1">
              <Book className="h-5 w-5" />
              <span className="hidden md:inline">Resources</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-white">
            <Link to="/locations" className="flex items-center space-x-1">
              <MapPin className="h-5 w-5" />
              <span className="hidden md:inline">Map</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-white">
            <Link to="/messages" className="flex items-center space-x-1">
              <MessageCircle className="h-5 w-5" />
              <span className="hidden md:inline">Chat</span>
            </Link>
          </Button>
          <Button 
            className="bg-yellow-500 text-white px-4 py-2 rounded-full"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-1" />
            <span>Logout</span>
          </Button>
        </div>
      ) : (
        <div className="space-x-2">
          <Button variant="outline" size="sm" asChild className="text-white border-white hover:bg-indigo-700">
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild className="bg-yellow-500 hover:bg-yellow-600">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;