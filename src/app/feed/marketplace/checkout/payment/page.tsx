"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";

export default function CheckoutPaymentPage() {
  const [method, setMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = () => {
    // 1. Start processing
    setIsProcessing(true);

    // 2. Simulate an API call (takes 2 seconds)
    setTimeout(() => {
      // 3. Navigate to success page
      router.push("/feed/marketplace/checkout/success");
      
      // (Optional: Reset loading state if you stay on page, though we are navigating away)
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      {/* --- LEFT COLUMN: PAYMENT FORM --- */}
      <div className="lg:col-span-7">
        <div className="bg-[#15162C] border border-white/5 rounded-2xl p-8 space-y-6">
          
          {/* Payment Methods */}
          <div>
            <p className="text-sm text-white mb-3">Select Payment Method</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "credit", label: "Credit Card", icon: CreditCard },
                { id: "paypal", label: "PayPal", icon: Wallet },
                { id: "apple", label: "Apple Pay", icon: Smartphone },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMethod(item.id)}
                  className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border transition-all ${
                    method === item.id
                      ? "bg-[#7C4AED]/10 border-[#7C4AED] text-white"
                      : "bg-[#0B0C1E] border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Card Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 block mb-1.5">Card Number</label>
              <input 
                type="text" 
                defaultValue="1234 5678 9012 3456"
                className="w-full bg-[#0B0C1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300 block mb-1.5">CVV</label>
                <input 
                  type="text" 
                  defaultValue="123"
                  className="w-full bg-[#0B0C1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED]"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 block mb-1.5">Expiration Date</label>
                <input 
                  type="text" 
                  defaultValue="MM/YY"
                  className="w-full bg-[#0B0C1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 block mb-1.5">Card Holder Name</label>
              <input 
                type="text" 
                defaultValue="Jon Don"
                className="w-full bg-[#0B0C1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED]"
              />
            </div>
          </div>

          <div className="pt-4">
            <p className="text-center text-[10px] text-gray-500 mb-4">
              Secure checkout powered by industry-leading encryption
            </p>
            
            {/* UPDATED BUTTON WITH LOGIC */}
            <button 
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`w-full font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] ${
                isProcessing 
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed shadow-none' 
                  : 'bg-[#7C4AED] hover:bg-[#6D39D2] text-white hover:shadow-[0_0_25px_rgba(124,74,237,0.4)]'
              }`}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
      <div className="lg:col-span-5">
        <div className="bg-[#15162C] border border-white/5 rounded-2xl p-6 h-full">
          <h2 className="text-2xl font-medium text-white mb-6">Order Summary</h2>
          <div className="space-y-3 pb-6 border-b border-white/5">
            <div className="flex justify-between text-gray-300 text-sm">
              <span>Subtotal</span>
              <span className="text-[#7C4AED]">$248.00</span>
            </div>
            <div className="flex justify-between text-gray-300 text-sm">
              <span>Tax</span>
              <span className="text-[#7C4AED]">$9.00</span>
            </div>
          </div>
          <div className="flex justify-between text-white font-medium text-lg pt-6">
            <span>Total</span>
            <span className="text-[#7C4AED]">$248.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}