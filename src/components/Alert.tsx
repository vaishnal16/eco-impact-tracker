import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const baseClasses = 'rounded-lg p-4 flex items-start space-x-3';

  const colorClasses = {
    success: 'bg-green-50 border border-green-200 text-green-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
  }[type];

  const icon = {
    success: '✅',
    error: '⚠️',
    info: 'ℹ️',
  }[type];

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      <span className="text-xl leading-none">{icon}</span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Alert; 