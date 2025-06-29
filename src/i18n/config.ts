import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zhCN from './locales/zh.json';
import enUS from './locales/en.json';

const resources = {
  zh: {
    translation: zhCN,
  },
  en: {
    translation: enUS,
  },
};

// 只在客户端初始化语言检测器
if (typeof window !== 'undefined') {
  i18n.use(LanguageDetector);
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    lng: 'zh',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    // 配置语言检测器选项
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;