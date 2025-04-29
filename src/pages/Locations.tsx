import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { useLocation } from '@/context/LocationContext';
import LocationSharingComponent from '@/components/LocationSharingComponent';
import SharedLocationMap from '@/components/SharedLocationMap';
import { 
  MapPin, 
  Navigation, 
  MapPinOff, 
  Home,
  MessageCircle,
  CheckCircle,
  Share2,
  Clock,
  Settings,
  ChevronRight,
  Locate,
  LocateFixed,
  Building,
  Filter
} from 'lucide-react';

const Locations: React.FC = () => {
  const { toast } = useToast();
  const { currentUser, locations } = useApp();
  const locationContext = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('services');
  const [showLocationSharing, setShowLocationSharing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;
  
  const handleShareLocation = () => {
    navigate('/share-location');
  };
  
  const handleLocationClick = (location: any) => {
    setSelectedLocation(location);
  };
  
  const isStaff = currentUser.role === 'staff' || currentUser.role === 'admin';

  // Get locations from the context
  const serviceLocations = locations.filter(loc => loc.type === 'service');
  const outreachLocations = locations.filter(loc => loc.type === 'outreach');
  const checkInLocations = locations.filter(loc => loc.type === 'check-in');
  
  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Service Locations</h1>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button size="sm" onClick={handleShareLocation}>
              <Share2 className="h-4 w-4 mr-2" />
              Share My Location
            </Button>
          </div>
        </div>
        
        <p className="text-muted-foreground mt-1">
          Find and track services near you
        </p>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar with location types */}
        <div className="lg:col-span-1 space-y-4">
          {/* Services Finder */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Find Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  <TabsTrigger value="open">Open Now</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-3">
                  {serviceLocations.map(location => (
                    <Button
                      key={location.id}
                      variant="outline"
                      className="w-full justify-start font-normal h-auto p-3"
                      onClick={() => handleLocationClick(location)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{location.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {location.description || "Service center"}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </TabsContent>
                
                <TabsContent value="nearby" className="min-h-[200px] flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPinOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Location Required</h3>
                    <p className="text-muted-foreground mb-4">
                      Share your location to see nearby services
                    </p>
                    <Button onClick={handleShareLocation}>Share Location</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="open" className="space-y-3">
                  {serviceLocations.slice(0, 2).map(location => (
                    <Button
                      key={location.id}
                      variant="outline"
                      className="w-full justify-start font-normal h-auto p-3"
                      onClick={() => handleLocationClick(location)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{location.name}</div>
                          <div className="flex items-center text-xs">
                            <Badge variant="outline" className="bg-green-50 text-green-700 font-normal">
                              Open Now
                            </Badge>
                            <span className="text-muted-foreground ml-2">
                              Until 5:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Mobile Services Tracker */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                Mobile Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {outreachLocations.map(location => (
                <Button
                  key={location.id}
                  variant="outline"
                  className="w-full justify-start font-normal h-auto p-3"
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Navigation className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
              
              <Button variant="outline" className="w-full mt-2">
                View All Mobile Services
              </Button>
            </CardContent>
          </Card>
          
          {/* Community Check-ins */}
          {isStaff && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Recent Check-ins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {checkInLocations.map(location => (
                  <Button
                    key={location.id}
                    variant="outline"
                    className="w-full justify-start font-normal h-auto p-3"
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <UserCircle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{location.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>30 minutes ago</span>
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Right content - map view */}
        <div className="lg:col-span-2">
          {selectedLocation ? (
            <SharedLocationMap 
              location={{
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude,
                description: selectedLocation.description
              }}
              timestamp={new Date()}
              address={selectedLocation.name}
              onClose={() => setSelectedLocation(null)}
            />
          ) : (
            <Card className="h-[400px] flex flex-col items-center justify-center">
              <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Select a Location</h3>
              <p className="text-muted-foreground max-w-md text-center mb-6">
                Choose a location from the list to view details and get directions
              </p>
              <Button onClick={handleShareLocation}>
                <Share2 className="h-4 w-4 mr-2" />
                Share My Location
              </Button>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

// Extra component for UserCircle icon
const UserCircle = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);

export default Locations;