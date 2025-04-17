
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import AccessibilityControls from '@/components/AccessibilityControls';
import { Loader2 } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-fjv-purple mb-2">BridgeGap</h1>
        <p className="text-muted-foreground">Father Joe's Villages Connect</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your access code to connect with services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="accessCode">Access Code</Label>
                <Input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter your access code"
                  required
                />
              </div>
              
              {error && (
                <div className="bg-destructive/10 text-destructive p-2 rounded text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground">
            Don't have an access code? Visit any Father Joe's Villages location or contact an outreach worker.
          </div>
          
          <div className="w-full border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2 text-center">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={loginAsClient}>
                Client Demo
              </Button>
              <Button variant="outline" size="sm" onClick={loginAsStaff}>
                Staff Demo
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-6">
        <AccessibilityControls />
      </div>
    </div>
  );
};

export default Login;
