"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Database, Milestone, Sparkles, Brain, DollarSign } from "lucide-react";
import { toast } from "sonner";

// Mocking credit card icons since you likely don't have SVGs for these
const CreditCardIcons = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-8 h-5 bg-[#1A1B31] rounded-sm flex items-center justify-center text-[6px] font-bold text-white border border-white/10">VISA</div>
    <div className="w-8 h-5 bg-[#1A1B31] rounded-sm flex items-center justify-center text-[6px] font-bold text-white border border-white/10">MC</div>
    <div className="w-8 h-5 bg-[#1A1B31] rounded-sm flex items-center justify-center text-[6px] font-bold text-white border border-white/10">AMEX</div>
  </div>
);

const fundraisingProjects = [
  {
    id: "legacy",
    name: "Family Legacy Preservation",
    description: "Digitizing, archiving, and cataloging physical journals, voice recordings, and family letters to protect histories.",
    goalAmount: 15000,
    raisedAmount: 11250,
  },
  {
    id: "prayer",
    name: "Virtual Prayer Spaces",
    description: "Creating virtual sanctuaries for quiet contemplation, virtual memories, and online family gatherings.",
    goalAmount: 25000,
    raisedAmount: 14000,
  },
  {
    id: "afterlife",
    name: "Digital Afterlife Experiences",
    description: "Constructing interactive storytelling spheres to pass on memories and life wisdom across generations.",
    goalAmount: 40000,
    raisedAmount: 33200,
  },
  {
    id: "ai",
    name: "AI Memorial Creation",
    description: "Developing advanced conversational replicas based on archives to preserve voice and wisdom.",
    goalAmount: 60000,
    raisedAmount: 24000,
  },
];

const presetAmounts = [50, 100, 250, 500, 1000];

export const DonatePaymentForm = () => {
  // State for project and donation configuration
  const [selectedProjectId, setSelectedProjectId] = useState<string>("legacy");
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>("");
  const [customError, setCustomError] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    country: "United States",
    zip: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Helper formats
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.length > 0 ? parts.join(" ") : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length > 2) {
      return `${v.slice(0, 2)} / ${v.slice(2, 4)}`;
    }
    return v;
  };

  const formatCVC = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiry") {
      formattedValue = formatExpiry(value);
    } else if (name === "cvc") {
      formattedValue = formatCVC(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear validation error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const temp = { ...prev };
        delete temp[name];
        return temp;
      });
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Only allow digits and at most one decimal point
    if (val !== "" && !/^\d*\.?\d{0,2}$/.test(val)) {
      return;
    }

    setCustomInput(val);

    if (val === "") {
      setCustomError("Amount is required");
      setSelectedAmount(0);
      return;
    }

    const parsed = parseFloat(val);
    if (isNaN(parsed)) {
      setCustomError("Enter a valid number");
      setSelectedAmount(0);
    } else if (parsed < 5) {
      setCustomError("Minimum donation is $5");
      setSelectedAmount(parsed);
    } else if (parsed > 50000) {
      setCustomError("Maximum donation is $50,000");
      setSelectedAmount(parsed);
    } else {
      setCustomError("");
      setSelectedAmount(parsed);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else {
      const numericCard = formData.cardNumber.replace(/\s/g, "");
      if (numericCard.length < 15 || numericCard.length > 16) {
        errors.cardNumber = "Enter a valid card number";
      }
    }

    if (!formData.expiry.trim()) {
      errors.expiry = "Expiry date is required";
    } else {
      const cleanExpiry = formData.expiry.replace(/\s/g, "");
      if (!/^\d{2}\/\d{2}$/.test(cleanExpiry)) {
        errors.expiry = "Use MM / YY format";
      }
    }

    if (!formData.cvc.trim()) {
      errors.cvc = "CVC is required";
    } else if (formData.cvc.length < 3) {
      errors.cvc = "Enter valid CVC";
    }

    if (!formData.name.trim()) {
      errors.name = "Cardholder name is required";
    }

    if (!formData.zip.trim()) {
      errors.zip = "ZIP/Postal code is required";
    }

    // Amount validation
    if (isCustomAmount) {
      if (!customInput.trim()) {
        errors.amount = "Enter custom amount";
      } else {
        const amt = parseFloat(customInput);
        if (isNaN(amt) || amt < 5) {
          errors.amount = "Minimum donation is $5";
        } else if (amt > 50000) {
          errors.amount = "Maximum donation is $50,000";
        }
      }
    } else {
      if (selectedAmount <= 0) {
        errors.amount = "Choose an amount";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all details correctly.");
      return;
    }

    setIsSubmitting(true);

    // Simulate Stripe payment logic
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentSuccess(true);
      toast.success("Donation completed successfully! Thank you.");
    }, 1500);
  };

  return (
    <section className="w-full py-8 sm:py-12 relative z-10 bg-[#020215]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <AnimatePresence mode="wait">
          {paymentSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-[#15162C] to-[#0B0C1E] border border-emerald-500/20 rounded-3xl p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden"
            >
              {/* Confetti-like ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <Check className="w-10 h-10" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">Thank You for Your Generosity!</h2>
              <p className="text-gray-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-8">
                Your contribution will actively fund critical projects to preserve and honor lasting digital legacies.
              </p>

              <div className="max-w-xs mx-auto bg-[#020215]/50 border border-white/5 rounded-2xl p-5 mb-8 text-left space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Amount Contributed</span>
                  <span className="text-xl font-bold text-white">${selectedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Project Supported</span>
                  <span className="text-xs font-semibold text-emerald-400 text-right max-w-[160px]">
                    {fundraisingProjects.find(p => p.id === selectedProjectId)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Status</span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={() => {
                  setPaymentSuccess(false);
                  setSelectedAmount(250);
                  setIsCustomAmount(false);
                  setCustomInput("");
                  setCustomError("");
                  setFormData({
                    email: "",
                    cardNumber: "",
                    expiry: "",
                    cvc: "",
                    name: "",
                    country: "United States",
                    zip: ""
                  });
                  setFormErrors({});
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-[#6D39D2] to-[#7C4AED] hover:from-[#5B21B6] hover:to-[#6D39D2] text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)]"
              >
                Donate Again
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* --- Fundraising Projects/Goals --- */}
              <div>
                <p className="text-2xl sm:text-3xl font-serif text-white mb-2">Select a Project to Support</p>
                <p className="text-sm text-gray-400 mb-6">Choose which memory preservation effort your donation will benefit.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {fundraisingProjects.map((project) => {
                    const isSelected = selectedProjectId === project.id;
                    const percentCurrent = (project.raisedAmount / project.goalAmount) * 100;
                    
                    // Forecast updates
                    const contributionAmount = isSelected && selectedAmount > 0 ? selectedAmount : 0;
                    const percentTotal = Math.min(100, ((project.raisedAmount + contributionAmount) / project.goalAmount) * 100);
                    const remainingNeeded = Math.max(0, project.goalAmount - project.raisedAmount - contributionAmount);
                    
                    // Determine Icon
                    const IconComponent = project.id === "legacy" ? Database :
                                          project.id === "prayer" ? Milestone :
                                          project.id === "afterlife" ? Sparkles : Brain;

                    return (
                      <motion.div
                        key={project.id}
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          if (formErrors.amount) {
                            setFormErrors(prev => {
                              const temp = { ...prev };
                              delete temp.amount;
                              return temp;
                            });
                          }
                        }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className={`relative p-5 rounded-2xl flex flex-col justify-between transition-all border-2 cursor-pointer select-none bg-[#15162C]/70 backdrop-blur-sm ${
                          isSelected 
                            ? 'border-[#7C4AED] shadow-[0_0_20px_rgba(124,74,237,0.15)] bg-gradient-to-b from-[#15162C] to-[#0E0F23]' 
                            : 'border-white/5 hover:border-white/10 hover:bg-[#15162C]'
                        }`}
                      >
                        {/* Checkbox state top right */}
                        <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'bg-[#7C4AED] border-[#7C4AED]' : 'border-white/10 bg-transparent'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>

                        <div className="flex items-start gap-3.5 mb-4">
                          <div className={`p-2.5 rounded-xl transition-colors ${
                            isSelected ? 'bg-[#7C4AED]/20 text-[#A78BFA]' : 'bg-[#0B0C1E] text-gray-400'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1 pr-6">
                            <h3 className="text-sm font-semibold text-white leading-snug">{project.name}</h3>
                            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Progress visual representation */}
                        <div className="space-y-2 mt-auto">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-gray-400">Funding Progress</span>
                            <span className="font-semibold text-white">
                              {Math.round(percentCurrent)}% 
                              {isSelected && contributionAmount > 0 && (
                                <span className="text-emerald-400 ml-1">→ {Math.round(percentTotal)}%</span>
                              )}
                            </span>
                          </div>

                          <div className="w-full h-2 bg-[#020215] rounded-full overflow-hidden relative border border-white/5">
                            {/* Forecast segment */}
                            {isSelected && contributionAmount > 0 && (
                              <motion.div
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="absolute top-0 left-0 h-full bg-[#10B981] rounded-full"
                                style={{ width: `${percentTotal}%` }}
                              />
                            )}
                            {/* Base segment */}
                            <div 
                              className="absolute top-0 left-0 h-full bg-[#7C4AED] rounded-full transition-all duration-300"
                              style={{ width: `${percentCurrent}%` }}
                            />
                          </div>

                          {/* Statistics footer */}
                          <div className="flex items-center justify-between text-[11px] pt-1">
                            <div className="flex flex-col">
                              <span className="text-[9px] text-gray-500 uppercase">Raised</span>
                              <span className="font-medium text-white">${project.raisedAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] text-gray-500 uppercase">Needed</span>
                              <div className="flex items-center gap-1">
                                {isSelected && contributionAmount > 0 ? (
                                  <>
                                    <span className="font-medium text-gray-500 line-through text-[10px]">
                                      ${(project.goalAmount - project.raisedAmount).toLocaleString()}
                                    </span>
                                    <span className="font-bold text-emerald-400">
                                      ${remainingNeeded.toLocaleString()}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-bold text-[#F43F5E]">
                                    ${(project.goalAmount - project.raisedAmount).toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* --- Donation Amounts --- */}
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <p className="text-xl sm:text-2xl font-serif text-white">Select Donation Amount</p>
                  {formErrors.amount && <span className="text-red-400 text-xs font-normal">{formErrors.amount}</span>}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {presetAmounts.map((amount) => {
                    const isSelected = !isCustomAmount && selectedAmount === amount;
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setIsCustomAmount(false);
                          setCustomInput("");
                          setCustomError("");
                          if (formErrors.amount) {
                            setFormErrors(prev => {
                              const temp = { ...prev };
                              delete temp.amount;
                              return temp;
                            });
                          }
                        }}
                        className={`py-3.5 px-2 rounded-xl flex items-center justify-center font-semibold text-base transition-all border-2 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#7C4AED] border-[#7C4AED] text-white shadow-[0_0_15px_rgba(124,74,237,0.25)]' 
                            : 'bg-[#15162C] border-white/5 hover:border-white/10 text-gray-300'
                        }`}
                      >
                        ${amount}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomAmount(true);
                      const amt = parseFloat(customInput) || 50;
                      setSelectedAmount(amt);
                      if (formErrors.amount) {
                        setFormErrors(prev => {
                          const temp = { ...prev };
                          delete temp.amount;
                          return temp;
                        });
                      }
                    }}
                    className={`py-3.5 px-2 rounded-xl flex items-center justify-center font-semibold text-base transition-all border-2 cursor-pointer ${
                      isCustomAmount 
                        ? 'bg-[#7C4AED] border-[#7C4AED] text-white shadow-[0_0_15px_rgba(124,74,237,0.25)]' 
                        : 'bg-[#15162C] border-white/5 hover:border-white/10 text-gray-300'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {/* Custom Amount Input Field */}
                <AnimatePresence>
                  {isCustomAmount && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden space-y-2 mt-4"
                    >
                      <label className="text-sm font-medium text-gray-400 flex justify-between">
                        <span>Enter custom amount</span>
                        {customError && <span className="text-red-400 text-xs font-normal">{customError}</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">$</div>
                        <input
                          type="text"
                          value={customInput}
                          onChange={handleCustomInputChange}
                          placeholder="Min $5 - Max $50,000"
                          className={`w-full bg-[#0B0C1E]/50 border rounded-xl pl-10 pr-4 py-3.5 text-white font-semibold text-lg focus:outline-none transition-all ${
                            customError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#7C4AED]'
                          }`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* --- Payment Form --- */}
              <div className="border-t border-white/5 pt-10">
                <p className="text-xl sm:text-2xl font-serif text-white mb-6">Enter Billing Details</p> 
 
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex justify-between">
                      <span>Email</span>
                      {formErrors.email && <span className="text-red-400 text-xs font-normal">{formErrors.email}</span>}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@gmail.com"
                      className={`w-full bg-[#0B0C1E]/50 border rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                        formErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#7C4AED]'
                      }`}
                    />
                  </div>

                  {/* Card Information */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="text-sm font-medium text-white">Card information</label>
                      {(formErrors.cardNumber || formErrors.expiry || formErrors.cvc) && (
                        <span className="text-red-400 text-xs font-normal">
                          {formErrors.cardNumber || formErrors.expiry || formErrors.cvc}
                        </span>
                      )}
                    </div>
                    
                    {/* Main Card Box - Simulating Stripe Elements */}
                    <div className={`border rounded-lg bg-[#0B0C1E]/50 overflow-hidden transition-all ${
                      (formErrors.cardNumber || formErrors.expiry || formErrors.cvc) ? 'border-red-500/50' : 'border-white/10'
                    }`}>
                      {/* Card Number Row */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4111 2222 3333 4444"
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
                    <label className="text-sm font-medium text-white flex justify-between">
                      <span>Cardholder name</span>
                      {formErrors.name && <span className="text-red-400 text-xs font-normal">{formErrors.name}</span>}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full name on card"
                      className={`w-full bg-[#0B0C1E]/50 border rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                        formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#7C4AED]'
                      }`}
                    />
                  </div>

                  {/* Country & Zip */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex justify-between">
                      <span>Country or region</span>
                      {formErrors.zip && <span className="text-red-400 text-xs font-normal">{formErrors.zip}</span>}
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#0B0C1E]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7C4AED] transition-all appearance-none"
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
                      placeholder="ZIP / Postal Code"
                      className={`w-full bg-[#0B0C1E]/50 border rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none transition-all mt-3 ${
                        formErrors.zip ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#7C4AED]'
                      }`}
                    />
                  </div>

                  {/* Pay Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || selectedAmount <= 0}
                    whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(124,74,237,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#7C4AED] hover:bg-[#6D39D2] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(124,74,237,0.2)] text-base"
                  >
                    {isSubmitting ? "Processing..." : `Pay $${selectedAmount > 0 ? selectedAmount.toLocaleString() : "0"}`}
                  </motion.button>

                  <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-4 leading-normal">
                    By clicking Pay, you agree to the <span className="text-white cursor-pointer hover:underline">Link Terms</span> and <span className="text-white cursor-pointer hover:underline">Privacy Policy</span>.
                  </p>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};