import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { 
  MapPin, 
  Navigation, 
  MapPinOff, 
  ExternalLink,
  Map,
  CheckCircle
} from 'lucide-react';

import LocationSharingComponent from '@/components/LocationSharingComponent';

const LocationSharingPage: React.FC = () => {
  const { toast } = useToast();
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('share');
  const [recentlySharedLocation, setRecentlySharedLocation] = useState<{
    lat: number;
    lng: number;
    description?: string;
    timestamp: Date;
  } | null>(null);

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleLocationShared = (location: { lat: number; lng: number; description?: string }) => {
    // In a real app, this would make an API call to save the location
    // For now, we'll just update the UI
    setRecentlySharedLocation({
      ...location,
      timestamp: new Date()
    });
    
    // Optionally switch to the "Recent" tab
    setActiveTab('recent');
  };

  const openInMaps = (lat: number, lng: number) => {
    // Opens the location in Google Maps in a new tab
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Location Sharing</h1>
        <p className="text-muted-foreground">
          Share your location with your support team to help them provide better assistance
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="share" className="flex items-center gap-1">
              <MapPin size={16} />
              <span>Share Location</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <CheckCircle size={16} />
              <span>Recent Shares</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-1">
              <Map size={16} />
              <span>Location Help</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="share">
            <LocationSharingComponent onLocationShared={handleLocationShared} />
          </TabsContent>
          
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Recently Shared Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentlySharedLocation ? (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-green-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="font-medium">Location Successfully Shared</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {recentlySharedLocation.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">Coordinates:</span> 
                          {recentlySharedLocation.lat.toFixed(5)}, {recentlySharedLocation.lng.toFixed(5)}
                        </div>
                        
                        {recentlySharedLocation.description && (
                          <div className="text-sm">
                            <span className="font-medium">Description:</span> 
                            {recentlySharedLocation.description}
                          </div>
                        )}
                        
                        <div className="pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600"
                            onClick={() => openInMaps(recentlySharedLocation.lat, recentlySharedLocation.lng)}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View in Maps
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" onClick={() => setActiveTab('share')}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Share New Location
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPinOff size={64} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Recent Locations</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't shared any locations recently
                    </p>
                    <Button onClick={() => setActiveTab('share')}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Share Your Location
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  Location Sharing Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Why Share Your Location?</h3>
                  <p>
                    Sharing your location helps your support team provide better assistance. It can help them:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Find you when mobile services are in your area</li>
                    <li>Direct you to nearby resources</li>
                    <li>Send outreach workers to your location if you need assistance</li>
                    <li>Coordinate service delivery more efficiently</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Privacy & Security</h3>
                  <p>
                    Your privacy is important to us. Here's how we protect your information:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your location is only shared with your assigned case manager and support team</li>
                    <li>You control who can see your location and for how long</li>
                    <li>You can stop sharing your location at any time</li>
                    <li>Your location history is automatically deleted after 30 days</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Troubleshooting Location Access</h3>
                  <p>
                    If you're having trouble sharing your location:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Make sure location services are enabled on your device</li>
                    <li>Check that you've given this app permission to access your location</li>
                    <li>Try refreshing your browser or restarting the app</li>
                    <li>Try sharing in a different location - tall buildings and indoor spaces can sometimes affect GPS accuracy</li>
                  </ul>
                </div>
                
                <div className="pt-4 text-center">
                  <Button onClick={() => setActiveTab('share')}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Return to Location Sharing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default LocationSharingPage;