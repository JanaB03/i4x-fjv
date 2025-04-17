
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PageContainer from '@/components/PageContainer';
import AccessibilityControls from '@/components/AccessibilityControls';
import { useApp } from '@/context/AppContext';
import { UserCircle, LogOut, Settings, Shield, Bell, MapPin, Calendar, AlertTriangle, Download } from 'lucide-react';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const isStaff = currentUser.role === 'staff' || currentUser.role === 'admin';

  return (
    <PageContainer>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCircle className="mr-2 h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Nickname</h3>
                  <p className="text-lg">{currentUser.nickname}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                  <p className="text-lg capitalize">{currentUser.role}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Account Created</h3>
                <p>{format(new Date(currentUser.createdAt), 'MMMM d, yyyy')}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Access Code</h3>
                <p className="text-lg font-mono">{currentUser.accessCode}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <Shield className="inline h-3 w-3 mr-1" />
                  For your security, keep this code private
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2" asChild>
                <a href="#" className="flex items-center">
                  <Download size={16} className="mr-1" />
                  Export Data
                </a>
              </Button>
              <Button variant="destructive" onClick={logout}>
                <LogOut size={16} className="mr-1" />
                Logout
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="service-updates" className="flex-1">
                Service Updates
                <p className="text-sm font-normal text-muted-foreground">
                  Be notified about shelter, food, and health services
                </p>
              </Label>
              <Switch id="service-updates" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="direct-messages" className="flex-1">
                Direct Messages
                <p className="text-sm font-normal text-muted-foreground">
                  Be notified when you receive a message
                </p>
              </Label>
              <Switch id="direct-messages" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="emergency-alerts" className="flex-1">
                Emergency Alerts
                <p className="text-sm font-normal text-muted-foreground">
                  Weather warnings and safety information
                </p>
              </Label>
              <Switch id="emergency-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Location Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="zone-checkin" className="flex-1">
                Zone Check-in
                <p className="text-sm font-normal text-muted-foreground">
                  Allow approximate zone check-ins to find nearby services
                </p>
              </Label>
              <Switch id="zone-checkin" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="location-history" className="flex-1">
                Location History
                <p className="text-sm font-normal text-muted-foreground">
                  Store your check-in history (for 30 days)
                </p>
              </Label>
              <Switch id="location-history" />
            </div>
            
            <div className="mt-4 flex items-start space-x-2 p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">For safety, your exact GPS location is never stored or shared</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Accessibility Settings
            </CardTitle>
            <CardDescription>
              Customize your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccessibilityControls />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Profile;
