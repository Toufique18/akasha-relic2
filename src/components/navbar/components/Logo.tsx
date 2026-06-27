import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoSvg from "@/assets/banner/AKASHA-RELIC-TECH.svg";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src={LogoSvg}
      alt="Akasha Relic Tech"
      className={cn(
        "h-10 w-auto object-contain transition-opacity hover:opacity-80",
        className
      )}
      priority
    />
  );
};
