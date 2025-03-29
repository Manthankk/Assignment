
import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  onDeposit: () => void;
  onWithdraw: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  onDeposit, 
  onWithdraw 
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent">
        Welcome back, {userName}
      </h1>
      
      <div className="flex space-x-3 mt-4 sm:mt-0">
        <button 
          onClick={onDeposit}
          className="button-gradient text-white px-4 py-2 rounded-lg flex items-center font-medium"
        >
          <ArrowDownLeft className="mr-2 h-5 w-5" />
          Deposit
        </button>
        <button 
          onClick={onWithdraw}
          className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center font-medium hover:bg-gray-50"
        >
          <ArrowUpRight className="mr-2 h-5 w-5" />
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
