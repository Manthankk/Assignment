
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Account } from "@/contexts/BankContext";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AccountCardProps {
  account: Account;
  onViewTransactions: (userId: number) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onViewTransactions }) => {
  const initials = account.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-bank-primary/10 text-bank-primary">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-800">{account.userName}</p>
              <p className="text-sm text-gray-500">{account.userEmail}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Balance</p>
            <p className="font-semibold">${account.balance.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 flex justify-end">
          <Button 
            size="sm" 
            variant="outline"
            className="text-bank-primary"
            onClick={() => onViewTransactions(account.userId)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
