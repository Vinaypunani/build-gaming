import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const FormInput = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  error
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-foreground mb-1"
      >
        {label} {required && <span className="text-secondary">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type === 'password' && showPassword ? 'text' : type}
          className={`
            w-full px-4 py-2 bg-input border ${error ? 'border-secondary' : 'border-border'} 
            rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50
          `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-[30%] text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-secondary">{error}</p>
      )}
    </div>
  );
};

export default FormInput; 