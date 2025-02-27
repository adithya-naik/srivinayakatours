import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import React from 'react';
const Input = forwardRef(({
  label,
  id,
  error,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={twMerge(
          'w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors',
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-primary-dark',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

export default Input;