'use client';

import React from 'react';
import { SunOutlined, CloudOutlined, ThunderboltOutlined } from '@ant-design/icons';

interface WeatherWidgetProps {
  className?: string;
}

export function WeatherWidget({ className }: WeatherWidgetProps) {
  // 模拟天气数据
  const weatherData = {
    temperature: 24,
    condition: '晴',
    icon: 'sunny'
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case '晴':
        return <SunOutlined className="text-yellow-500" />;
      case '多云':
        return <CloudOutlined className="text-gray-500" />;
      case '雨':
        return <ThunderboltOutlined className="text-blue-500" />;
      default:
        return <SunOutlined className="text-yellow-500" />;
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {getWeatherIcon(weatherData.condition)}
      <span className="text-gray-700 font-medium">
        {weatherData.condition} {weatherData.temperature}℃
      </span>
    </div>
  );
}