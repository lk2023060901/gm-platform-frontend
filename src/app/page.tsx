'use client';

import React from 'react';
import { Layout, Button } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Content } = Layout;

export default function Home() {
  const router = useRouter();

  return (
    <Layout className="min-h-screen">
      <Content className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            游戏管理发布平台
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            专业的游戏管理发布平台，助力开发者轻松管理和发布游戏
          </p>
          <div className="space-y-4">
            <Button 
              type="primary" 
              size="large"
              onClick={() => {
                console.log('Button clicked, navigating to /login');
                router.push('/login');
              }}
            >
              进入登录页面
            </Button>
            
            <div>
              <Link href="/login" className="text-blue-500 hover:text-blue-600 underline">
                或直接点击此链接进入登录页面
              </Link>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}