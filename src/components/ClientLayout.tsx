'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider, App } from 'antd';
import { useThemeStore } from '@/store/theme';
import { lightTheme, darkTheme } from '@/styles/theme';
import zhCN from 'antd/locale/zh_CN';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { isDark } = useThemeStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  if (!mounted) {
    return (
      <ConfigProvider theme={lightTheme} locale={zhCN}>
        <App>
          {children}
        </App>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={theme} locale={zhCN}>
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}