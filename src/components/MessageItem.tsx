import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MessageItem from '@/components/MessageItem';
import { useApp } from '@/context/AppContext';
import { 
  Send, 
  Search, 
  Menu, 
  Image, 
  MapPin, 
  Paperclip, 
  Mic, 
  Phone,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { format } from 'date-fns';

const Messages: React.FC = () => {
  const { currentUser, users, sendMessage, departments, getConversation, getPublicMessages } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [activeChat, setActiveChat] = useState('1');
  const navigate = useNavigate();
  const messageEndRef = useRef<HTMLDivElement>(null);

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
    : [];
  
  // Format conversations as chats
  const chats = conversations.map(user => {
    const conversationMessages = getConversation(currentUser.id, user.id);
    const lastMessage = conversationMessages.length > 0 ? conversationMessages[0] : null;
    
    return {
      id: user.id,
      name: user.nickname,
      lastMessage: lastMessage ? 
        `${lastMessage.senderId === currentUser.id ? 'You: ' : ''}${lastMessage.content}` : 
        'No messages yet',
      indicator: false
    };
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      if (selectedUserId) {
        // Direct message
        await sendMessage(newMessage, selectedUserId);
      } else if (activeChat) {
        // Find user from chats and send message
        await sendMessage(newMessage, activeChat);
      }
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation]);

  // Set selected user based on active chat
  useEffect(() => {
    if (activeChat) {
      setSelectedUserId(activeChat);
    }
  }, [activeChat]);

  // Get current chat details
  const currentChat = chats.find(chat => chat.id === activeChat) || {
    id: '0',
    name: 'Chat',
    lastMessage: '',
    indicator: false
  };
  
  return (
    <div className="min-h-screen bg-blue-900">
      <div className="flex flex-col h-screen max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center bg-blue-900 text-white p-2">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-500">CommuniCare</h1>
            <div className="ml-2 text-yellow-400">⚛️</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white">
              <BookOpen className="mr-1" size={20} />
              Resources
            </Button>
            
            <Button variant="ghost" className="text-white">
              <MapPin className="mr-1" size={20} />
              Map
            </Button>
            
            <Button variant="ghost" className="text-white">
              <MessageSquare className="mr-1" size={20} />
              Chat
            </Button>
            
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              Logout
              <Avatar className="h-6 w-6 ml-2">
                <AvatarFallback>{currentUser.nickname[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex-1 p-2 flex gap-2">
          {/* Chats Sidebar */}
          <div className="w-1/4">
            <div className="flex flex-col h-full bg-gray-100 rounded-lg p-3">
              <h2 className="text-xl font-bold mb-3">Chats</h2>
              
              <div className="relative mb-3">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  className="w-full pl-8 py-1 text-sm" 
                  placeholder="Search chats" 
                />
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {chats.map((chat) => (
                  <div 
                    key={chat.id}
                    className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${
                      activeChat === chat.id ? "bg-white" : "hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-gray-500 text-white">
                        {chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm">{chat.name}</h3>
                        {chat.indicator && (
                          <span className="h-2 w-2 rounded-full bg-yellow-500 mt-1"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="w-3/4 bg-white rounded-lg shadow overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center p-3 border-b">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-gray-500 text-white">
                    {currentChat.name[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-medium">{currentChat.name}</h2>
              </div>
              
              <Button variant="ghost" size="icon" className="ml-2">
                <Phone size={18} />
              </Button>
              
              <div className="ml-auto">
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {currentConversation.length > 0 ? (
                <>
                  <div className="text-center text-xs text-gray-500 my-2">
                    {format(new Date(currentConversation[0].createdAt), 'MMMM d, yyyy')}
                  </div>
                  
                  {currentConversation.map((message) => (
                    <MessageItem 
                      key={message.id} 
                      message={message} 
                      isCurrentUser={message.senderId === currentUser.id}
                    />
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No messages yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>
            
            {/* Message Input */}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  className="rounded-l-none rounded-r-full bg-blue-100 text-blue-800 hover:bg-blue-200"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;