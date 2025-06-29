'use client';

import React from 'react';
import { Button, Select, Space } from 'antd';
import { MoonOutlined, SunOutlined, GlobalOutlined } from '@ant-design/icons';
import { useThemeStore } from '@/store/theme';
import { WeatherWidget } from './WeatherWidget';

const { Option } = Select;

export function TopBar() {
  const { isDark, toggleTheme } = useThemeStore();

  const handleLanguageChange = (value: string) => {
    console.log('Language changed to:', value);
  };

  const themeLabel = isDark ? '深色' : '浅色';

  return (
    <div className="flex justify-between items-center w-full px-8 py-4 bg-white border-b border-gray-100">
      {/* 左侧天气组件 */}
      <WeatherWidget />

      {/* 右侧控制组件 */}
      <Space size="large">
        {/* 主题切换 */}
        <Button
          type="text"
          icon={isDark ? <MoonOutlined /> : <SunOutlined />}
          onClick={toggleTheme}
          className="flex items-center text-gray-700 hover:text-blue-600 px-4"
        >
          {themeLabel}
        </Button>

        {/* 语言切换 */}
        <Space className="text-gray-700">
          <GlobalOutlined />
          <Select
            defaultValue="zh"
            size="middle"
            style={{ width: 100 }}
            onChange={handleLanguageChange}
            bordered={false}
            className="text-gray-700"
          >
            <Option value="zh">中文</Option>
            <Option value="en">English</Option>
          </Select>
        </Space>
      </Space>
    </div>
  );
}