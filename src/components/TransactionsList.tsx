
import React from "react";
import { Transaction } from "@/contexts/BankContext";
import { BadgeCheck, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TransactionsListProps {
  transactions: Transaction[];
  title?: string;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions,
  title = "Recent Transactions" 
}) => {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm animate-fade-in">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      
      <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
        {sortedTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <BadgeCheck className="mx-auto h-12 w-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-medium text-gray-600">No transactions yet</h3>
            <p className="text-gray-500 mt-1">Your transaction history will appear here</p>
          </div>
        ) : (
          sortedTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item p-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  transaction.type === "deposit" 
                    ? "bg-green-100 text-green-600" 
                    : "bg-red-100 text-red-600"
                }`}>
                  {transaction.type === "deposit" ? (
                    <ArrowDownLeft className="h-5 w-5" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {transaction.description || 
                      (transaction.type === "deposit" ? "Deposit" : "Withdrawal")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className={`font-semibold ${
                  transaction.type === "deposit" 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {transaction.type === "deposit" ? "+" : "-"}
                  ${transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Balance: ${transaction.balance.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
