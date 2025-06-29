'use client';

import React from 'react';
import { Layout } from 'antd';
import { TopBar } from '@/components/login/TopBar';
import { BottomBar } from '@/components/login/BottomBar';
import { CarouselSection } from '@/components/login/CarouselSection';
import { LoginForm } from '@/components/login/LoginForm';

const { Header, Content, Footer } = Layout;

export default function LoginPage() {
  return (
    <Layout className="min-h-screen">
      {/* 顶部区域 */}
      <Header className="h-16 px-6 flex items-center justify-end border-b">
        <TopBar />
      </Header>

      {/* 中间内容区域 */}
      <Content className="flex-1 flex min-h-0">
        {/* 左侧轮播区域 - 占据2/3宽度 */}
        <div className="flex-[2] bg-gradient-to-br from-blue-500 to-purple-600 relative">
          <CarouselSection />
        </div>

        {/* 右侧登录区域 - 占据1/3宽度，最小宽度400px */}
        <div className="flex-1 min-w-[400px] max-w-[500px] flex items-center justify-center px-8 py-12">
          <LoginForm />
        </div>
      </Content>

      {/* 底部区域 */}
      <Footer className="border-t py-4">
        <BottomBar />
      </Footer>
    </Layout>
  );
}