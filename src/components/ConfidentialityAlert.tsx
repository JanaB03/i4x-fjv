
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert';

interface ConfidentialityAlertProps {
  className?: string;
}

const ConfidentialityAlert: React.FC<ConfidentialityAlertProps> = ({ className = '' }) => {
  return (
    <Alert variant="default" className={`bg-muted/50 ${className}`}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Privacy Reminder</AlertTitle>
      <AlertDescription>
        For your safety, avoid sharing personal details like your full name, exact location, 
        or contact information. Messages are encrypted but not 100% secure.
      </AlertDescription>
    </Alert>
  );
};

export default ConfidentialityAlert;
