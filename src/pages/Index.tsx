
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Shield, Wallet, ArrowRight, CreditCard } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-bank-light to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 pt-8 md:pt-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                Banking made <span className="text-bank-primary">simple</span> and <span className="text-bank-primary">secure</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                TransactoExpress provides a seamless banking experience with easy deposits, withdrawals, and transaction tracking.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  className="bg-bank-primary hover:bg-bank-secondary text-white px-6 py-6 h-auto text-lg"
                  onClick={() => navigate("/login")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="px-6 py-6 h-auto text-lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://placehold.co/600x400/e0f2fe/0ea5e9?text=Banking+App&font=open+sans" 
                alt="Banking App" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the best banking features designed to make your financial life easier.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
              <Wallet className="h-12 w-12 text-bank-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Transactions</h3>
              <p className="text-gray-600">
                Deposit and withdraw funds with just a few clicks. Track all your transactions in real-time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
              <Shield className="h-12 w-12 text-bank-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Banking</h3>
              <p className="text-gray-600">
                Our platform utilizes the latest security measures to ensure your money is always safe.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
              <CreditCard className="h-12 w-12 text-bank-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Management</h3>
              <p className="text-gray-600">
                Easy-to-use dashboard to manage your accounts and monitor your financial activity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-bank-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust TransactoExpress for their banking needs.
          </p>
          <Button 
            className="bg-white text-bank-primary hover:bg-gray-100 px-8 py-7 h-auto text-lg"
            onClick={() => navigate("/login")}
          >
            Create Account
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TransactoExpress</h3>
              <p className="text-gray-300">
                Your trusted banking partner for all your financial needs.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-300 mb-2">123 Banking Street</p>
              <p className="text-gray-300 mb-2">New York, NY 10001</p>
              <p className="text-gray-300">support@transactoexpress.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2023 TransactoExpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
