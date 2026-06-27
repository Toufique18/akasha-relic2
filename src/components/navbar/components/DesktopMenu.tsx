"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../navbar.constants";
import { cn } from "@/lib/utils";

export const DesktopMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
      {NAV_LINKS.map((link) => {
        const isLinkActive = link.href === "/"
          ? pathname === "/"
          : (link.href && pathname.startsWith(link.href)) ||
            (link.children && link.children.some(child => pathname.startsWith(child.href)));

        return (
          <li key={link.name}>
            {link.children ? (
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center text-xs lg:text-sm font-medium tracking-wide transition-colors outline-none cursor-pointer gap-1 hover:text-white",
                  isLinkActive ? "text-white font-semibold" : "text-white/70"
                )}>
                  <span>{link.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-blue-950 border border-white/10 text-white rounded-lg p-1.5 min-w-[150px]">
                  {link.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <DropdownMenuItem
                        key={child.name}
                        className={cn(
                          "focus:bg-white/10 focus:text-white rounded-md cursor-pointer text-xs font-medium px-3 py-2",
                          isChildActive ? "bg-white/10 text-white" : "text-white/80"
                        )}
                        asChild
                      >
                        <Link href={child.href}>{child.name}</Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={link.href || "#"}
                className={cn(
                  "text-xs lg:text-sm font-medium tracking-wide transition-colors hover:text-white",
                  isLinkActive ? "text-white font-semibold" : "text-white/70"
                )}
              >
                {link.name}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};
