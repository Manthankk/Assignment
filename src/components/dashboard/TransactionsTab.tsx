
import React, { useState } from "react";
import { Transaction } from "@/contexts/BankContext";
import TransactionsList from "@/components/TransactionsList";
import { ArrowDownLeft, ArrowUpRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionsTabProps {
  transactions: Transaction[];
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<"all" | "deposits" | "withdrawals">("all");
  
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "all") return true;
    if (filter === "deposits") return transaction.type === "deposit";
    if (filter === "withdrawals") return transaction.type === "withdrawal";
    return true;
  });

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className={filter === "all" ? "bg-gradient-to-r from-blue-600 to-blue-700" : ""}
          >
            <Filter className="mr-1 h-4 w-4" />
            All
          </Button>
          
          <Button 
            onClick={() => setFilter("deposits")}
            variant={filter === "deposits" ? "default" : "outline"}
            size="sm"
            className={filter === "deposits" ? "bg-gradient-to-r from-green-600 to-green-700" : ""}
          >
            <ArrowDownLeft className="mr-1 h-4 w-4" />
            Deposits
          </Button>
          
          <Button 
            onClick={() => setFilter("withdrawals")}
            variant={filter === "withdrawals" ? "default" : "outline"}
            size="sm"
            className={filter === "withdrawals" ? "bg-gradient-to-r from-red-600 to-red-700" : ""}
          >
            <ArrowUpRight className="mr-1 h-4 w-4" />
            Withdrawals
          </Button>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-custom border border-gray-100">
        <TransactionsList 
          transactions={filteredTransactions} 
          title={`${filter === "all" ? "All" : filter === "deposits" ? "Deposit" : "Withdrawal"} Transactions`} 
        />
      </div>
    </div>
  );
};

export default TransactionsTab;
