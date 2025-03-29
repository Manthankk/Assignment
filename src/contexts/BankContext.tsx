
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

export interface Transaction {
  id: number;
  userId: number;
  type: "deposit" | "withdrawal";
  amount: number;
  balance: number;
  date: string;
  description: string;
}

export interface Account {
  userId: number;
  userName: string;
  userEmail: string;
  balance: number;
  transactions: Transaction[];
}

interface BankContextType {
  customerAccounts: Account[];
  currentUserAccount: Account | null;
  transactions: Transaction[];
  selectedUserTransactions: Transaction[];
  deposit: (amount: number, description: string) => void;
  withdraw: (amount: number, description: string) => void;
  viewUserTransactions: (userId: number) => void;
  isLoading: boolean;
}

// Mock data for demonstration
const MOCK_ACCOUNTS: Account[] = [
  {
    userId: 1,
    userName: "John Doe",
    userEmail: "customer@example.com",
    balance: 5000,
    transactions: [
      {
        id: 1,
        userId: 1,
        type: "deposit",
        amount: 1000,
        balance: 1000,
        date: "2023-06-15T10:30:00Z",
        description: "Initial deposit"
      },
      {
        id: 2,
        userId: 1,
        type: "deposit",
        amount: 2500,
        balance: 3500,
        date: "2023-06-18T14:45:00Z",
        description: "Salary"
      },
      {
        id: 3,
        userId: 1,
        type: "withdrawal",
        amount: 500,
        balance: 3000,
        date: "2023-06-20T09:15:00Z",
        description: "ATM withdrawal"
      },
      {
        id: 4,
        userId: 1,
        type: "deposit",
        amount: 2000,
        balance: 5000,
        date: "2023-06-25T16:30:00Z",
        description: "Bonus payment"
      }
    ]
  },
  {
    userId: 3,
    userName: "Bob Johnson",
    userEmail: "customer2@example.com",
    balance: 2500,
    transactions: [
      {
        id: 5,
        userId: 3,
        type: "deposit",
        amount: 1500,
        balance: 1500,
        date: "2023-06-10T11:20:00Z",
        description: "Initial deposit"
      },
      {
        id: 6,
        userId: 3,
        type: "withdrawal",
        amount: 300,
        balance: 1200,
        date: "2023-06-12T15:10:00Z",
        description: "Online purchase"
      },
      {
        id: 7,
        userId: 3,
        type: "deposit",
        amount: 1300,
        balance: 2500,
        date: "2023-06-22T13:45:00Z",
        description: "Freelance payment"
      }
    ]
  }
];

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [customerAccounts, setCustomerAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [currentUserAccount, setCurrentUserAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedUserTransactions, setSelectedUserTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      // For customer role, load their own account
      if (user.role === "customer") {
        const account = customerAccounts.find(acc => acc.userId === user.id);
        if (account) {
          setCurrentUserAccount(account);
          setTransactions(account.transactions);
        }
      }
      // For banker role, they see all accounts but no specific transactions yet
      else if (user.role === "banker") {
        setTransactions([]);
      }
    } else {
      setCurrentUserAccount(null);
      setTransactions([]);
    }
  }, [user, customerAccounts]);

  const deposit = (amount: number, description: string) => {
    if (!user || user.role !== "customer" || !currentUserAccount) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newBalance = currentUserAccount.balance + amount;
      
      const newTransaction: Transaction = {
        id: Date.now(),
        userId: user.id,
        type: "deposit",
        amount,
        balance: newBalance,
        date: new Date().toISOString(),
        description
      };
      
      // Update current user account
      const updatedAccount = {
        ...currentUserAccount,
        balance: newBalance,
        transactions: [...currentUserAccount.transactions, newTransaction]
      };
      
      // Update all accounts
      const updatedAccounts = customerAccounts.map(acc => 
        acc.userId === user.id ? updatedAccount : acc
      );
      
      setCurrentUserAccount(updatedAccount);
      setCustomerAccounts(updatedAccounts);
      setTransactions([...transactions, newTransaction]);
      
      toast({
        title: "Deposit Successful",
        description: `$${amount.toFixed(2)} has been deposited to your account.`,
        variant: "default",
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  const withdraw = (amount: number, description: string) => {
    if (!user || user.role !== "customer" || !currentUserAccount) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (amount > currentUserAccount.balance) {
        toast({
          title: "Withdrawal Failed",
          description: "Insufficient funds for this withdrawal.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      const newBalance = currentUserAccount.balance - amount;
      
      const newTransaction: Transaction = {
        id: Date.now(),
        userId: user.id,
        type: "withdrawal",
        amount,
        balance: newBalance,
        date: new Date().toISOString(),
        description
      };
      
      // Update current user account
      const updatedAccount = {
        ...currentUserAccount,
        balance: newBalance,
        transactions: [...currentUserAccount.transactions, newTransaction]
      };
      
      // Update all accounts
      const updatedAccounts = customerAccounts.map(acc => 
        acc.userId === user.id ? updatedAccount : acc
      );
      
      setCurrentUserAccount(updatedAccount);
      setCustomerAccounts(updatedAccounts);
      setTransactions([...transactions, newTransaction]);
      
      toast({
        title: "Withdrawal Successful",
        description: `$${amount.toFixed(2)} has been withdrawn from your account.`,
        variant: "default",
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  const viewUserTransactions = (userId: number) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const account = customerAccounts.find(acc => acc.userId === userId);
      if (account) {
        setSelectedUserTransactions(account.transactions);
      } else {
        setSelectedUserTransactions([]);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <BankContext.Provider 
      value={{ 
        customerAccounts, 
        currentUserAccount, 
        transactions, 
        selectedUserTransactions,
        deposit, 
        withdraw, 
        viewUserTransactions, 
        isLoading 
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  
  if (context === undefined) {
    throw new Error("useBank must be used within a BankProvider");
  }
  
  return context;
};
