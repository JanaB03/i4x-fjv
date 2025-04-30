import React, { useState } from 'react';
import { User, Trash2, Phone, Send, Image, MapPin, Mic } from 'lucide-react';

interface MessagesScreenProps {
  goBack: () => void;
  userView: string;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ goBack, userView }) => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data
  const contacts = [
    { id: 1, name: 'Street Health', role: 'staff', subtitle: 'Hey! How can we assist you today?', unread: 0 },
    { id: 2, name: 'Day Center', role: 'staff', subtitle: 'Food, shower, and laundry will be available tomorrow', unread: 0 }
  ];
  
  // Mock messages for Street Health
  const mockMessages = [
    { id: 1, sender: 'them', text: 'Hi James! I wanted to check in and remind you that your next appointment is this Friday, 5/22. Still available to meet?', time: 'May 19, 2023' },
    { id: 2, sender: 'me', text: 'That sounds great! See you then!', time: '10:45 AM' }
  ];
  
  const [messages, setMessages] = useState(mockMessages);
  
  const handleDeleteMessage = (messageId: number) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'me',
          text: newMessage,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
      setNewMessage('');
    }
  };
  
  return (
    <div className="py-8 md:mb-0 mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex h-[calc(70vh)]">
            <div className="w-1/3 border-r">
              <div className="p-4 border-b">
                <h2 className="font-bold text-lg">Chats</h2>
                <div className="relative mt-3">
                  <input
                    type="text"
                    placeholder="Search chats"
                    className="w-full py-2 px-3 bg-gray-100 rounded-md text-sm pl-8"
                  />
                  <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(70vh-5rem)]">
                {contacts.map(contact => (
                  <div 
                    key={contact.id}
                    className="border-b p-3 flex items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User size={18} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{contact.name}</div>
                      <div className="text-sm text-gray-500 truncate">{contact.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b flex items-center">
                <div className="w-10 h-10 bg-[#FF7F50] rounded-full flex items-center justify-center mr-3">
                  <User size={18} className="text-white" />
                </div>
                <div className="font-bold text-lg">Street Health</div>
                <div className="ml-auto flex">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} relative group`}
                  >
                    {message.sender === 'them' && (
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2 flex-shrink-0 self-end">
                          <User size={18} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{message.time}</div>
                          <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs relative">
                            {message.text}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {message.sender === 'me' && (
                      <div className="flex items-start">
                        <div>
                          <div className="text-xs text-gray-500 mb-1 text-right">{message.time}</div>
                          <div className="bg-[#FFE2C9] p-3 rounded-lg shadow-sm max-w-xs relative">
                            {message.text}
                            {/* Delete button */}
                            <button 
                              onClick={() => handleDeleteMessage(message.id)}
                              className="absolute right-0 top-0 -mt-2 -mr-2 bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-[#FF7F50] rounded-full flex items-center justify-center ml-2 flex-shrink-0 self-end">
                          <div className="text-white font-bold text-sm">T</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t flex items-center">
                <button className="p-2 text-gray-500">
                  <DarkModeIcon size={20} />
                </button>
                <div className="flex-1 flex mx-2 bg-gray-100 rounded-md">
                  <button className="p-2 text-gray-500">
                    <Image size={20} />
                  </button>
                  <button className="p-2 text-gray-500">
                    <MapPin size={20} />
                  </button>
                  <button className="p-2 text-gray-500">
                    <Mic size={20} />
                  </button>
                  <input
                    type="text"
                    className="flex-1 bg-transparent py-2 px-3 outline-none"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  className="p-2 text-[#FF7F50]"
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Icons
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const DarkModeIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

export { SearchIcon, DarkModeIcon };
export default MessagesScreen;