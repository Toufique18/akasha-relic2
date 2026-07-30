"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";

// --- Mock Data for Marketplace ---
const marketplaceItems = [
  {
    id: 1,
    name: "Blue T-Shirt",
    price: "$8",
    description: "A stylish blue t-shirt designe...",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Red Hoodie",
    price: "$25",
    description: "A cozy red hoodie perfect for...",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Green Cargo Pa...",
    price: "$35",
    description: "Durable green cargo pants wi...",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Tea Table",
    price: "$60",
    description: "Sleek black sneakers designe...",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Big Sofa",
    price: "$15",
    description: "A spacious and comfortable...",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Big Sofa",
    price: "$15",
    description: "A classic white baseball cap...",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Blue T-Shirt",
    price: "$8",
    description: "A stylish blue t-shirt designe...",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Big Sofa",
    price: "$15",
    description: "A classic white baseball cap...",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Tea Table",
    price: "$60",
    description: "Sleek black sneakers designe...",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Green Cargo Pa...",
    price: "$35",
    description: "Durable green cargo pants wi...",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=300&auto=format&fit=crop",
  },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#020215] relative pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-10">
        
        {/* ====== HEADER & SEARCH SECTION ====== */}
        <div className="flex flex-col items-center text-center mb-12 space-y-6">
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
            Assets <span className="text-[#84CC16]">Marketplace</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-300 text-sm md:text-base max-w-lg">
            Honor your loved ones with thoughtful memorial assets
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search assets" 
              className="w-full bg-[#1A1B31]/80 border border-white/5 rounded-full pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7C4AED] transition-colors"
            />
          </div>
        </div>

        {/* ====== MARKETPLACE GRID ====== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {marketplaceItems.map((item, index) => (
            <Link key={item.id} href={`/feed/marketplace/${item.id}`}>
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group flex flex-col gap-3 cursor-pointer"
            >
              {/* Square Card with Thin Border */}
              <div className="relative w-full aspect-square rounded-[30px] border border-white/20 bg-[#0B0C1E] overflow-hidden hover:border-[#84CC16] transition-all duration-300 flex items-center justify-center p-4">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Details */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-white line-clamp-1">{item.name}</h3>
                  <p className="text-[10px] text-gray-500 line-clamp-1">{item.description}</p>
                </div>
                <span className="text-[#84CC16] text-sm font-bold shrink-0 whitespace-nowrap">{item.price}</span>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}