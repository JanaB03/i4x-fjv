import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/PageContainer';
import { useApp } from '@/context/AppContext';
import { MapPin, Navigation, Users, Building, Compass, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Locations: React.FC = () => {
  const { currentUser, locations } = useApp();
  const [mapError, setMapError] = useState<string | null>(null);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState("35 minutes");
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

  const enableTracking = () => {
    setTrackingEnabled(true);
  };

  return (
    <PageContainer>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-orange-500">Locations & Services</h1>
        <p className="text-blue-800">Find help centers and track the mobile clinic's location</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Map and Tracking Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Map */}
          <div className="md:col-span-2">
            <Card className="w-full border-blue-200 shadow-md">
              <CardContent className="p-0 aspect-video relative bg-blue-100 rounded-md overflow-hidden flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin size={48} className="mx-auto mb-4 text-orange-500" />
                  <p className="text-blue-800">Map loading...</p>
                  <p className="text-sm text-blue-800 mt-2">Please enable location services to view nearby resources</p>
                </div>
                
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1 bg-white text-blue-800 border-blue-400">
                    <Navigation size={16} className="text-orange-500" />
                    <span>My Location</span>
                  </Button>
                  <Button size="sm" className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white">
                    <Compass size={16} />
                    <span>Check In</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Mobile Clinic Tracking */}
          <div className="md:col-span-1">
            <Card className="h-full border-blue-200 shadow-md">
              <CardHeader className="pb-2 bg-blue-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-blue-800">Mobile Clinic</CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Active
                  </Badge>
                </div>
                <CardDescription>
                  Live tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-[calc(100%-88px)]">
                {!trackingEnabled ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
                    <h3 className="font-medium text-blue-800 mb-2">Enable Tracking</h3>
                    <p className="text-sm text-gray-700 mb-4">See the mobile clinic's real-time location and get estimated arrival times.</p>
                    <Button 
                      onClick={enableTracking}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                      Enable Tracking
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="bg-blue-100 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <div className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center">
                            <Compass className="h-6 w-6 text-white" />
                          </div>
                          <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <Clock className="h-3 w-3 text-green-500" />
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800">Mobile Clinic</h4>
                          <p className="text-xs text-gray-700">Currently at: Balboa Park</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-between border border-gray-200 rounded-md p-4">
                      <div className="w-full">
                        <div className="flex justify-between text-sm text-blue-800 mb-2">
                          <span>Current Location</span>
                          <span>Your Location</span>
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full w-full mb-4">
                          <div className="absolute left-0 top-0 h-2 bg-orange-500 rounded-full" style={{ width: '65%' }}></div>
                          <div className="absolute left-[65%] -top-2 h-6 w-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            <Compass size={14} />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-blue-800">Est. arrival:</p>
                            <p className="text-lg font-bold text-orange-500">{estimatedTime}</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                            <Bell size={14} className="mr-1" /> Notify Me
                          </Button>
                        </div>
                      </div>
                      
                      <div className="w-full mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-700 mb-2">Services available:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">Medical checkups</Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">Prescriptions</Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">Vaccinations</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Locations List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Service Locations */}
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="pb-2 bg-blue-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-800">Service Centers</CardTitle>
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
                    <Building className="h-5 w-5 mr-2 mt-0.5 text-orange-500" />
                    <div>
                      <p className="font-medium text-blue-800">{location.name}</p>
                      {location.description && (
                        <p className="text-sm text-gray-700">{location.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Outreach Locations */}
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="pb-2 bg-blue-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-800">Mobile Services</CardTitle>
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
                    <Compass className="h-5 w-5 mr-2 mt-0.5 text-orange-500" />
                    <div>
                      <p className="font-medium text-blue-800">{location.name}</p>
                      {location.description && (
                        <p className="text-sm text-gray-700">{location.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Check-ins */}
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="pb-2 bg-blue-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-800">Recent Check-ins</CardTitle>
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
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-orange-500" />
                      <div>
                        <p className="font-medium text-blue-800">{location.name}</p>
                        <p className="text-sm text-gray-700">Approx. zone check-in</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-4 text-center text-gray-700">
                  <Users size={24} className="mx-auto mb-2 text-blue-300" />
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