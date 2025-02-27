import { twMerge } from 'tailwind-merge';
import React from 'react';
const ProgressBar = ({ 
  current, 
  total, 
  labels = [], 
  className
}) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className={twMerge('w-full', className)}>
      {/* Progress Steps */}
      <div className="flex justify-between mb-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 <= current
                  ? 'bg-primary-dark text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            {labels[index] && (
              <span className="mt-1 text-xs text-gray-500">
                {labels[index]}
              </span>
            )}
          </div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-primary-dark transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;