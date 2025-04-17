
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageContainer from '@/components/PageContainer';
import AnnouncementCard from '@/components/AnnouncementCard';
import { useApp } from '@/context/AppContext';
import { PlusCircle, CalendarDays, Bell } from 'lucide-react';
import { isAfter } from 'date-fns';

const Announcements: React.FC = () => {
  const { currentUser, announcements, departments } = useApp();
  const [selectedDepartment, setSelectedDepartment] = useState<string | 'all'>('all');
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const isStaff = currentUser.role === 'staff' || currentUser.role === 'admin';
  
  // Filter announcements
  const currentDate = new Date();
  const activeAnnouncements = announcements.filter(
    ann => !ann.expiresAt || !isAfter(currentDate, new Date(ann.expiresAt))
  );
  
  const expiredAnnouncements = announcements.filter(
    ann => ann.expiresAt && isAfter(currentDate, new Date(ann.expiresAt))
  );
  
  const filteredActive = selectedDepartment === 'all' 
    ? activeAnnouncements 
    : activeAnnouncements.filter(ann => ann.department === selectedDepartment);
  
  const filteredExpired = selectedDepartment === 'all' 
    ? expiredAnnouncements 
    : expiredAnnouncements.filter(ann => ann.department === selectedDepartment);
  
  // Filter departments for display
  const departmentsToDisplay = departments
    .sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Updates & Announcements</h1>
        
        {isStaff && (
          <Button size="sm" className="flex items-center gap-1">
            <PlusCircle size={16} />
            <span>New</span>
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Filter by Department</CardTitle>
            </CardHeader>
            <CardContent className="py-0 px-2">
              <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-2">
                <Button
                  variant={selectedDepartment === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedDepartment('all')}
                >
                  All Departments
                </Button>
                
                {departmentsToDisplay.map((dept) => (
                  <Button
                    key={dept.id}
                    variant={selectedDepartment === dept.id ? 'default' : 'ghost'}
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedDepartment(dept.id)}
                  >
                    {dept.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="active">
            <TabsList className="w-full">
              <TabsTrigger value="active" className="flex-1">
                <Bell size={16} className="mr-1" /> Active
              </TabsTrigger>
              <TabsTrigger value="expired" className="flex-1">
                <CalendarDays size={16} className="mr-1" /> Past
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-2">
              {filteredActive.length > 0 ? (
                filteredActive.map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <Bell size={48} strokeWidth={1} className="mx-auto mb-4" />
                    <p>No active announcements</p>
                    {selectedDepartment !== 'all' && (
                      <p className="text-sm mt-2">Try selecting a different department</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="expired" className="mt-2">
              {filteredExpired.length > 0 ? (
                filteredExpired.map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <CalendarDays size={48} strokeWidth={1} className="mx-auto mb-4" />
                    <p>No past announcements</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default Announcements;
