import { ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorText: '#000000d9',
    colorTextSecondary: '#00000073',
    borderRadius: 6,
  },
  components: {
    Layout: {
      bodyBg: '#ffffff',
      headerBg: '#ffffff',
      footerBg: '#f8fafc',
    },
    Button: {
      borderRadius: 6,
    },
    Input: {
      borderRadius: 6,
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#141414',
    colorBgElevated: '#1f1f1f',
    colorBgLayout: '#000000',
    colorText: '#ffffffd9',
    colorTextSecondary: '#ffffff73',
    borderRadius: 6,
  },
  components: {
    Layout: {
      bodyBg: '#0f0f0f',
      headerBg: '#141414',
      footerBg: '#1a1a1a',
    },
    Button: {
      borderRadius: 6,
    },
    Input: {
      borderRadius: 6,
    },
  },
};