import React, { type ReactNode } from 'react';

export type ButtonVariant = 'success' | 'info' | 'danger' | 'alert';

interface ButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = "info", 
  children, 
  onClick, 
  className = "" 
}) => {

  const variants: Record<ButtonVariant, string> = {
    success: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100 ring-emerald-500/20",

    //  converted to green shades
    info: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 ring-emerald-500/20",

    danger: "bg-emerald-700 hover:bg-emerald-800 shadow-emerald-100 ring-emerald-500/20",

    alert: "bg-emerald-400 hover:bg-emerald-500 shadow-emerald-100 ring-emerald-500/20",
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-2xl font-bold text-white transition-all duration-200
        active:scale-95 shadow-xl hover:-translate-y-1 focus:ring-4
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </button>
  );
};