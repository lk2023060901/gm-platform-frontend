'use client';

import React from 'react';
import { Switch, Select, Space } from 'antd';
import { MoonOutlined, SunOutlined, GlobalOutlined } from '@ant-design/icons';
import { useThemeStore } from '@/store/theme';

const { Option } = Select;

export function TopBar() {
  const { isDark, toggleTheme } = useThemeStore();

  const handleLanguageChange = (value: string) => {
    // TODO: 实现语言切换逻辑
    console.log('Language changed to:', value);
  };

  return (
    <Space size="large">
      {/* 语言切换 */}
      <Space>
        <GlobalOutlined className="text-gray-600" />
        <Select
          defaultValue="zh"
          size="small"
          style={{ width: 80 }}
          onChange={handleLanguageChange}
          bordered={false}
        >
          <Option value="zh">中文</Option>
          <Option value="en">English</Option>
        </Select>
      </Space>

      {/* 主题切换 */}
      <Space>
        <SunOutlined className={`text-gray-600 ${!isDark ? 'text-blue-500' : ''}`} />
        <Switch
          checked={isDark}
          onChange={toggleTheme}
          size="small"
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
        <MoonOutlined className={`text-gray-600 ${isDark ? 'text-blue-500' : ''}`} />
      </Space>
    </Space>
  );
}