
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail } from "lucide-react";

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "banker">("customer");
  const [showWelcome, setShowWelcome] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (email.includes('@')) {
      const name = email.split('@')[0];
      // Capitalize first letter and extract what appears to be a name
      const formattedName = name
        .split(/[._-]/)
        .filter(part => part.length > 0)[0]
        .charAt(0).toUpperCase() + 
        name.split(/[._-]/)[0].slice(1);
      
      setFirstName(formattedName);
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bank-light to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bank-primary mb-2">TransactoExpress</h1>
          <p className="text-gray-600">Your secure banking solution</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Tabs defaultValue="customer" className="w-full" onValueChange={(value) => setRole(value as "customer" | "banker")}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="customer">Customer Login</TabsTrigger>
              <TabsTrigger value="banker">Banker Login</TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="customer">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Login
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Access your accounts and manage your finances
                </p>
              </TabsContent>
              
              <TabsContent value="banker">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Banker Login
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Staff access to manage customer accounts
                </p>
              </TabsContent>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  
                  {showWelcome && (
                    <div className="text-bank-primary text-sm mt-1 animate-fade-in">
                      Welcome, {firstName}! Please enter your password to continue.
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-bank-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-bank-primary hover:bg-bank-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
              
              {role === "customer" && (
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    Demo Account: customer@example.com / password
                  </p>
                </div>
              )}
              
              {role === "banker" && (
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    Demo Account: banker@example.com / password
                  </p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
