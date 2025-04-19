// src/components/PageContainer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import MainNav from './MainNav';

interface PageContainerProps {
  children: React.ReactNode;
  withPadding?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  withPadding = true 
}) => {
  const isMobile = useIsMobile();
  const { currentUser } = useApp();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-100">
      {/* Header Navigation Bar */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center">
          <Link to="/" className="text-orange-500 text-4xl font-bold">BridgeGap</Link>
          <div className="ml-2 bg-white p-2 rounded">
            <img 
              src="/logo.png" 
              alt="BridgeGap Logo"
              className="h-10 w-10"
              onError={(e) => {
                // Fallback if the logo doesn't load
                e.currentTarget.src = "/favicon.ico";
              }}
            />
          </div>
        </div>
        
        {/* Navigation Links - Updated to match existing routes */}
        <div className="flex items-center space-x-12">
          <Link to="/announcements" className="text-blue-800 text-xl font-medium hover:text-blue-600">
            Updates
          </Link>
          <Link to="/locations" className="text-blue-800 text-xl font-medium hover:text-blue-600">
            Map
          </Link>
          <Link to="/messages" className="text-blue-800 text-xl font-medium hover:text-blue-600">
            Chat
          </Link>
          {!currentUser ? (
            <Link 
              to="/login" 
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-lg text-xl font-bold"
            >
              Login
            </Link>
          ) : (
            <Link 
              to="/profile" 
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-lg text-xl font-bold"
            >
              Profile
            </Link>
          )}
        </div>
      </header>

      <main className={`flex-1 ${withPadding ? 'container mx-auto px-4 py-4 md:py-6' : ''} ${isMobile ? 'pb-20' : ''}`}>
        {children}
      </main>
      
      {currentUser && <MainNav />}
    </div>
  );
};

export default PageContainer;