'use client';

import React from 'react';
import { Divider } from 'antd';

export function BottomBar() {
  return (
    <div className="text-center text-gray-500 text-sm">
      <div className="flex justify-center items-center space-x-6">
        <a href="#" className="hover:text-blue-500 transition-colors">
          备案信息
        </a>
        <Divider type="vertical" />
        <a href="#" className="hover:text-blue-500 transition-colors">
          公司信息
        </a>
        <Divider type="vertical" />
        <a href="#" className="hover:text-blue-500 transition-colors">
          法律条款
        </a>
        <Divider type="vertical" />
        <a href="#" className="hover:text-blue-500 transition-colors">
          隐私政策
        </a>
      </div>
      <div className="mt-2">
        <span>© 2024 游戏管理发布平台. All rights reserved.</span>
      </div>
    </div>
  );
}