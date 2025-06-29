'use client';

import React from 'react';
import { Layout } from 'antd';
import { TopBar } from '@/components/login/TopBar';
import { BottomBar } from '@/components/login/BottomBar';
import { LoginForm } from '@/components/login/LoginForm';
import { CarouselSection } from '@/components/login/CarouselSection';
import { DevelopmentPlan } from '@/components/login/DevelopmentPlan';
import { AnnouncementPanel } from '@/components/login/AnnouncementPanel';

const { Header, Content, Footer } = Layout;

export default function LoginPage() {
  return (
    <Layout className="h-screen flex flex-col overflow-hidden">
      {/* 顶部区域 - 天气 + 主题切换 + 语言 */}
      <Header className="h-auto p-0 border-b">
        <TopBar />
      </Header>

      {/* 轮播区域 - 铺满全屏 */}
      <div className="w-full h-80 overflow-hidden">
        <CarouselSection />
      </div>

      {/* 中间内容区域 */}
      <Content className="flex-1 flex items-center justify-center min-h-0 bg-gray-50 overflow-hidden">
        <div className="flex w-full max-w-7xl h-full px-8 py-8 gap-6">
          
          {/* 左侧开发计划 */}
          <div className="w-[400px] flex items-center justify-center">
            <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-[600px]">
              <DevelopmentPlan />
            </div>
          </div>

          {/* 中间登录区域 */}
          <div className="w-[400px] flex items-center justify-center">
            <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-8 h-[600px] flex flex-col justify-center">
              <LoginForm />
            </div>
          </div>

          {/* 右侧公告+快捷入口 */}
          <div className="w-[350px] flex items-center justify-center">
            <div className="w-full h-[600px]">
              <AnnouncementPanel />
            </div>
          </div>
        </div>
      </Content>

      {/* 底部区域 */}
      <Footer className="border-t py-4">
        <BottomBar />
      </Footer>
    </Layout>
  );
}