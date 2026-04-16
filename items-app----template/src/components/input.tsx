import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  helperText, 
  icon, 
  className = "", 
  type = "text",
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      
      {label && (
        <label className="text-sm font-bold text-emerald-900 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-700 transition-colors">
            {icon}
          </div>
        )}

        <input
          type={type}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
            text-emerald-900 placeholder:text-emerald-400 font-medium
            ${icon ? 'pl-11' : 'pl-4'}
            ${error 
              ? 'border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
              : 'border-emerald-200 bg-emerald-50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-emerald-300 shadow-sm'
            }
          `}
          {...props}
        />
      </div>

      {(error || helperText) && (
        <p className={`text-xs ml-1 font-medium ${error ? 'text-rose-500' : 'text-emerald-600'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};