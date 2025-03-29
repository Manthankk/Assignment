
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "banker";
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "customer" | "banker") => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "customer@example.com",
    password: "password",
    role: "customer",
    balance: 5000,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "banker@example.com",
    password: "password",
    role: "banker",
    balance: 0,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "customer2@example.com",
    password: "password",
    role: "customer",
    balance: 2500,
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("bankUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const generateAccessToken = () => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const login = (email: string, password: string, role: "customer" | "banker") => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser = MOCK_USERS.find(
        u => u.email === email && u.password === password && u.role === role
      );

      if (mockUser) {
        const accessToken = generateAccessToken();
        const authenticatedUser = {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role as "customer" | "banker",
          accessToken
        };

        setUser(authenticatedUser);
        localStorage.setItem("bankUser", JSON.stringify(authenticatedUser));
        
        toast({
          title: "Logged in successfully",
          description: `Welcome back, ${mockUser.name}!`,
          variant: "default",
        });

        // Redirect based on role
        if (role === "customer") {
          navigate("/dashboard");
        } else {
          navigate("/banker-dashboard");
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bankUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
