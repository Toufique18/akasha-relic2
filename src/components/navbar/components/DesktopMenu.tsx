// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { NAV_LINKS } from "../navbar.constants";
// import { cn } from "@/lib/utils";

// export const DesktopMenu = () => {
//   const pathname = usePathname();

//   return (
//     <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
//       {NAV_LINKS.map((link) => {
//         const isLinkActive = link.href === "/"
//           ? pathname === "/"
//           : (link.href && pathname.startsWith(link.href)) ||
//             (link.children && link.children.some(child => pathname.startsWith(child.href)));

//         return (
//           <li key={link.name}>
//             {link.children ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger className={cn(
//                   "flex items-center text-xs lg:text-sm font-medium tracking-wide transition-colors outline-none cursor-pointer gap-1 hover:text-white",
//                   isLinkActive ? "text-white font-semibold" : "text-white/70"
//                 )}>
//                   <span>{link.name}</span>
//                   <ChevronDown className="w-3.5 h-3.5 opacity-80" />
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="bg-blue-950 border border-white/10 text-white rounded-lg p-1.5 min-w-[150px]">
//                   {link.children.map((child) => {
//                     const isChildActive = pathname === child.href;
//                     return (
//                       <DropdownMenuItem
//                         key={child.name}
//                         className={cn(
//                           "focus:bg-white/10 focus:text-white rounded-md cursor-pointer text-xs font-medium px-3 py-2",
//                           isChildActive ? "bg-white/10 text-white" : "text-white/80"
//                         )}
//                         asChild
//                       >
//                         <Link href={child.href}>{child.name}</Link>
//                       </DropdownMenuItem>
//                     );
//                   })}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Link
//                 href={link.href || "#"}
//                 className={cn(
//                   "text-xs lg:text-sm font-medium tracking-wide transition-colors hover:text-white",
//                   isLinkActive ? "text-white font-semibold" : "text-white/70"
//                 )}
//               >
//                 {link.name}
//               </Link>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

import Link from "next/link";
import { NAV_LINKS } from "../navbar.constants";

export const DesktopMenu = () => {
  return (
    <div className="hidden lg:flex items-center gap-8">
      {NAV_LINKS.map((link) => {
        // If the item has children, it's a dropdown
        if (link.children && link.children.length > 0) {
          return (
            <div key={link.name} className="relative group h-full flex items-center">
              {/* Parent Label */}
              <Link
                href={link.href || "#"}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 py-2"
              >
                {link.name}
                {/* Dropdown arrow icon */}
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* 
                FIX: Group the dropdown inside the same parent div.
                We use 'group-hover:opacity-100 group-hover:visible' 
                instead of 'block' to allow for smooth transitions without lag.
              */}
              {/* <div className="absolute top-full left-0 mt-2 w-48 bg-[#15162C] border border-white/5 rounded-xl shadow-xl 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                          transition-all duration-300 z-50 py-2"
              >
                {link.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {child.name}
                  </Link>
                ))}
              </div> */}
              <div className="absolute top-full left-0 pt-2">
    <div className="w-48 bg-[#15162C] border border-white/5 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2">
        {link.children.map((child) => (
            <Link key={child.name} href={child.href} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                {child.name}
            </Link>
        ))}
    </div>
</div>
            </div>
          );
        }

        // If it's a standard link (no children)
        return (
          <Link
            key={link.name}
            href={link.href}
            className="text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};