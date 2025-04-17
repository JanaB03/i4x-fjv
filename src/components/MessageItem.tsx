
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, AlertCircle } from 'lucide-react';
import { Message } from '@/types';
import { useApp } from '@/context/AppContext';
import { format } from 'date-fns';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  const { deleteMessage, currentUser } = useApp();
  const [isDeleting, setIsDeleting] = useState(false);
  
  if (message.isDeleted) {
    return (
      <Card className="max-w-[80%] bg-muted/50 mx-auto my-2">
        <CardContent className="p-3">
          <p className="text-muted-foreground italic text-sm">This message was deleted</p>
        </CardContent>
      </Card>
    );
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this message? This cannot be undone.')) {
      setIsDeleting(true);
      await deleteMessage(message.id);
      setIsDeleting(false);
    }
  };

  const canDelete = isCurrentUser || (currentUser?.role === 'admin');
  
  return (
    <Card className={`max-w-[80%] ${isCurrentUser ? 'ml-auto bg-primary text-primary-foreground' : 'mr-auto bg-secondary'} my-2`}>
      <CardContent className="p-3">
        {!isCurrentUser && message.department && (
          <div className="mb-1 text-xs font-medium">{message.department}</div>
        )}
        {!isCurrentUser && (
          <div className="mb-1 font-medium">{message.senderNickname}</div>
        )}
        <p>{message.content}</p>
      </CardContent>
      <CardFooter className={`flex ${isCurrentUser ? 'justify-between' : 'justify-end'} p-1 px-3 text-xs text-muted-foreground`}>
        <span>{format(new Date(message.createdAt), 'MMM d, h:mm a')}</span>
        {canDelete && (
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 ${isCurrentUser ? 'text-primary-foreground/70 hover:text-primary-foreground/90' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MessageItem;
