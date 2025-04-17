
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Menu, X, User, MessageCircle, Bell, MapPin, LogOut, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { currentUser, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-fjv-purple">BridgeGap</span>
          </Link>

          {currentUser ? (
            <>
              {/* Mobile Menu Button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              )}

              {/* Desktop Navigation */}
              {!isMobile && (
                <nav className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/" className="flex items-center space-x-1">
                      <Home size={18} />
                      <span>Home</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/messages" className="flex items-center space-x-1">
                      <MessageCircle size={18} />
                      <span>Messages</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/announcements" className="flex items-center space-x-1">
                      <Bell size={18} />
                      <span>Updates</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/locations" className="flex items-center space-x-1">
                      <MapPin size={18} />
                      <span>Map</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1" onClick={logout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/profile" className="flex items-center space-x-1">
                      <User size={18} />
                      <span>{currentUser.nickname}</span>
                    </Link>
                  </Button>
                </nav>
              )}
            </>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && currentUser && (
          <nav className="mt-4 flex flex-col space-y-2">
            <Button variant="ghost" asChild className="justify-start">
              <Link to="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                <Home size={20} />
                <span>Home</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link to="/messages" className="flex items-center space-x-2" onClick={toggleMenu}>
                <MessageCircle size={20} />
                <span>Messages</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link to="/announcements" className="flex items-center space-x-2" onClick={toggleMenu}>
                <Bell size={20} />
                <span>Updates</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link to="/locations" className="flex items-center space-x-2" onClick={toggleMenu}>
                <MapPin size={20} />
                <span>Map</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link to="/profile" className="flex items-center space-x-2" onClick={toggleMenu}>
                <User size={20} />
                <span>Profile</span>
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" onClick={() => { logout(); toggleMenu(); }}>
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
