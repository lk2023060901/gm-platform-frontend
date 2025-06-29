'use client';

import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ size = 'medium', variant = 'light', className = '' }: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8 text-lg',
    medium: 'w-12 h-12 text-xl',
    large: 'w-16 h-16 text-2xl'
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-gray-800';
  const bgColor = variant === 'light' ? 'bg-white/20' : 'bg-gray-100';

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo图标 */}
      <div className={`${sizeClasses[size]} ${bgColor} ${textColor} rounded-xl flex items-center justify-center font-bold backdrop-blur-sm border border-white/30 shadow-lg`}>
        <span>GM</span>
      </div>
      
      {/* Logo文字 */}
      <div className={`${textColor} font-bold`}>
        <div className={`${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-base'} leading-tight`}>
          游戏管理平台
        </div>
        <div className={`${size === 'large' ? 'text-sm' : 'text-xs'} opacity-80 leading-tight`}>
          Game Management Platform
        </div>
      </div>
    </div>
  );
}