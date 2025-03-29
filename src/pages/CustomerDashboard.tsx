
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBank } from "@/contexts/BankContext";
import NavBar from "@/components/NavBar";
import TransactionDialog from "@/components/TransactionDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewTab from "@/components/dashboard/OverviewTab";
import ActivityTab from "@/components/dashboard/ActivityTab";
import TransactionsTab from "@/components/dashboard/TransactionsTab";

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { currentUserAccount, transactions } = useBank();
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure animations trigger after component mounts
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return null; // or redirect to login
  }

  return (
    <div className="min-h-screen custom-gradient-bg">
      <NavBar />
      
      <main className={`container mx-auto px-4 py-6 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <DashboardHeader 
          userName={user.name}
          onDeposit={() => setIsDepositOpen(true)}
          onWithdraw={() => setIsWithdrawOpen(true)}
        />
        
        <Tabs 
          defaultValue="overview" 
          className="mb-6" 
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-6">
            <TabsList className="custom-tabs-list">
              <TabsTrigger value="overview" className="custom-tab">Overview</TabsTrigger>
              <TabsTrigger value="activity" className="custom-tab">Activity</TabsTrigger>
              <TabsTrigger value="transactions" className="custom-tab">Transactions</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="transition-all duration-500 ease-in-out">
            <OverviewTab 
              currentUserAccount={currentUserAccount}
              transactions={transactions}
              onDeposit={() => setIsDepositOpen(true)}
              onWithdraw={() => setIsWithdrawOpen(true)}
            />
          </TabsContent>
          
          <TabsContent value="activity" className="transition-all duration-500 ease-in-out">
            <ActivityTab 
              currentUserAccount={currentUserAccount}
              transactions={transactions}
            />
          </TabsContent>
          
          <TabsContent value="transactions" className="transition-all duration-500 ease-in-out">
            <TransactionsTab transactions={transactions} />
          </TabsContent>
        </Tabs>
      </main>
      
      <TransactionDialog
        type="deposit"
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />
      
      <TransactionDialog
        type="withdrawal"
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />
    </div>
  );
};

export default CustomerDashboard;
