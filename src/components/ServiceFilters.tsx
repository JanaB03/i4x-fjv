import React, { useState } from 'react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerFooter 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Building, 
  ShowerHead, 
  Utensils, 
  HeartPulse, 
  Home, 
  Briefcase, 
  Book,
  Baby,
  Clock,
  Check,
  X
} from 'lucide-react';

interface ServiceFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const serviceCategories = [
  { id: 'shelter', name: 'Shelter', icon: <Home size={16} /> },
  { id: 'food', name: 'Food', icon: <Utensils size={16} /> },
  { id: 'health', name: 'Health', icon: <HeartPulse size={16} /> },
  { id: 'hygiene', name: 'Hygiene', icon: <ShowerHead size={16} /> },
  { id: 'employment', name: 'Employment', icon: <Briefcase size={16} /> },
  { id: 'education', name: 'Education', icon: <Book size={16} /> },
  { id: 'family', name: 'Family Services', icon: <Baby size={16} /> }
];

const ServiceFilters: React.FC<ServiceFiltersProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [distance, setDistance] = useState<number>(5);
  const [activeFilters, setActiveFilters] = useState<string[]>(['shelter', 'food', 'health']);
  const [availabilityFilters, setAvailabilityFilters] = useState({
    openNow: true,
    open24Hours: false,
    walkingDistance: true
  });
  
  const handleServiceToggle = (serviceId: string) => {
    if (activeFilters.includes(serviceId)) {
      setActiveFilters(activeFilters.filter(id => id !== serviceId));
    } else {
      setActiveFilters([...activeFilters, serviceId]);
    }
  };
  
  const handleAvailabilityToggle = (key: string) => {
    setAvailabilityFilters({
      ...availabilityFilters,
      [key]: !availabilityFilters[key as keyof typeof availabilityFilters]
    });
  };
  
  const handleApplyFilters = () => {
    onApplyFilters({
      services: activeFilters,
      distance,
      availability: availabilityFilters
    });
    onClose();
  };
  
  const handleResetFilters = () => {
    setActiveFilters(['shelter', 'food', 'health']);
    setDistance(5);
    setAvailabilityFilters({
      openNow: true,
      open24Hours: false,
      walkingDistance: true
    });
  };
  
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center">
            <span>Filter Services</span>
            <Badge variant="outline" className="ml-2 bg-primary/10">
              {activeFilters.length} selected
            </Badge>
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4">
          <Tabs defaultValue="services">
            <TabsList className="w-full">
              <TabsTrigger value="services" className="flex-1">
                <Building size={16} className="mr-1" />
                Services
              </TabsTrigger>
              <TabsTrigger value="distance" className="flex-1">
                <MapPin size={16} className="mr-1" />
                Distance
              </TabsTrigger>
              <TabsTrigger value="availability" className="flex-1">
                <Clock size={16} className="mr-1" />
                Availability
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="pt-4 pb-2">
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Service Types</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => setActiveFilters(serviceCategories.map(s => s.id))}
                  >
                    Select All
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {serviceCategories.map(service => (
                    <Button
                      key={service.id}
                      variant={activeFilters.includes(service.id) ? "default" : "outline"}
                      size="sm"
                      className="justify-start h-9"
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className="mr-2">
                        {service.icon}
                      </div>
                      {service.name}
                      {activeFilters.includes(service.id) && (
                        <Check size={14} className="ml-auto" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="distance" className="space-y-4 pt-4 pb-2">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Distance Range</h3>
                  <span className="text-sm font-medium">{distance} miles</span>
                </div>
                
                <Slider
                  value={[distance]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setDistance(value[0])}
                  className="mb-6"
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 mile</span>
                  <span>5 miles</span>
                  <span>10 miles</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Quick Distance</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={distance === 1 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setDistance(1)}
                  >
                    1 mile
                  </Button>
                  <Button 
                    variant={distance === 5 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setDistance(5)}
                  >
                    5 miles
                  </Button>
                  <Button 
                    variant={distance === 10 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setDistance(10)}
                  >
                    10 miles
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="availability" className="space-y-4 pt-4 pb-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="open-now" className="flex items-center cursor-pointer">
                    <Clock size={16} className="mr-2 text-muted-foreground" />
                    <span>Open now</span>
                  </Label>
                  <Switch 
                    id="open-now" 
                    checked={availabilityFilters.openNow}
                    onCheckedChange={() => handleAvailabilityToggle('openNow')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="open-24" className="flex items-center cursor-pointer">
                    <Clock size={16} className="mr-2 text-muted-foreground" />
                    <span>Open 24 hours</span>
                  </Label>
                  <Switch 
                    id="open-24" 
                    checked={availabilityFilters.open24Hours}
                    onCheckedChange={() => handleAvailabilityToggle('open24Hours')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="walking" className="flex items-center cursor-pointer">
                    <Navigation size={16} className="mr-2 text-muted-foreground" />
                    <span>Walking distance</span>
                  </Label>
                  <Switch 
                    id="walking" 
                    checked={availabilityFilters.walkingDistance}
                    onCheckedChange={() => handleAvailabilityToggle('walkingDistance')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Days Available</h3>
                <div className="grid grid-cols-4 gap-2">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DrawerFooter className="px-4 pt-2">
          <div className="flex justify-between items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleResetFilters}
              className="flex-1"
            >
              <X size={16} className="mr-1" />
              Reset
            </Button>
            
            <Button 
              size="sm" 
              onClick={handleApplyFilters}
              className="flex-1"
            >
              <Check size={16} className="mr-1" />
              Apply Filters
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ServiceFilters;