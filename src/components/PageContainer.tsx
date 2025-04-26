// src/components/PageContainer.tsx
import React from 'react';
import Header from './Header';
import MainNav from './MainNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageContainerProps {
  children: React.ReactNode;
  withPadding?: boolean;
  fullWidth?: boolean; // Add this
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children,
  withPadding = true,
  fullWidth = false // Add this
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`min-h-screen flex flex-col ${fullWidth ? 'bg-blue-900' : ''}`}>
      {!fullWidth && <Header />}
      <main className={`flex-1 ${withPadding && !fullWidth ? 'container mx-auto px-4 py-4 md:py-6' : ''} ${isMobile && !fullWidth ? 'pb-20' : ''}`}>
        {children}
      </main>
      {!fullWidth && <MainNav />}
    </div>
  );
};

export default PageContainer;