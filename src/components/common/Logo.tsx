import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const PayLockrLogo: React.FC<LogoProps> = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Modern Circular Background */}
      <circle cx="50" cy="50" r="45" fill="#FBBF24" opacity="0.15"/>
      <circle cx="50" cy="50" r="40" fill="#FBBF24"/>
      
      {/* Lock Icon - Modern & Clean */}
      <g transform="translate(50, 55)">
        {/* Lock Body */}
        <rect x="-12" y="-5" width="24" height="18" rx="3" fill="#1F2937"/>
        
        {/* Lock Shackle */}
        <path 
          d="M-8 -5 V-10 C-8 -15 -4 -18 0 -18 C4 -18 8 -15 8 -10 V-5" 
          stroke="#1F2937" 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none"
        />
        
        {/* Keyhole - Simple Circle */}
        <circle cx="0" cy="3" r="3" fill="#FBBF24"/>
      </g>
      
      {/* Rupee Symbol - Top */}
      <text
        x="50"
        y="32"
        fontSize="20"
        fontWeight="900"
        textAnchor="middle"
        fill="#1F2937"
        fontFamily="Inter, sans-serif"
      >
        ₹
      </text>
      
      {/* Decorative Elements */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.3"/>
    </svg>
  );
};
