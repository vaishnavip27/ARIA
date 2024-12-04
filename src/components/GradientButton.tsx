"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};