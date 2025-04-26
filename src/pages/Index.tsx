import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  Bell, 
  Building, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Compass, 
  FileText,
  Filter,
  Home, 
  Hotel,
  Info, 
  Locate,
  MapPin, 
  MessageCircle, 
  Moon,
  Navigation, 
  Phone,
  Search, 
  Send,
  ShowerHead,
  Utensils,
  User, 
  Users,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

// Mock data for the dashboard
const currentUser = {
  nickname: "Alex",
  role: "client",
  accessCode: "1234",
};

const caseManagers = [
  {
    id: "staff1",
    nickname: "Counselor Sam",
    role: "Housing Specialist",
    lastMessage: "Just now",
    phone: "555-123-4567",
    email: "sam@fjv.org",
    availability: "Mon-Fri, 9am-5pm"
  },
  {
    id: "staff2",
    nickname: "Nurse Morgan",
    role: "Health Services",
    lastMessage: "Yesterday",
    phone: "555-987-6543",
    email: "morgan@fjv.org",
    availability: "Tues-Thurs, 10am-4pm"
  }
];

const emergencyShelters = [
  {
    id: "shelter1",
    name: "Main Street Shelter",
    address: "123 Main Street",
    totalBeds: 40,
    availableBeds: 5,
    checkinTime: "5:00 PM - 9:00 PM",
    checkoutTime: "8:00 AM",
    distance: "0.7 miles",
    restrictions: ["No pets", "18+ only"],
    services: ["Dinner provided", "Showers", "Laundry"],
    isReserved: true,
    weather: "Opening tonight due to cold weather"
  },
  {
    id: "shelter2",
    name: "Hope Center",
    address: "456 Hope Avenue",
    totalBeds: 25,
    availableBeds: 0,
    checkinTime: "6:00 PM - 8:00 PM",
    checkoutTime: "7:00 AM",
    distance: "1.2 miles",
    restrictions: ["No pets", "Sobriety required"],
    services: ["Dinner provided", "Breakfast provided", "Case management"],
    isReserved: false
  },
  {
    id: "shelter3",
    name: "Community Emergency Shelter",
    address: "789 Community Blvd",
    totalBeds: 60,
    availableBeds: 12,
    checkinTime: "7:00 PM - 10:00 PM",
    checkoutTime: "9:00 AM",
    distance: "2.3 miles",
    restrictions: ["ID required"],
    services: ["Meals provided", "Medical services", "Clothing"],
    isReserved: false,
    weather: "Opening tonight due to cold weather"
  }
];

const housingApplications = [
  {
    id: "housing1",
    type: "Permanent Supportive Housing",
    status: "Application in Progress",
    step: 2,
    totalSteps: 4,
    submittedDate: new Date(Date.now() - 5 * 24 * 3600 * 1000), // 5 days ago
    nextAppointment: new Date(Date.now() + 2 * 24 * 3600 * 1000), // 2 days from now
    notes: "Documentation review in process. Bring your ID to next appointment.",
    caseManager: "Counselor Sam",
    documents: [
      { name: "ID Copy", status: "submitted" },
      { name: "Income Verification", status: "needed" },
      { name: "Housing History", status: "submitted" },
      { name: "Medical Documentation", status: "needed" }
    ],
    timeline: [
      { 
        date: new Date(Date.now() - 5 * 24 * 3600 * 1000), 
        event: "Application Submitted",
        details: "Initial application completed with Counselor Sam"
      },
      { 
        date: new Date(Date.now() - 3 * 24 * 3600 * 1000), 
        event: "Document Collection",
        details: "ID and supporting documents submitted"
      },
      { 
        date: new Date(Date.now()), 
        event: "Application Review",
        details: "Your application is being reviewed",
        current: true
      },
      { 
        date: null, 
        event: "Housing Match",
        details: "Matching with available housing options",
        upcoming: true
      }
    ]
  },
  {
    id: "housing2",
    type: "Emergency Housing Voucher",
    status: "On Waiting List",
    step: 1,
    totalSteps: 3,
    submittedDate: new Date(Date.now() - 30 * 24 * 3600 * 1000), // 30 days ago
    notes: "Position #45 on waiting list. Estimated wait time: 2-3 months.",
    caseManager: "Counselor Sam"
  }
];

const recentMessages = [
  {
    id: "msg1",
    content: "Hello, I need information about tonight's shelter options.",
    senderId: "client1",
    senderNickname: "Alex",
    receiverId: "staff1",
    receiverNickname: "Counselor Sam",
    isPublic: false,
    createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
  },
  {
    id: "msg2",
    content: "We have 5 beds available at the Main Street shelter. You can check in starting at 6pm. I've reserved a spot for you.",
    senderId: "staff1",
    senderNickname: "Counselor Sam",
    receiverId: "client1",
    receiverNickname: "Alex",
    isPublic: false,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "msg3",
    content: "Thank you. Can I still get dinner if I arrive at 7pm?",
    senderId: "client1",
    senderNickname: "Alex",
    receiverId: "staff1",
    receiverNickname: "Counselor Sam",
    isPublic: false,
    createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
  },
  {
    id: "msg4",
    content: "Yes, dinner is served until 8pm. Just give your nickname at check-in and mention you have a reservation.",
    senderId: "staff1",
    senderNickname: "Counselor Sam",
    receiverId: "client1",
    receiverNickname: "Alex",
    isPublic: false,
    createdAt: new Date(Date.now() - 900000), // 15 minutes ago
  }
];

const upcomingAppointments = [
  {
    id: "appt1",
    title: "Housing Document Review",
    date: new Date(Date.now() + 2 * 24 * 3600 * 1000), // 2 days from now
    time: "2:00 PM",
    location: "Father Joe's Villages Main Campus",
    with: "Counselor Sam",
    notes: "Bring your ID and any other documents"
  },
  {
    id: "appt2",
    title: "Medical Check-up",
    date: new Date(Date.now() + 5 * 24 * 3600 * 1000), // 5 days from now
    time: "10:30 AM",
    location: "Mobile Health Clinic at Balboa Park",
    with: "Nurse Morgan",
    notes: "Bring your medication list if available"
  }
];

const dailyResources = [
  {
    id: "resource1",
    name: "Breakfast Service",
    location: "Father Joe's Villages Dining Hall",
    time: "6:30 AM - 8:30 AM",
    distance: "0.5 miles",
    notes: "No ID required"
  },
  {
    id: "resource2",
    name: "Lunch Service",
    location: "St. Vincent de Paul Dining Room",
    time: "11:00 AM - 1:00 PM",
    distance: "0.7 miles",
    notes: "No ID required"
  },
  {
    id: "resource3",
    name: "Dinner Service",
    location: "Salvation Army",
    time: "5:00 PM - 7:00 PM",
    distance: "1.2 miles",
    notes: "ID preferred but not required"
  },
  {
    id: "resource4",
    name: "Shower Facilities",
    location: "Father Joe's Villages Day Center",
    time: "7:00 AM - 3:00 PM",
    distance: "0.5 miles",
    notes: "Towels and toiletries provided"
  },
  {
    id: "resource5",
    name: "Laundry Services",
    location: "Father Joe's Villages Day Center",
    time: "8:00 AM - 2:00 PM",
    distance: "0.5 miles",
    notes: "Sign up required, limited slots"
  }
];

const notifications = [
  {
    id: "notif1",
    title: "Housing Update",
    content: "Your housing application has moved to step 2 of 4",
    date: new Date(),
    isRead: false,
    category: "housing",
    link: "/housing"
  },
  {
    id: "notif2",
    title: "Shelter Reservation Confirmed",
    content: "Your bed at Main Street Shelter is confirmed for tonight",
    date: new Date(Date.now() - 3600000), // 1 hour ago
    isRead: true,
    category: "shelter",
    link: "/shelters"
  },
  {
    id: "notif3",
    title: "Emergency Shelter Open",
    content: "Emergency shelter open tonight due to cold weather",
    date: new Date(Date.now() - 7200000), // 2 hours ago
    isRead: false,
    category: "shelter",
    link: "/shelters"
  },
  {
    id: "notif4",
    title: "Appointment Reminder",
    content: "Housing document review with Counselor Sam tomorrow at 2PM",
    date: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    isRead: false,
    category: "appointment",
    link: "/appointments"
  }
];

// Component definition
const ClientDashboard: React.FC = () => {
  const [tab, setTab] = useState("overview");
  const [messageInput, setMessageInput] = useState("");
  
  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return format(date, "MMM d");
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "housing":
        return <Home size={16} className="text-blue-500" />;
      case "shelter":
        return <Building size={16} className="text-orange-500" />;
      case "message":
        return <MessageCircle size={16} className="text-green-500" />;
      case "appointment":
        return <Calendar size={16} className="text-purple-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Here you would actually send the message
    alert("Message sent: " + messageInput);
    setMessageInput("");
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-blue-800 text-white py-3 px-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-400">BridgeGap</span>
            <span className="ml-2 bg-white p-1 rounded">
              <div className="h-6 w-6 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">B</div>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {notifications.filter(n => !n.isRead).length}
              </span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{getInitials(currentUser.nickname)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="font-medium">{currentUser.nickname}</p>
                <p className="text-xs opacity-80">Client</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {currentUser.nickname}</h1>
            <p className="text-muted-foreground">Let's check your updates</p>
          </div>
          
          <Button className="bg-orange-500 hover:bg-orange-600">
            <MessageCircle size={16} className="mr-2" />
            Message Case Manager
          </Button>
        </div>
        
        <Tabs value={tab} onValueChange={setTab} className="space-y-4">
          <TabsList className="grid sm:grid-cols-5 grid-cols-4">
            <TabsTrigger value="overview">
              <Home size={16} className="mr-2 md:inline-block hidden" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="shelters">
              <Building size={16} className="mr-2 md:inline-block hidden" />
              Shelters
            </TabsTrigger>
            <TabsTrigger value="housing">
              <Home size={16} className="mr-2 md:inline-block hidden" />
              Housing
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageCircle size={16} className="mr-2 md:inline-block hidden" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="resources">
              <Compass size={16} className="mr-2 md:inline-block hidden" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-4">
            {/* Emergency Alert */}
            {emergencyShelters.some(shelter => shelter.weather) && (
              <Card className="border-l-4 border-l-orange-500 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={24} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-orange-800">Weather Alert: Cold Weather Shelters Open Tonight</h3>
                      <p className="text-sm text-orange-800/80">
                        Due to forecasted low temperatures, additional emergency shelters are available. 
                        See the Shelters tab for more information.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-white border-orange-500 text-orange-600 hover:bg-orange-100">
                        View Shelters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          
            {/* Tonight's Shelter */}
            <Card className={`border-l-4 ${emergencyShelters[0].isReserved ? 'border-l-green-500' : 'border-l-blue-500'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Hotel size={20} className="mr-2 text-blue-500" />
                      Tonight's Shelter
                    </CardTitle>
                    <CardDescription>Your shelter reservation status</CardDescription>
                  </div>
                  {emergencyShelters[0].isReserved ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Bed Reserved
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      No Reservation
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyShelters[0].isReserved ? (
                    <div className="rounded-md border p-3">
                      <div className="font-medium">{emergencyShelters[0].name}</div>
                      <div className="text-sm text-muted-foreground">{emergencyShelters[0].address}</div>
                      <div className="flex items-center mt-2 text-sm">
                        <Clock size={14} className="mr-1 text-muted-foreground" />
                        <span>Check-in: {emergencyShelters[0].checkinTime}</span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Badge className="bg-blue-100 text-blue-800">Dinner provided</Badge>
                        <Badge className="bg-blue-100 text-blue-800">Showers</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Building size={40} className="mx-auto text-muted-foreground mb-2" />
                      <p className="font-medium">No shelter reservation for tonight</p>
                      <p className="text-sm text-muted-foreground mb-4">Would you like to reserve a bed?</p>
                      <Button>
                        Reserve Shelter Bed
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setTab("shelters")}>
                  View All Shelters
                </Button>
              </CardFooter>
            </Card>
          
            {/* Housing Applications */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Home size={20} className="mr-2 text-blue-500" />
                      Housing Status
                    </CardTitle>
                    <CardDescription>Your current housing applications</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Step {housingApplications[0].step} of {housingApplications[0].totalSteps}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full" 
                      style={{ width: `${(housingApplications[0].step / housingApplications[0].totalSteps) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Calendar size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Next Appointment</p>
                      <p className="text-sm text-muted-foreground">
                        {format(housingApplications[0].nextAppointment, "EEEE, MMM d")} at 2:00 PM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <FileText size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Required Documents</p>
                      <div className="mt-1 space-y-1">
                        {housingApplications[0].documents.map((doc, index) => (
                          <div key={index} className="flex items-center">
                            {doc.status === "submitted" ? (
                              <CheckCircle size={14} className="text-green-500 mr-1" />
                            ) : (
                              <X size={14} className="text-orange-500 mr-1" />
                            )}
                            <span className="text-sm">
                              {doc.name} {doc.status !== "submitted" && <span className="text-orange-500 text-xs">(needed)</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setTab("housing")}>
                  View All Housing Details
                </Button>
              </CardFooter>
            </Card>
            
            {/* Recent Messages & Notifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Notifications */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Bell size={18} className="mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-64 overflow-y-auto">
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-lg border-l-4 ${
                          notification.isRead 
                            ? "bg-muted border-l-gray-300" 
                            : notification.category === "housing" 
                              ? "bg-blue-50 border-l-blue-500"
                              : notification.category === "shelter" 
                                ? "bg-orange-50 border-l-orange-500"
                                : notification.category === "appointment"
                                  ? "bg-purple-50 border-l-purple-500"
                                  : "bg-green-50 border-l-green-500"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            {getCategoryIcon(notification.category)}
                            <p className="font-medium text-sm ml-2">{notification.title}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{formatTime(notification.date)}</p>
                        </div>
                        <p className="text-sm">{notification.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Recent Messages */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MessageCircle size={18} className="mr-2" />
                    Recent Messages
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-64 overflow-y-auto">
                  <div className="space-y-3">
                    {recentMessages.slice(-3).map(message => (
                      <div 
                        key={message.id} 
                        className={`p-3 rounded-lg ${
                          message.senderId === currentUser.id 
                            ? "bg-blue-100 ml-8"
                            : "bg-gray-100 mr-8"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-medium text-sm">{message.senderNickname}</p>
                          <p className="text-xs text-muted-foreground">{formatTime(message.createdAt)}</p>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setTab("messages")}>
                    View All Messages
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Daily Resources */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Compass size={18} className="mr-2" />
                  Today's Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyResources.slice(0, 3).map(resource => (
                    <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-start gap-3">
                        {resource.name.toLowerCase().includes("breakfast") || 
                         resource.name.toLowerCase().includes("lunch") || 
                         resource.name.toLowerCase().includes("dinner") ? (
                          <Utensils size={18} className="text-orange-500 mt-0.5" />
                        ) : resource.name.toLowerCase().includes("shower") ? (
                          <ShowerHead size={18} className="text-blue-500 mt-0.5" />
                        ) : (
                          <Compass size={18} className="text-green-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-xs text-muted-foreground">{resource.location}</p>
                          <div className="flex items-center mt-1 gap-2">
                            <div className="flex items-center">
                              <Clock size={12} className="text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{resource.time}</span>
                            </div>
                            <div className="flex items-center">
                              <Navigation size={12} className="text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{resource.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8">
                        <MapPin size={14} className="mr-1" />
                        Map
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setTab("resources")}>
                  View All Resources
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* SHELTERS TAB */}
          <TabsContent value="shelters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building size={20} className="mr-2 text-blue-500" />
                  Emergency Shelters
                </CardTitle>
                <CardDescription>Available shelter options for tonight</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyShelters.map((shelter) => (
                  <div key={shelter.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{shelter.name}</h3>
                          <p className="text-sm text-muted-foreground">{shelter.address}</p>
                        </div>
                        {shelter.isReserved ? (
                          <Badge className="bg-green-100 text-green-800">Bed Reserved</Badge>
                        ) : shelter.availableBeds > 0 ? (
                          <Badge className="bg-blue-100 text-blue-800">{shelter.availableBeds} beds available</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-200">Full</Badge>
                        )}
                      </div>
                    </div>
                    <div className="bg-muted px-4 py-3 flex flex-wrap gap-3">
                      <div className="flex items-center">
                        <Clock size={14} className="text-muted-foreground mr-1" />
                        <span className="text-sm">Check-in: {shelter.checkinTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Navigation size={14} className="text-muted-foreground mr-1" />
                        <span className="text-sm">{shelter.distance}</span>
                      </div>
                    </div>
                    <div className="p-4 pt-3 border-t">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Services</h4>
                          <div className="flex flex-wrap gap-1">
                            {shelter.services.map((service, index) => (
                              <Badge key={index} className="bg-blue-50 text-blue-700 border-blue-100">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Restrictions</h4>
                          <div className="flex flex-wrap gap-1">
                            {shelter.restrictions.map((restriction, index) => (
                              <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                                {restriction}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        {shelter.weather && (
                          <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                            <AlertCircle size={12} className="mr-1" />
                            {shelter.weather}
                          </Badge>
                        )}
                        <div className="ml-auto flex gap-2">
                          <Button variant="outline" size="sm">
                            <MapPin size={14} className="mr-1" />
                            Directions
                          </Button>
                          {shelter.isReserved ? (
                            <Button variant="outline" size="sm" className="text-green-600">
                              <CheckCircle size={14} className="mr-1" />
                              Reserved
                            </Button>
                          ) : shelter.availableBeds > 0 ? (
                            <Button size="sm">
                              Reserve Bed
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" disabled>
                              Full
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* HOUSING TAB */}
          <TabsContent value="housing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home size={20} className="mr-2 text-blue-500" />
                  Your Housing Applications
                </CardTitle>
                <CardDescription>Track your progress and next steps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {housingApplications.map((application) => (
                  <div key={application.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{application.type}</h3>
                          <p className="text-sm text-muted-foreground">Application ID: #{application.id}</p>
                        </div>
                        <Badge className={
                          application.status === "Application in Progress" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-amber-100 text-amber-800"
                        }>
                          {application.status}
                        </Badge>
                      </div>
                      
                      {'step' in application && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>Step {application.step} of {application.totalSteps}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-500 h-2.5 rounded-full" 
                              style={{ width: `${(application.step / application.totalSteps) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Application Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Calendar size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">Submitted on {format(application.submittedDate, 'MMMM d, yyyy')}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <User size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">Case Manager: {application.caseManager}</p>
                            </div>
                          </div>
                          {'nextAppointment' in application && (
                            <div className="flex items-start gap-2">
                              <Calendar size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium">Next Appointment: {format(application.nextAppointment, 'MMMM d, yyyy')} at 2:00 PM</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {'documents' in application && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Required Documents</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {application.documents.map((doc, index) => (
                              <div key={index} className="flex items-center">
                                {doc.status === "submitted" ? (
                                  <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                                ) : (
                                  <X size={14} className="text-orange-500 mr-2 flex-shrink-0" />
                                )}
                                <span className="text-sm">
                                  {doc.name} {doc.status !== "submitted" && (
                                    <span className="text-orange-500 text-xs">(needed)</span>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {'timeline' in application && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Application Timeline</h4>
                          <ol className="relative border-l border-gray-200 ml-2 space-y-4">
                            {application.timeline.map((item, index) => (
                              <li key={index} className="ml-4">
                                <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-white ${
                                  item.current 
                                    ? "bg-blue-500" 
                                    : item.upcoming 
                                      ? "bg-gray-200" 
                                      : "bg-green-500"
                                }`}></div>
                                {item.date ? (
                                  <time className="mb-1 text-xs font-normal text-muted-foreground">
                                    {format(item.date, 'MMMM d, yyyy')}
                                  </time>
                                ) : (
                                  <time className="mb-1 text-xs font-normal text-muted-foreground">
                                    Coming soon
                                  </time>
                                )}
                                <h3 className={`text-sm font-semibold ${
                                  item.upcoming ? "text-muted-foreground" : ""
                                }`}>{item.event}</h3>
                                <p className="text-xs text-muted-foreground">{item.details}</p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-muted p-4 border-t">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Notes</p>
                      </div>
                      <p className="text-sm mt-1">{application.notes}</p>
                    </div>
                    
                    <div className="p-4 border-t flex justify-end gap-2">
                      {'nextAppointment' in application && (
                        <Button variant="outline">
                          <Calendar size={16} className="mr-2" />
                          Reschedule Appointment
                        </Button>
                      )}
                      <Button>
                        <MessageCircle size={16} className="mr-2" />
                        Contact Case Manager
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* MESSAGES TAB */}
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User size={20} className="mr-2 text-blue-500" />
                  Your Case Managers
                </CardTitle>
                <CardDescription>Contact your support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {caseManagers.map(manager => (
                    <div key={manager.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(manager.nickname)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{manager.nickname}</p>
                            <p className="text-xs text-muted-foreground">{manager.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground mr-2">Last message: {manager.lastMessage}</span>
                          <Button size="sm">Message</Button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-center text-sm">
                          <Phone size={14} className="text-muted-foreground mr-1" />
                          <span>{manager.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock size={14} className="text-muted-foreground mr-1" />
                          <span>{manager.availability}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col h-[500px]">
              <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <MessageCircle size={20} className="mr-2 text-blue-500" />
                    Chat with Counselor Sam
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>
              </CardHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
                {recentMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-3 rounded-lg max-w-[75%] ${
                      message.senderId === currentUser.id 
                        ? "bg-blue-100 ml-auto" 
                        : "bg-gray-100 mr-auto"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium text-sm">{message.senderNickname}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(message.createdAt)}</p>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()} className="px-3">
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* RESOURCES TAB */}
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils size={20} className="mr-2 text-orange-500" />
                  Daily Meal Services
                </CardTitle>
                <CardDescription>Available meal services today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyResources.filter(r => 
                    r.name.toLowerCase().includes("breakfast") || 
                    r.name.toLowerCase().includes("lunch") || 
                    r.name.toLowerCase().includes("dinner")
                  ).map(resource => (
                    <div key={resource.id} className="p-3 rounded-lg border flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <Utensils size={18} className="text-orange-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-xs text-muted-foreground">{resource.location}</p>
                          <div className="flex items-center mt-1 gap-2">
                            <div className="flex items-center">
                              <Clock size={12} className="text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{resource.time}</span>
                            </div>
                            <div className="flex items-center">
                              <Navigation size={12} className="text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{resource.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MapPin size={14} className="mr-1" />
                        Directions
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShowerHead size={20} className="mr-2 text-blue-500" />
                  Hygiene Services
                </CardTitle>
                <CardDescription>Showers, laundry, and personal care</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyResources.filter(r => 
                    r.name.toLowerCase().includes("shower") || 
                    r.name.toLowerCase().includes("laundry")
                  ).map(resource => (
                    <div key={resource.id} className="p-3 rounded-lg border flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <ShowerHead size={18} className="text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-xs text-muted-foreground">{resource.location}</p>
                          <div className="flex items-center mt-1 gap-2">
                            <div className="flex items-center">
                              <Clock size={12} className="text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{resource.time}</span>
                            </div>
                            <div className="flex items-center">
                              <Info size={12} className="text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{resource.notes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MapPin size={14} className="mr-1" />
                        Directions
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar size={20} className="mr-2 text-purple-500" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="p-3 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 p-2 rounded-md">
                            <Calendar size={18} className="text-purple-500" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.title}</p>
                            <p className="text-sm">{format(appointment.date, 'EEEE, MMMM d, yyyy')} at {appointment.time}</p>
                            <p className="text-xs text-muted-foreground">{appointment.location}</p>
                            <p className="text-xs text-muted-foreground">With: {appointment.with}</p>
                            <div className="mt-2">
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                <AlertCircle size={12} className="mr-1" />
                                {appointment.notes}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Calendar size={16} className="mr-2" />
                  Schedule New Appointment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-4 flex justify-around items-center z-10 md:hidden">
        <Button 
          variant={tab === "overview" ? "default" : "ghost"} 
          size="icon" 
          className="flex flex-col items-center justify-center h-14 w-14"
          onClick={() => setTab("overview")}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Button>
        
        <Button 
          variant={tab === "shelters" ? "default" : "ghost"} 
          size="icon" 
          className="flex flex-col items-center justify-center h-14 w-14"
          onClick={() => setTab("shelters")}
        >
          <Building size={20} />
          <span className="text-xs mt-1">Shelters</span>
        </Button>
        
        <Button 
          variant={tab === "housing" ? "default" : "ghost"} 
          size="icon" 
          className="flex flex-col items-center justify-center h-14 w-14"
          onClick={() => setTab("housing")}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Housing</span>
        </Button>
        
        <Button 
          variant={tab === "messages" ? "default" : "ghost"} 
          size="icon" 
          className="flex flex-col items-center justify-center h-14 w-14"
          onClick={() => setTab("messages")}
        >
          <MessageCircle size={20} />
          <span className="text-xs mt-1">Messages</span>
        </Button>
        
        <Button 
          variant={tab === "resources" ? "default" : "ghost"} 
          size="icon" 
          className="flex flex-col items-center justify-center h-14 w-14"
          onClick={() => setTab("resources")}
        >
          <Compass size={20} />
          <span className="text-xs mt-1">Resources</span>
        </Button>
      </div>
    </div>
  );
};

export default ClientDashboard;