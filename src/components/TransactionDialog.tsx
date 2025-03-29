
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBank } from "@/contexts/BankContext";
import { AlertCircle } from "lucide-react";

interface TransactionDialogProps {
  type: "deposit" | "withdrawal";
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({ 
  type, 
  isOpen, 
  onClose 
}) => {
  const { currentUserAccount, deposit, withdraw, isLoading } = useBank();
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
      setError("");
    }
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    
    if (type === "withdrawal" && currentUserAccount && numAmount > currentUserAccount.balance) {
      setError("Insufficient funds for this withdrawal");
      return;
    }
    
    if (type === "deposit") {
      deposit(numAmount, description);
    } else {
      withdraw(numAmount, description);
    }
    
    // Reset form and close dialog
    setAmount("");
    setDescription("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {type === "deposit" ? "Deposit Money" : "Withdraw Money"}
          </DialogTitle>
          <DialogDescription>
            {type === "deposit" 
              ? "Add funds to your account" 
              : "Withdraw funds from your account"}
            {currentUserAccount && (
              <div className="mt-2 p-2 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-lg font-semibold text-gray-800">
                  ${currentUserAccount.balance.toFixed(2)}
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="pl-8"
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={type === "deposit" ? "E.g., Salary, Gift" : "E.g., Groceries, Rent"}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className={type === "deposit" ? "bg-bank-primary hover:bg-bank-secondary" : ""}
          >
            {isLoading ? "Processing..." : type === "deposit" ? "Deposit" : "Withdraw"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
