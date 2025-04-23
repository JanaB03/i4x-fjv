import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Navigation, 
  AlertCircle, 
  Building, 
  Compass, 
  CheckCircle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

// Fix default icon issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons for different location types
const createCustomIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="white">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

const serviceIcon = createCustomIcon('#3b82f6'); // blue
const outreachIcon = createCustomIcon('#22c55e'); // green
const checkInIcon = createCustomIcon('#8b5cf6'); // purple

const CenterMap = ({ location }) => {
  const map = useMap();
  
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13);
    }
  }, [location, map]);
  
  return null;
};

const InteractiveMap = () => {
  const { locations } = useApp();
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Function to get user's location
  const getUserLocation = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to access your location. Please check your browser settings.');
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  };
  
  // Categorize locations by type for display
  const serviceLocations = locations.filter(loc => loc.type === 'service');
  const outreachLocations = locations.filter(loc => loc.type === 'outreach');
  const checkInLocations = locations.filter(loc => loc.type === 'check-in');
  
  return (
    <div className="w-full h-full min-h-[400px] rounded-md overflow-hidden relative">
      <MapContainer 
        center={[32.7157, -117.1611]} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="h-full w-full"
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker 
            position={[userLocation.lat, userLocation.lng]}
            icon={new L.DivIcon({
              className: 'user-location-icon',
              html: `<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.2);">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="white">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                </svg>
              </div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })}
          >
            <Popup>
              <div className="text-sm font-medium">Your location</div>
              <div className="text-xs text-muted-foreground">Approximate position</div>
            </Popup>
          </Marker>
        )}

        {/* Service location markers */}
        {serviceLocations.map(location => (
          <Marker 
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={serviceIcon}
            eventHandlers={{
              click: () => setSelectedLocation(location.id)
            }}
          >
            <Popup>
              <div>
                <h3 className="font-medium">{location.name}</h3>
                {location.description && (
                  <p className="text-sm text-muted-foreground">{location.description}</p>
                )}
                <div className="mt-2">
                  <Button size="sm" className="w-full text-xs h-7">View Details</Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Outreach location markers */}
        {outreachLocations.map(location => (
          <Marker 
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={outreachIcon}
            eventHandlers={{
              click: () => setSelectedLocation(location.id)
            }}
          >
            <Popup>
              <div>
                <h3 className="font-medium">{location.name}</h3>
                {location.description && (
                  <p className="text-sm text-muted-foreground">{location.description}</p>
                )}
                <div className="mt-2">
                  <Button size="sm" className="w-full text-xs h-7">View Details</Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Check-in markers */}
        {checkInLocations.map(location => (
          <Marker 
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={checkInIcon}
            eventHandlers={{
              click: () => setSelectedLocation(location.id)
            }}
          >
            <Popup>
              <div>
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm text-muted-foreground">Community check-in</p>
                <div className="mt-2">
                  <Button size="sm" className="w-full text-xs h-7">View Details</Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <CenterMap location={userLocation} />
      </MapContainer>
      
      {/* Error message */}
      {error && (
        <div className="absolute top-4 left-4 right-4 z-10 bg-destructive/10 text-destructive p-2 rounded-md text-sm flex items-center">
          <AlertCircle size={16} className="mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
          <div className="bg-background rounded-md shadow-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <span>Loading map...</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Location request banner */}
      {!userLocation && !isLoading && (
        <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-md shadow-lg z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-center sm:text-left flex-grow">
              <h3 className="font-medium">Enable location services</h3>
              <p className="text-sm text-muted-foreground">See services near you and check in to share your approximate location</p>
            </div>
            <Button onClick={getUserLocation} disabled={isLoading} size="sm" className="px-4 py-2 h-auto">
              <MapPin size={16} className="mr-2" />
              Share Location
            </Button>
          </div>
        </div>
      )}
      
      {/* Permission denied guidance */}
      {error && error.includes('check your browser settings') && (
        <div className="absolute top-12 left-4 right-4 bg-amber-50 backdrop-blur-sm p-3 rounded-md shadow-lg border border-amber-200 z-10">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Location access needed</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Your browser blocked location access. Please check your browser settings and try again.
              </p>
              <div className="mt-2 space-x-2">
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={getUserLocation}>
                  Try Again
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-amber-600">
                  How to enable location
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;