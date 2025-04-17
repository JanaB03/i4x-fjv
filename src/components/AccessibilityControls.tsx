
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Type, Globe, VolumeX, Volume2 } from 'lucide-react';

const AccessibilityControls: React.FC = () => {
  const [fontSize, setFontSize] = useState('normal');
  const [language, setLanguage] = useState('en');
  const [muted, setMuted] = useState(true);

  // Apply font size to body
  useEffect(() => {
    document.body.classList.remove('text-large', 'text-xl', 'text-xxl');
    if (fontSize !== 'normal') {
      document.body.classList.add(fontSize);
    }
  }, [fontSize]);

  // This would connect to a real translation service in production
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // In a real app, we would update the UI language
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-secondary p-2 rounded-lg">
      <div className="flex items-center gap-1">
        <Type size={18} className="text-muted-foreground" />
        <Select value={fontSize} onValueChange={setFontSize}>
          <SelectTrigger className="h-8 w-28">
            <SelectValue placeholder="Font Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="text-large">Large</SelectItem>
            <SelectItem value="text-xl">X-Large</SelectItem>
            <SelectItem value="text-xxl">XX-Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <Globe size={18} className="text-muted-foreground" />
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="h-8 w-28">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8" 
        onClick={toggleMute}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </Button>
    </div>
  );
};

export default AccessibilityControls;
