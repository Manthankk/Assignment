
import React from "react";
import { Account, Transaction } from "@/contexts/BankContext";
import BalanceCard from "@/components/BalanceCard";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import { Activity, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewTabProps {
  currentUserAccount: Account | null;
  transactions: Transaction[];
  onDeposit: () => void;
  onWithdraw: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  currentUserAccount, 
  transactions,
  onDeposit,
  onWithdraw
}) => {
  const totalDeposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalWithdrawals = transactions
    .filter(t => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const transactionData = [
    { name: "Deposits", value: totalDeposits, color: "#3B82F6" },
    { name: "Withdrawals", value: totalWithdrawals, color: "#EF4444" }
  ].filter(item => item.value > 0);

  const recentActivity = {
    lastTransaction: transactions.length > 0 ? 
      transactions[0].amount.toFixed(2) : "0.00",
    avgTransaction: transactions.length > 0 ? 
      (transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toFixed(2) : "0.00",
    transactionCount: transactions.length
  };

  return (
    <div className="grid gap-6 md:grid-cols-4 animate-fade-in">
      <div className="md:col-span-2">
        <BalanceCard
          account={currentUserAccount}
          onDeposit={onDeposit}
          onWithdraw={onWithdraw}
        />
      </div>
      
      <QuickStatsCard recentActivity={recentActivity} />
      <TransactionSummaryCard transactionData={transactionData} />
    </div>
  );
};

interface QuickStatsCardProps {
  recentActivity: {
    lastTransaction: string;
    avgTransaction: string;
    transactionCount: number;
  };
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ recentActivity }) => {
  return (
    <Card className="dashboard-card glass-card animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Activity className="mr-2 h-5 w-5 text-blue-500" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">Last Transaction</div>
          <div className="font-medium">${recentActivity.lastTransaction}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">Avg. Transaction</div>
          <div className="font-medium">${recentActivity.avgTransaction}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">Total Transactions</div>
          <div className="font-medium">{recentActivity.transactionCount}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TransactionSummaryCardProps {
  transactionData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const TransactionSummaryCard: React.FC<TransactionSummaryCardProps> = ({ transactionData }) => {
  return (
    <Card className="dashboard-card glass-card animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Activity className="mr-2 h-5 w-5 text-blue-500" />
          Transaction Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactionData.length > 0 ? (
          <div className="h-[200px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  animationDuration={1000}
                  animationBegin={200}
                >
                  {transactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => {
                    return typeof value === 'number' 
                      ? [`$${value.toFixed(2)}`, null]
                      : [`$${value}`, null];
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <p className="text-gray-500 mb-2">No transaction data yet</p>
            <div className="flex space-x-3 mt-2">
              <div className="flex items-center">
                <ArrowDownLeft className="h-5 w-5 text-blue-500 mr-1" />
                <span className="text-sm">Deposits</span>
              </div>
              <div className="flex items-center">
                <ArrowUpRight className="h-5 w-5 text-red-500 mr-1" />
                <span className="text-sm">Withdrawals</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
