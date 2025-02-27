import { twMerge } from 'tailwind-merge';
import React from 'react';
const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge('bg-white rounded-lg shadow-md overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3
      className={twMerge('text-xl font-semibold text-gray-800', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={twMerge('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge('px-6 py-4 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent, CardFooter };