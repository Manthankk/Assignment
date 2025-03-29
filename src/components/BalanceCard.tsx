
import React from "react";
import { Eye, EyeOff, Wallet } from "lucide-react";
import { Account } from "@/contexts/BankContext";
import { Button } from "@/components/ui/button";

interface BalanceCardProps {
  account: Account | null;
  onDeposit: () => void;
  onWithdraw: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  account, 
  onDeposit, 
  onWithdraw 
}) => {
  const [showBalance, setShowBalance] = React.useState(true);

  if (!account) {
    return (
      <div className="dashboard-card animate-pulse">
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 w-2/3 bg-gray-300 rounded mb-6"></div>
        <div className="flex space-x-4">
          <div className="h-10 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-10 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Current Balance</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBalance(!showBalance)}
          className="h-8 w-8"
        >
          {showBalance ? (
            <EyeOff className="h-5 w-5 text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-600" />
          )}
        </Button>
      </div>
      <div className="flex items-center mb-6">
        <Wallet className="h-7 w-7 text-bank-primary mr-3" />
        <div className="balance-text">
          {showBalance ? (
            <span className="animate-fade-in">${account.balance.toFixed(2)}</span>
          ) : (
            <span className="animate-fade-in">••••••</span>
          )}
        </div>
      </div>
      <div className="flex space-x-4">
        <Button 
          className="w-1/2 bg-bank-primary hover:bg-bank-secondary"
          onClick={onDeposit}
        >
          Deposit
        </Button>
        <Button 
          className="w-1/2 bg-gray-600 hover:bg-gray-700"
          onClick={onWithdraw}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default BalanceCard;
