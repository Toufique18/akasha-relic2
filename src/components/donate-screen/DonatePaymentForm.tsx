"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

// Mocking credit card icons since you likely don't have SVGs for these
const CreditCardIcons = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-8 h-5 bg-[#1A1B31] rounded-sm flex items-center justify-center text-[6px] font-bold text-white border border-white/10">VISA</div>
    <div className="w-8 h-5 bg-[#1A1B31] rounded-sm flex items-center justify-center text-[6px] font-bold text-white border border-white/10">MC</div>
    <div className="w-8 h-5 bg-[#1A1B31] rounded-sm flex items-center justify-center text-[6px] font-bold text-white border border-white/10">AMEX</div>
  </div>
);

export const DonatePaymentForm = () => {
  // State for donation tiers
  const donationTiers = [
    { amount: 200, label: "Support Family Legacy Preservation" },
    { amount: 300, label: "Help Build Virtual Prayer Spaces" },
    { amount: 500, label: "Sponsor Digital Afterlife Experiences" },
    { amount: 1000, label: "Fund AI Memorial Creation" },
  ];
  
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    country: "United States",
    zip: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 relative z-10 bg-[#020215]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* --- Donation Amounts --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-8">
            Choose Donation Amount
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {donationTiers.map((tier, index) => {
              const isSelected = selectedAmount === tier.amount;
              return (
                <motion.button
                  key={tier.amount}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  onClick={() => setSelectedAmount(tier.amount)}
                  className={`relative p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all border-2 ${
                    isSelected 
                      ? 'bg-[#7C4AED] border-[#7C4AED] text-white shadow-[0_0_20px_rgba(124,74,237,0.3)]' 
                      : 'bg-[#15162C] border-[#15162C] hover:border-white/10 text-gray-300'
                  }`}
                >
                  <span className="text-xl font-semibold mb-2">
                    ${tier.amount}
                  </span>
                  <span className={`text-[10px] leading-tight ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>
                    {tier.label}
                  </span>
                  
                  {/* Checkmark for selected state */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-white/20 rounded-full p-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* --- Payment Form --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-medium text-white mb-6">Payment</h2>

          <form className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
              />
            </div>

            {/* Card Information */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white block mb-1">Card information</label>
              
              {/* Main Card Box - Simulating Stripe Elements */}
              <div className="border border-white/10 rounded-lg bg-[#0B0C1E]/50 overflow-hidden">
                {/* Card Number Row */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 1234 1234 1234"
                    className="w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-sm"
                  />
                  <CreditCardIcons />
                </div>

                {/* Expiry & CVC Row */}
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-white/5">
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM / YY"
                      className="w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div className="flex-1 px-4 py-3">
                    <input
                      type="text"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      placeholder="CVC"
                      className="w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Cardholder name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full name on card"
                className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all"
              />
            </div>

            {/* Country & Zip */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Country or region</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all appearance-none"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="ZIP"
                className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] focus:ring-1 focus:ring-[#7C4AED] transition-all mt-3"
              />
            </div>

            {/* Pay Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(124,74,237,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)]"
            >
              Pay
            </motion.button>

            <p className="text-center text-[10px] sm:text-xs text-gray-400">
              By clicking Pay, you agree to the <span className="text-white cursor-pointer hover:underline">Link Terms</span><br />
              and <span className="text-white cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </form>
        </motion.div>

      </div>
    </section>
  );
};