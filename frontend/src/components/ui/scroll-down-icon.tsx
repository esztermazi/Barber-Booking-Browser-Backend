"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type ScrollDownIconProps = {
  onClick: () => void;
  className?: string;
};

export function ScrollDownIcon({ onClick, className }: ScrollDownIconProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "cursor-pointer w-14 h-14 flex items-center justify-center",
        "rounded-full border border-white bg-transparent text-white",
        "hover:bg-white/20 transition text-3xl animate-bounce-slow",
        className
      )}
    >
      <ChevronDown size={28} />
    </Button>
  );
}
