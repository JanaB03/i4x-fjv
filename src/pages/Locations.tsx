
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/PageContainer';
import { useApp } from '@/context/AppContext';
import { MapPin, Navigation, Users, Building, Compass, CheckCircle } from 'lucide-react';

const Locations: React.FC = () => {
  const { currentUser, locations } = useApp();
  const [mapError, setMapError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Separate locations by type
  const serviceLocations = locations.filter(loc => loc.type === 'service');
  const outreachLocations = locations.filter(loc => loc.type === 'outreach');
  const checkInLocations = locations.filter(loc => loc.type === 'check-in');

  return (
    <PageContainer>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Locations & Services</h1>
        <p className="text-muted-foreground">Find help centers and share your approximate location</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Map Placeholder */}
        <Card className="w-full">
          <CardContent className="p-0 aspect-video relative bg-muted rounded-md overflow-hidden flex items-center justify-center">
            <div className="text-center p-4">
              <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Map loading...</p>
              <p className="text-sm text-muted-foreground mt-2">Please enable location services to view nearby resources</p>
            </div>
            
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button size="sm" variant="secondary" className="flex items-center gap-1">
                <Navigation size={16} />
                <span>My Location</span>
              </Button>
              <Button size="sm" variant="default" className="flex items-center gap-1">
                <Compass size={16} />
                <span>Check In</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Locations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Service Locations */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Service Centers</CardTitle>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {serviceLocations.length}
                </Badge>
              </div>
              <CardDescription>
                Full-service facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {serviceLocations.map(location => (
                  <li key={location.id} className="flex items-start">
                    <Building className="h-5 w-5 mr-2 mt-0.5 text-blue-600" />
                    <div>
                      <p className="font-medium">{location.name}</p>
                      {location.description && (
                        <p className="text-sm text-muted-foreground">{location.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Outreach Locations */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mobile Services</CardTitle>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  {outreachLocations.length}
                </Badge>
              </div>
              <CardDescription>
                Current mobile outreach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {outreachLocations.map(location => (
                  <li key={location.id} className="flex items-start">
                    <Compass className="h-5 w-5 mr-2 mt-0.5 text-green-600" />
                    <div>
                      <p className="font-medium">{location.name}</p>
                      {location.description && (
                        <p className="text-sm text-muted-foreground">{location.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Check-ins */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Check-ins</CardTitle>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                  {checkInLocations.length}
                </Badge>
              </div>
              <CardDescription>
                Community check-ins
              </CardDescription>
            </CardHeader>
            <CardContent>
              {checkInLocations.length > 0 ? (
                <ul className="space-y-2">
                  {checkInLocations.map(location => (
                    <li key={location.id} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-purple-600" />
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-muted-foreground">Approx. zone check-in</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  <Users size={24} className="mx-auto mb-2" />
                  <p>No recent check-ins</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Locations;
