
import React from "react";
import { Account, Transaction } from "@/contexts/BankContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Activity, Clock, CreditCard, DollarSign } from "lucide-react";

interface ActivityTabProps {
  currentUserAccount: Account | null;
  transactions: Transaction[];
}

const ActivityTab: React.FC<ActivityTabProps> = ({ currentUserAccount, transactions }) => {
  const totalDeposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalWithdrawals = transactions
    .filter(t => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const activityData = last7Days.map(date => {
    const dayDeposits = transactions
      .filter(t => t.type === "deposit" && t.date.split('T')[0] === date)
      .reduce((sum, t) => sum + t.amount, 0);
      
    const dayWithdrawals = transactions
      .filter(t => t.type === "withdrawal" && t.date.split('T')[0] === date)
      .reduce((sum, t) => sum + t.amount, 0);
      
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      deposits: dayDeposits,
      withdrawals: dayWithdrawals
    };
  });

  return (
    <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
      <div className="md:col-span-2">
        <ActivityOverviewCard activityData={activityData} />
      </div>
      
      <div className="space-y-6">
        <BalanceOverviewCard 
          balance={currentUserAccount?.balance || 0} 
          totalDeposits={totalDeposits} 
          totalWithdrawals={totalWithdrawals} 
        />
        <AccountDetailsCard currentUserAccount={currentUserAccount} />
      </div>
    </div>
  );
};

interface ActivityOverviewCardProps {
  activityData: Array<{
    date: string;
    deposits: number;
    withdrawals: number;
  }>;
}

const ActivityOverviewCard: React.FC<ActivityOverviewCardProps> = ({ activityData }) => {
  return (
    <Card className="dashboard-card glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Activity className="mr-2 h-5 w-5 text-blue-500" />
          Activity Overview
        </CardTitle>
        <CardDescription>Your financial activity over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${Number(value).toFixed(2)}`, null]}
              />
              <Bar 
                dataKey="deposits" 
                name="Deposits" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="withdrawals" 
                name="Withdrawals" 
                fill="#EF4444" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

interface BalanceOverviewCardProps {
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
}

const BalanceOverviewCard: React.FC<BalanceOverviewCardProps> = ({ 
  balance, 
  totalDeposits, 
  totalWithdrawals 
}) => {
  return (
    <Card className="dashboard-card glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-blue-500" />
          Balance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-800">
          ${balance.toFixed(2)}
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: {new Date().toLocaleString()}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-blue-500 text-sm font-medium">Deposits</div>
            <div className="text-gray-800 font-bold mt-1">${totalDeposits.toFixed(2)}</div>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <div className="text-red-500 text-sm font-medium">Withdrawals</div>
            <div className="text-gray-800 font-bold mt-1">${totalWithdrawals.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface AccountDetailsCardProps {
  currentUserAccount: Account | null;
}

const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({ currentUserAccount }) => {
  return (
    <Card className="dashboard-card glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
          Account Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Account ID</div>
            <div className="font-medium">{currentUserAccount?.userId || "N/A"}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Account Type</div>
            <div className="font-medium">Checking</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Status</div>
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Active</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTab;
