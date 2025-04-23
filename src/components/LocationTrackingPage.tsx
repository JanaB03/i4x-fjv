import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Location } from '@/types';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  CalendarDays, 
  Users, 
  Building, 
  Compass,
  CheckCircle,
  Share2,
  MessageCircle
} from 'lucide-react';

interface ServiceDetailsProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for the service details
const mockServiceDetails = {
  hours: [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ],
  services: [
    'Housing assistance',
    'Meal services',
    'Showers & hygiene',
    'Medical assistance',
    'Case management'
  ],
  contact: {
    phone: '(123) 456-7890',
    website: 'www.example.org',
    email: 'info@example.org'
  }
};

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ location, isOpen, onClose }) => {
  if (!location) return null;
  
  // Determine icon based on location type
  const getTypeIcon = () => {
    switch (location.type) {
      case 'service':
        return <Building size={18} className="text-blue-600" />;
      case 'outreach':
        return <Compass size={18} className="text-green-600" />;
      case 'check-in':
        return <CheckCircle size={18} className="text-purple-600" />;
      default:
        return <MapPin size={18} />;
    }
  };
  
  // Get background color based on type
  const getTypeColor = () => {
    switch (location.type) {
      case 'service':
        return 'bg-blue-100 text-blue-800';
      case 'outreach':
        return 'bg-green-100 text-green-800';
      case 'check-in':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get a formatted type label
  const getTypeLabel = () => {
    switch (location.type) {
      case 'service':
        return 'Service Center';
      case 'outreach':
        return 'Mobile Outreach';
      case 'check-in':
        return 'Community Check-in';
      default:
        return location.type;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-2 mb-1">
            <Badge className={getTypeColor()} variant="outline">
              <span className="flex items-center gap-1">
                {getTypeIcon()}
                {getTypeLabel()}
              </span>
            </Badge>
            
            {location.type !== 'check-in' && (
              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                <Clock size={14} className="mr-1" />
                Open Now
              </Badge>
            )}
          </div>
          
          <DialogTitle className="text-xl">{location.name}</DialogTitle>
          
          {location.description && (
            <DialogDescription className="text-sm">
              {location.description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        {location.type !== 'check-in' ? (
          // Service or outreach location details
          <Tabs defaultValue="info">
            <TabsList className="w-full">
              <TabsTrigger value="info" className="flex-1">
                <Globe size={16} className="mr-1" />
                Info
              </TabsTrigger>
              <TabsTrigger value="services" className="flex-1">
                <Users size={16} className="mr-1" />
                Services
              </TabsTrigger>
              <TabsTrigger value="hours" className="flex-1">
                <CalendarDays size={16} className="mr-1" />
                Hours
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-muted-foreground" />
                  <span className="text-sm">123 Main Street, San Diego, CA 92101</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-muted-foreground" />
                  <span className="text-sm">{mockServiceDetails.contact.phone}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-muted-foreground" />
                  <span className="text-sm">{mockServiceDetails.contact.website}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">About</h3>
                <p className="text-sm text-muted-foreground">
                  {location.description || `${location.name} provides essential services for those in need. Visit or contact for more information about specific programs and assistance available.`}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="pt-4">
              <h3 className="text-sm font-medium mb-2">Available Services</h3>
              <div className="grid grid-cols-1 gap-2">
                {mockServiceDetails.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center">
                      <CheckCircle size={14} className="text-primary" />
                    </div>
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hours" className="pt-4">
              <h3 className="text-sm font-medium mb-2">Hours of Operation</h3>
              <div className="space-y-2">
                {mockServiceDetails.hours.map((day, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between py-1 border-b border-muted last:border-0"
                  >
                    <span className="text-sm font-medium">{day.day}</span>
                    <span className="text-sm">{day.hours}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          // Check-in location details
          <div className="py-2 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-muted-foreground" />
              <span className="text-sm">Approximate Zone Check-in</span>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Check-in Information</h3>
              <p className="text-sm text-muted-foreground">
                This is an approximate zone check-in shared by a community member. No exact location data is stored or shared for privacy and safety reasons.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Nearby Services</h3>
              <div className="space-y-2">
                <div className="p-2 bg-muted rounded-md">
                  <div className="flex items-start gap-2">
                    <Building size={16} className="text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Father Joe's Villages Main Campus</p>
                      <p className="text-xs text-muted-foreground">0.4 miles away</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 bg-muted rounded-md">
                  <div className="flex items-start gap-2">
                    <Compass size={16} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Mobile Health Clinic</p>
                      <p className="text-xs text-muted-foreground">0.8 miles away</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex sm:justify-between gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          
          <div className="flex gap-2">
            {location.type !== 'check-in' && (
              <>
                <Button variant="outline" size="sm">
                  <Share2 size={16} className="mr-1" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle size={16} className="mr-1" />
                  Message
                </Button>
              </>
            )}
            
            <Button size="sm">
              <Navigation size={16} className="mr-1" />
              Directions
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetails;