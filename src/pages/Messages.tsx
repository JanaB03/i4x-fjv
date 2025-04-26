import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Search, Image, Paperclip, Mic, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Messages: React.FC = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const mockChats = [
    { id: '1', name: 'Street Health', lastMessage: 'You: That sounds great!...' },
    { id: '2', name: 'Day Center', lastMessage: 'Paul: Today\'s lunch will be...' }
  ];

  return (
    <PageContainer>
      <div className="flex flex-col">
        {/* CommuniCare-style header - Optional, can be commented out if it conflicts with PageContainer */}
        {/* 
        <div className="bg-blue-900 text-white p-2 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-500">CommuniCare</div>
          <div className="flex gap-4">
            <span>Resources</span>
            <span>Map</span>
            <span>Chat</span>
            <span>Logout</span>
          </div>
        </div>
        */}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Chats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    className="w-full pl-8 py-1 text-sm" 
                    placeholder="Search chats" 
                  />
                </div>
                
                {mockChats.map(chat => (
                  <div 
                    key={chat.id}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer mb-1"
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-gray-500 text-white">
                        {chat.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <div className="font-medium text-sm">{chat.name}</div>
                      <div className="text-xs text-gray-600 truncate">{chat.lastMessage}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Right chat area */}
          <div className="lg:col-span-3">
            <Card className="h-[75vh] flex flex-col">
              <CardHeader className="py-3 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-gray-500 text-white">S</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">Street Health</CardTitle>
                </div>
              </CardHeader>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="text-center text-xs text-gray-500 my-2">
                  May 19, 2023
                </div>
                
                {/* Sample message from them */}
                <div className="flex mb-4">
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarFallback className="bg-gray-400 text-white">J</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[60%]">
                    <p className="text-sm">Hi James! I wanted to check in and remind you that your next appointment is this Friday, 5/22. Still available to meet?</p>
                  </div>
                </div>
                
                {/* Sample message from user */}
                <div className="flex justify-end mb-4">
                  <div className="bg-blue-100 rounded-lg rounded-tr-none p-3 max-w-[60%]">
                    <p className="text-sm">That sounds great! See you then!</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2 border-t flex">
                <div className="flex gap-1 mr-2">
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <Image size={18} />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <MapPin size={18} />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip size={18} />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <Mic size={18} />
                  </Button>
                </div>
                
                <div className="flex-1 flex">
                  <Input
                    className="flex-1 rounded-l-full rounded-r-none border-r-0"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button 
                    className="rounded-l-none rounded-r-full bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Messages;