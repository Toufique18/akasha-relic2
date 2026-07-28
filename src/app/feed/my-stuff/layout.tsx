"use client";

import { useState, isValidElement } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function MyStuffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Determine the active tab based on the URL or default to 'memories'
  const activeTab: "Creation Memories" | "Assets" = pathname.includes("/assets") ? "Assets" : "Creation Memories";
  
  // Helper for the actual dropdown logic
  const [viewType, setViewType] = useState<"Creation Memories" | "Assets">(activeTab);

  const handleToggle = (type: "Creation Memories" | "Assets") => {
    setViewType(type);
    // Redirect logic based on selection
    if (type === "Assets") {
      window.location.href = "/feed/my-stuff/assets";
    } else {
      window.location.href = "/feed/my-stuff/memories";
    }
  };

  return (
    <div className="min-h-screen bg-[#020215] relative pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6">
        
        {/* ====== TOOLBAR ====== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          
          {/* Left: Filter Tabs (Props passed down from specific pages for flexibility) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide max-w-full">
            {isValidElement<{
              filterTabs?: string[];
              onFilterChange?: (tab: string) => void;
              activeFilter?: string;
            }>(children) &&
              children.props.filterTabs?.map((tab: string) => (
                <button
                  key={tab}
                  onClick={() => children.props.onFilterChange?.(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    children.props.activeFilter === tab
                      ? "bg-white text-[#020215] shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))
            }
          </div>

          {/* Right: Toggle Dropdown (Memories vs Assets) */}
          <div className="relative group">
            <div className="flex items-center gap-2 bg-[#7C4AED] hover:bg-[#6D39D2] text-white px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors">
              <span>{viewType}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-40 bg-[#15162C] border border-white/5 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-1 overflow-hidden">
              <button 
                onClick={() => handleToggle("Creation Memories")}
                className={`w-full text-left px-4 py-2.5 text-xs ${viewType === "Creation Memories" ? "text-[#A78BFA] bg-white/5" : "text-gray-400 hover:text-white hover:bg-white/5"} transition-colors`}
              >
                Creation Memories
              </button>
              <button 
                onClick={() => handleToggle("Assets")}
                className={`w-full text-left px-4 py-2.5 text-xs ${viewType === "Assets" ? "text-[#A78BFA] bg-white/5" : "text-gray-400 hover:text-white hover:bg-white/5"} transition-colors`}
              >
                Assets
              </button>
            </div>
          </div>
        </div>

        {/* Actual Page Content */}
        {children}

        {/* ====== FLOATING ACTION BUTTON (FAB) ====== */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-16 h-16 rounded-full bg-[#7C4AED] hover:bg-[#6D39D2] text-white flex items-center justify-center shadow-[0_0_30px_rgba(124,74,237,0.4)] hover:shadow-[0_0_40px_rgba(124,74,237,0.6)] transition-all duration-300 hover:scale-105">
            <Plus className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
// We need to import Plus for the FAB
import { Plus } from "lucide-react";