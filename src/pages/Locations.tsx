import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import PageContainer from '@/components/PageContainer';
import { useApp } from '@/context/AppContext';
import { 
  MapPin, 
  Navigation, 
  Users, 
  Building, 
  Compass, 
  CheckCircle, 
  Search,
  Filter,
  ChevronRight,
  ArrowRight,
  Locate,
  ChevronDown,
  Info,
  AlertCircle
} from 'lucide-react';

const MapPlaceholder = () => (
  <div className="flex items-center justify-center h-full min-h-[300px] bg-muted/30 rounded-md">
    <div className="text-center p-4">
      <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
      <p className="text-muted-foreground">Interactive map would display here</p>
      <p className="text-sm text-muted-foreground mt-2">Enable location services to view nearby resources</p>
    </div>
  </div>
);

interface LocationListProps {
  title: string;
  icon: React.ReactNode;
  locations: any[];
  badgeColor: string;
  emptyMessage: string;
  emptyIcon: React.ReactNode;
}

const LocationList: React.FC<LocationListProps> = ({ 
  title, 
  icon, 
  locations, 
  badgeColor, 
  emptyMessage,
  emptyIcon 
}) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
        <Badge variant="outline" className={badgeColor}>
          {locations.length}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      {locations.length > 0 ? (
        <ul className="space-y-3">
          {locations.map(location => (
            <li key={location.id} className="flex items-start">
              {icon}
              <div className="ml-2">
                <p className="font-medium">{location.name}</p>
                {location.description && (
                  <p className="text-sm text-muted-foreground">{location.description}</p>
                )}
                {location.latitude && location.longitude && (
                  <Button variant="ghost" size="sm" className="mt-1 h-7 px-2 text-xs">
                    <MapPin size={12} className="mr-1" />
                    View on map
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-8 text-center text-muted-foreground">
          {emptyIcon}
          <p className="mt-2">{emptyMessage}</p>
        </div>
      )}
    </CardContent>
  </Card>
);

const serviceTypes = [
  { id: 'shelter', name: 'Shelter', icon: <Building size={16} className="text-blue-600" /> },
  { id: 'food', name: 'Food', icon: <Users size={16} className="text-green-600" /> },
  { id: 'health', name: 'Health', icon: <CheckCircle size={16} className="text-red-600" /> },
  { id: 'outreach', name: 'Outreach', icon: <Compass size={16} className="text-purple-600" /> }
];

const Locations: React.FC = () => {
  const { currentUser, locations, addCheckIn } = useApp();
  const [locationPermission, setLocationPermission] = useState<string>('prompt');
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [selectedLocationType, setSelectedLocationType] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Request location permission
  const requestLocationPermission = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationPermission('granted');
          setMapError(null);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setMapError('Unable to access your location. Please check your browser settings.');
          setLocationPermission('denied');
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setMapError('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  };

  // Simulate check-in
  const handleCheckIn = async () => {
    if (!userLocation) {
      setMapError('Please enable location services to check in');
      return;
    }

    setIsLoading(true);
    try {
      await addCheckIn(
        currentUser.nickname,
        userLocation.latitude,
        userLocation.longitude
      );
      setIsLoading(false);
    } catch (error) {
      setMapError('Failed to check in. Please try again.');
      setIsLoading(false);
    }
  };

  // Filter locations
  const serviceLocations = locations.filter(loc => loc.type === 'service');
  const outreachLocations = locations.filter(loc => loc.type === 'outreach');
  const checkInLocations = locations.filter(loc => loc.type === 'check-in');

  // Filter by search query
  const filteredServiceLocations = serviceLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (loc.description && loc.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredOutreachLocations = outreachLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (loc.description && loc.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageContainer>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Services & Locations</h1>
        <p className="text-muted-foreground">Find help centers and services near you</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Map Area */}
        <div className="lg:col-span-2">
          <Card className="w-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle>Service Map</CardTitle>
              {locationPermission !== 'granted' && (
                <Button 
                  onClick={requestLocationPermission} 
                  disabled={isLoading} 
                  variant="outline"
                  size="sm"
                >
                  {isLoading ? (
                    <>Loading location...</>
                  ) : (
                    <>
                      <Locate size={16} className="mr-2" />
                      Enable location services
                    </>
                  )}
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0 relative aspect-video sm:min-h-[400px] overflow-hidden">
              {/* Map would be inserted here */}
              <MapPlaceholder />
              
              {userLocation && (
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border rounded-md p-2 shadow-md">
                  <div className="text-xs">
                    <p className="font-medium">Your approximate location</p>
                    <p className="text-muted-foreground">Showing services within 5 miles</p>
                  </div>
                </div>
              )}
              
              {mapError && (
                <div className="absolute top-4 left-4 right-4 bg-destructive/10 text-destructive p-2 rounded-md text-sm flex items-center">
                  <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                  {mapError}
                </div>
              )}
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                {userLocation ? (
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="flex items-center gap-1 shadow-md"
                    onClick={handleCheckIn}
                    disabled={isLoading}
                  >
                    <CheckCircle size={16} />
                    <span>Check In</span>
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="flex items-center gap-1 shadow-md"
                    onClick={requestLocationPermission}
                    disabled={isLoading}
                  >
                    <Navigation size={16} />
                    <span>Share Location</span>
                  </Button>
                )}
              </div>
            </CardContent>
            
            {userLocation && (
              <CardFooter className="py-3 flex justify-between items-center">
                <div className="text-sm flex items-center">
                  <Info size={14} className="text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">For privacy, only your approximate area is shared.</span>
                </div>
                
                <DrawerTrigger asChild>
                  <Button size="sm" variant="ghost">
                    Filter Map
                    <Filter size={14} className="ml-1" />
                  </Button>
                </DrawerTrigger>
              </CardFooter>
            )}
          </Card>
          
          {/* Search and filter bar */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for services..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="whitespace-nowrap">
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filter Services</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 pt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Service Types</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {serviceTypes.map(type => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <Switch id={`filter-${type.id}`} defaultChecked />
                            <Label htmlFor={`filter-${type.id}`} className="flex items-center">
                              {type.icon}
                              <span className="ml-1">{type.name}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Distance</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="h-8">1 mile</Button>
                        <Button variant="default" size="sm" className="h-8">5 miles</Button>
                        <Button variant="outline" size="sm" className="h-8">10 miles</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Availability</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="filter-open-now" />
                          <Label htmlFor="filter-open-now">Open now</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="filter-24hrs" defaultChecked />
                          <Label htmlFor="filter-24hrs">Open 24 hours</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Reset Filters</Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          
          {/* Quick Access Cards */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {serviceTypes.map(type => (
              <Button 
                key={type.id}
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => setSelectedLocationType(type.id)}
              >
                <div className={`p-2 rounded-full mb-2 ${
                  type.id === 'shelter' ? 'bg-blue-100 text-blue-600' :
                  type.id === 'food' ? 'bg-green-100 text-green-600' :
                  type.id === 'health' ? 'bg-red-100 text-red-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {type.icon}
                </div>
                <span className="text-sm">{type.name}</span>
              </Button>
            ))}
          </div>
        </div>
        
        {/* Side panel with location lists */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nearby Services</CardTitle>
              <CardDescription>
                {userLocation ? 
                  'Services near your location' : 
                  'Enable location to see services near you'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              {userLocation ? (
                <div className="space-y-3">
                  {serviceLocations.length > 0 ? (
                    serviceLocations.slice(0, 3).map(location => (
                      <div key={location.id} className="flex items-start">
                        <Building className="h-5 w-5 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <p className="font-medium">{location.name}</p>
                          {location.description && (
                            <p className="text-sm text-muted-foreground">{location.description}</p>
                          )}
                          <div className="flex gap-2 mt-1">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              <MapPin size={12} className="mr-1" />
                              View on map
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              <Navigation size={12} className="mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No services found nearby</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Expand search radius
                      </Button>
                    </div>
                  )}
                  
                  {serviceLocations.length > 3 && (
                    <Button variant="ghost" size="sm" className="w-full justify-between mt-2">
                      <span>View all {serviceLocations.length} services</span>
                      <ChevronRight size={16} />
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Button 
                    onClick={requestLocationPermission} 
                    disabled={isLoading}
                    className="mb-2"
                  >
                    <Locate size={16} className="mr-2" />
                    Enable location services
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Share your location to see nearby services
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Tabs defaultValue="service">
            <TabsList className="w-full">
              <TabsTrigger value="service" className="flex-1">
                <Building size={16} className="mr-1" /> Services
              </TabsTrigger>
              <TabsTrigger value="outreach" className="flex-1">
                <Compass size={16} className="mr-1" /> Mobile
              </TabsTrigger>
              <TabsTrigger value="checkins" className="flex-1">
                <CheckCircle size={16} className="mr-1" /> Check-ins
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="service" className="mt-2 space-y-4">
              <LocationList
                title="Service Centers"
                icon={<Building className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />}
                locations={filteredServiceLocations}
                badgeColor="bg-blue-100 text-blue-800 hover:bg-blue-100"
                emptyMessage="No service centers found"
                emptyIcon={<Building size={24} className="mx-auto text-muted-foreground" />}
              />
            </TabsContent>
            
            <TabsContent value="outreach" className="mt-2 space-y-4">
              <LocationList
                title="Mobile Services"
                icon={<Compass className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />}
                locations={filteredOutreachLocations}
                badgeColor="bg-green-100 text-green-800 hover:bg-green-100"
                emptyMessage="No mobile services found"
                emptyIcon={<Compass size={24} className="mx-auto text-muted-foreground" />}
              />
            </TabsContent>
            
            <TabsContent value="checkins" className="mt-2 space-y-4">
              <LocationList
                title="Recent Check-ins"
                icon={<CheckCircle className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0" />}
                locations={checkInLocations}
                badgeColor="bg-purple-100 text-purple-800 hover:bg-purple-100"
                emptyMessage="No recent check-ins"
                emptyIcon={<Users size={24} className="mx-auto text-muted-foreground" />}
              />
              
              <Button 
                className="w-full" 
                onClick={handleCheckIn}
                disabled={!userLocation || isLoading}
              >
                <CheckCircle size={16} className="mr-2" />
                Check In Now
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default Locations;