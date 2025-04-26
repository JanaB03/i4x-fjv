import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Announcements from "./pages/Announcements";
import Locations from "./pages/Locations";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Configure API base URL
export const API_URL = 'http://localhost:5000/api';

// Create a custom hook to verify authentication on app start
const useAuthCheck = () => {
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Optional: You can set up a verification endpoint
      // This isn't required for initial implementation
      console.log("Found existing auth token");
    }
  }, []);
  
  return null;
};

// Create an AuthWrapper component to handle auth check
const AuthWrapper = ({ children }) => {
  useAuthCheck();
  return children;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <AuthWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthWrapper>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;