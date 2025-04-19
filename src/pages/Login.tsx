import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Loader2, KeyRound, HandHeart, Users } from 'lucide-react';
import PageContainer from '@/components/PageContainer';
import AccessibilityControls from '@/components/AccessibilityControls';

const Login: React.FC = () => {
  const { login, isLoading, error } = useApp();
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim()) {
      const success = await login(accessCode.trim());
      if (success) {
        navigate('/');
      }
    }
  };

  // Demo login helpers
  const loginAsClient = async () => {
    const success = await login('1234');
    if (success) navigate('/');
  };

  const loginAsStaff = async () => {
    const success = await login('staff1');
    if (success) navigate('/');
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="border-blue-200 shadow-md bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 py-6 px-4 text-center">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <HandHeart size={32} className="text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome to BridgeGap</h1>
            <p className="text-blue-100">Connecting you with support services</p>
          </div>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center mb-4">
                <h2 className="text-xl font-medium text-blue-800">Enter Your Access Code</h2>
                <p className="text-gray-600 text-sm">Please enter the code given to you by staff</p>
              </div>
            
              <div className="relative">
                <Input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  autoComplete="off"
                  placeholder="Your access code here"
                  autoFocus
                  required
                  className="border-blue-200 focus:border-blue-400 text-xl py-6 text-center"
                />
              </div>
              
              {error && (
                <div className="bg-red-100 p-4 rounded-md text-red-700 text-center">
                  <p>That code didn't work. Please try again or ask staff for help.</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white text-xl py-7"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">Need help?</p>
              <p className="text-blue-800 font-medium">Ask any staff member for assistance</p>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 p-4 flex flex-col space-y-4">
            <div className="w-full">
              <p className="text-sm text-center text-blue-800 mb-2">For Demonstration Purposes</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loginAsClient} 
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 flex items-center"
                >
                  <Users size={16} className="mr-1" />
                  Client Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loginAsStaff} 
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 flex items-center"
                >
                  <KeyRound size={16} className="mr-1" />
                  Staff Demo
                </Button>
              </div>
            </div>
            
            <div className="w-full pt-2">
              <AccessibilityControls />
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Login;