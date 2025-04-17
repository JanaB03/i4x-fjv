
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageContainer from '@/components/PageContainer';
import ConfidentialityAlert from '@/components/ConfidentialityAlert';
import MessageItem from '@/components/MessageItem';
import { useApp } from '@/context/AppContext';
import { Send, Users, UserPlus, User } from 'lucide-react';
import { Department } from '@/types';

const Messages: React.FC = () => {
  const { currentUser, users, sendMessage, departments, getConversation, getPublicMessages } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('general');
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const isStaff = currentUser.role === 'staff' || currentUser.role === 'admin';
  
  // For direct messages
  const conversations = users
    .filter(user => user.id !== currentUser.id)
    .filter(user => 
      // Staff can see clients
      (isStaff && user.role === 'client') || 
      // Clients can see staff
      (!isStaff && user.role === 'staff')
    );

  // Get current conversation
  const currentConversation = selectedUserId 
    ? getConversation(currentUser.id, selectedUserId)
    : getPublicMessages();

  // Filter departments for display
  const departmentsToDisplay = departments
    .filter(dept => dept.id !== 'general')
    .sort((a, b) => a.name.localeCompare(b.name));
  
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      if (selectedUserId) {
        // Direct message
        await sendMessage(newMessage, selectedUserId);
      } else {
        // Public message for department
        await sendMessage(newMessage, undefined, selectedDepartment, true);
      }
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const selectDepartment = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setSelectedUserId(undefined);
  };

  const selectUser = (userId: string) => {
    setSelectedUserId(userId);
  };
  
  return (
    <PageContainer>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Tabs defaultValue="departments">
            <TabsList className="w-full">
              <TabsTrigger value="departments" className="flex-1">
                <Users size={16} className="mr-1" /> Public
              </TabsTrigger>
              <TabsTrigger value="direct" className="flex-1">
                <User size={16} className="mr-1" /> Direct
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="departments" className="mt-2">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Departments</CardTitle>
                </CardHeader>
                <CardContent className="py-0 px-2">
                  <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-2">
                    <Button
                      variant={selectedDepartment === 'general' && !selectedUserId ? 'default' : 'ghost'}
                      className="w-full justify-start text-left"
                      onClick={() => selectDepartment('general')}
                    >
                      General
                    </Button>
                    
                    {departmentsToDisplay.map((dept) => (
                      <Button
                        key={dept.id}
                        variant={selectedDepartment === dept.id && !selectedUserId ? 'default' : 'ghost'}
                        className="w-full justify-start text-left"
                        onClick={() => selectDepartment(dept.id)}
                      >
                        {dept.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="direct" className="mt-2">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">{isStaff ? 'Clients' : 'Staff'}</CardTitle>
                </CardHeader>
                <CardContent className="py-0 px-2">
                  {conversations.length > 0 ? (
                    <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-2">
                      {conversations.map((user) => (
                        <Button
                          key={user.id}
                          variant={selectedUserId === user.id ? 'default' : 'ghost'}
                          className="w-full justify-start text-left"
                          onClick={() => selectUser(user.id)}
                        >
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2">
                              <span className="text-xs">{user.nickname[0]}</span>
                            </div>
                            <span>{user.nickname}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-muted-foreground">
                      <p>No contacts yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[75vh] flex flex-col">
            <CardHeader className="py-3 border-b">
              <CardTitle className="flex items-center text-lg">
                {selectedUserId ? (
                  <>
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center mr-2">
                      <span className="text-xs text-primary-foreground">
                        {users.find(u => u.id === selectedUserId)?.nickname[0]}
                      </span>
                    </div>
                    <span>{users.find(u => u.id === selectedUserId)?.nickname}</span>
                  </>
                ) : (
                  <>
                    <Users size={18} className="mr-2" />
                    {departments.find(d => d.id === selectedDepartment)?.name || 'General'} Chat
                  </>
                )}
              </CardTitle>
            </CardHeader>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
              {currentConversation.length > 0 ? (
                currentConversation.map((message) => (
                  <MessageItem 
                    key={message.id} 
                    message={message} 
                    isCurrentUser={message.senderId === currentUser.id}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Users size={48} strokeWidth={1} />
                  <p className="mt-4">No messages yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              )}
            </div>
            
            <ConfidentialityAlert className="mx-4 mb-2" />
            
            <div className="p-4 pt-2 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Messages;
