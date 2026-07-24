"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Users, FileText, Box, ShoppingBag, CreditCard, LayoutDashboard } from "lucide-react";
import Logo from "@/assets/banner/AKASHA-RELIC-TECH.svg";

const menuItems = [
  { name: "User Management", icon: Users, href: "/dashboard/user-management" },
  { name: "Content Management", icon: FileText, href: "/dashboard/content" },
  { name: "Assets Management", icon: Box, href: "/dashboard/assets" },
  { name: "Order Management", icon: ShoppingBag, href: "/dashboard/orders" },
  { name: "Pricing Plan", icon: CreditCard, href: "/dashboard/pricing" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-[#15162C] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50 overflow-y-auto">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <div className="relative w-32 h-10">
          <Image src={Logo} alt="Akasha Relic Tech" fill className="object-contain" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? "bg-[#7C4AED] text-white shadow-[0_0_20px_rgba(124,74,237,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};