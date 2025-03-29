
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBank } from "@/contexts/BankContext";
import NavBar from "@/components/NavBar";
import AccountCard from "@/components/AccountCard";
import TransactionsList from "@/components/TransactionsList";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const BankerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { customerAccounts, selectedUserTransactions, viewUserTransactions } = useBank();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  if (!user) {
    return null; // or redirect to login
  }

  const filteredAccounts = customerAccounts.filter(account => 
    account.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTransactions = (userId: number) => {
    viewUserTransactions(userId);
    setSelectedAccount(userId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Banker Dashboard</h1>
        
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="accounts" className="flex-1">Customer Accounts</TabsTrigger>
            <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-6 animate-fade-in">
            <Card className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Card>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <AccountCard
                    key={account.userId}
                    account={account}
                    onViewTransactions={handleViewTransactions}
                  />
                ))
              ) : (
                <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-sm">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No accounts found</h3>
                  <p className="text-gray-500">
                    {searchTerm ? "Try a different search term" : "There are no customer accounts yet"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="animate-fade-in">
            {selectedAccount ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {customerAccounts.find(a => a.userId === selectedAccount)?.userName}'s Transactions
                </h2>
                <TransactionsList 
                  transactions={selectedUserTransactions} 
                  title="All Transactions"
                />
              </>
            ) : (
              <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-gray-600 mb-2">No customer selected</h3>
                <p className="text-gray-500">
                  Select a customer from the accounts tab to view their transactions
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BankerDashboard;
