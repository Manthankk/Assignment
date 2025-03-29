
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BankProvider } from "@/contexts/BankContext";
import { useState } from "react";

import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import BankerDashboard from "./pages/BankerDashboard";
import NotFound from "./pages/NotFound";

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode;
  requiredRole?: "customer" | "banker";
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return user.role === "customer" 
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/banker-dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={
        user ? (
          user.role === "customer" 
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/banker-dashboard" replace />
        ) : (
          <Index />
        )
      } />
      <Route path="/login" element={
        user ? (
          user.role === "customer" 
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/banker-dashboard" replace />
        ) : (
          <LoginPage />
        )
      } />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/banker-dashboard" 
        element={
          <ProtectedRoute requiredRole="banker">
            <BankerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Move the QueryClient initialization inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <AuthProvider>
            <BankProvider>
              <AppRoutes />
              <Toaster />
              <Sonner />
            </BankProvider>
          </AuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
