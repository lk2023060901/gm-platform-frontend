'use client';

import React, { useState } from 'react';
import { Tabs, Progress, Badge } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { DevelopmentItem, DevelopmentCategory } from '@/types/development';

const { TabPane } = Tabs;

// 模拟开发数据
const developmentData = {
  completed: [
    {
      id: 'login-module',
      name: '登录界面模块',
      items: [
        {
          id: 'login-layout',
          title: '页面布局结构',
          description: '顶部区域、中间区域、底部区域的响应式设计',
          status: 'completed' as const,
          completedTime: '2024-12-29',
          progress: 100,
          features: [
            { id: 'header', name: '顶部区域', description: '主题切换 + 语言切换', completed: true },
            { id: 'content', name: '中间区域', description: '轮播模块 + 登录表单', completed: true },
            { id: 'footer', name: '底部区域', description: '网站信息区', completed: true },
          ]
        },
        {
          id: 'login-functions',
          title: '登录功能模块',
          description: '邮箱登录、手机登录、第三方登录',
          status: 'completed' as const,
          completedTime: '2024-12-29',
          progress: 100,
          features: [
            { id: 'email-login', name: '邮箱登录', description: '格式验证、密码强度验证', completed: true },
            { id: 'phone-login', name: '手机登录', description: '验证码登录流程', completed: true },
            { id: 'social-login', name: '第三方登录', description: 'QQ、微信、Google、GitHub', completed: true },
          ]
        },
        {
          id: 'carousel-module',
          title: '轮播模块',
          description: '图片轮播、文字轮播、交互控制',
          status: 'completed' as const,
          completedTime: '2024-12-29',
          progress: 100,
          features: [
            { id: 'carousel-types', name: '轮播类型', description: '图片、文字、视频轮播', completed: true },
            { id: 'carousel-controls', name: '控制组件', description: '计时器、箭头、指示点', completed: true },
            { id: 'carousel-animations', name: '动画效果', description: '平滑过渡、悬停暂停', completed: true },
          ]
        }
      ]
    },
    {
      id: 'tech-infrastructure',
      name: '技术基础设施',
      items: [
        {
          id: 'project-setup',
          title: '项目架构',
          description: 'Next.js 14、TypeScript 5、Ant Design 5 配置',
          status: 'completed' as const,
          completedTime: '2024-12-29',
          progress: 100,
        },
        {
          id: 'i18n-theme',
          title: '国际化和主题',
          description: '多语言支持、明暗主题切换',
          status: 'completed' as const,
          completedTime: '2024-12-29',
          progress: 100,
        }
      ]
    }
  ],
  planned: [
    {
      id: 'user-management',
      name: '用户管理模块',
      items: [
        {
          id: 'user-registration',
          title: '用户注册功能',
          description: '注册表单设计、邮箱验证、手机验证',
          status: 'planned' as const,
          estimatedTime: '待定',
          progress: 0,
          features: [
            { id: 'reg-form', name: '注册表单', description: '用户信息输入表单', completed: false },
            { id: 'email-verify', name: '邮箱验证', description: '邮箱验证流程', completed: false },
            { id: 'phone-verify', name: '手机验证', description: '手机验证流程', completed: false },
          ]
        },
        {
          id: 'user-profile',
          title: '用户信息管理',
          description: '个人资料页面、头像上传、密码修改',
          status: 'planned' as const,
          estimatedTime: '待定',
          progress: 0,
        },
        {
          id: 'password-recovery',
          title: '找回密码功能',
          description: '邮箱找回、手机找回、安全验证',
          status: 'planned' as const,
          estimatedTime: '待定',
          progress: 0,
        }
      ]
    },
    {
      id: 'game-management',
      name: '游戏管理模块',
      items: [
        {
          id: 'game-list',
          title: '游戏列表管理',
          description: '游戏展示、搜索、分类筛选、分页',
          status: 'planned' as const,
          estimatedTime: '待定',
          progress: 0,
        },
        {
          id: 'game-publish',
          title: '游戏发布功能',
          description: '信息录入、文件上传、截图上传',
          status: 'planned' as const,
          estimatedTime: '待定',
          progress: 0,
        },
        {
          id: 'game-edit',
          title: '游戏编辑功能',
          description: '信息修改、版本管理、状态控制',
          status: 'planned' as const,
          estimatedTime: '待定',
          progress: 0,
        }
      ]
    },
    {
      id: 'data-analytics',
      name: '数据分析模块',
      items: [
        {
          id: 'data-visualization',
          title: '数据可视化',
          description: '图表组件、实时数据、数据导出',
          status: 'planned' as const,
          estimatedTime: '待定',
          progress: 0,
        },
        {
          id: 'user-analytics',
          title: '用户行为分析',
          description: '访问统计、行为轨迹、转化率分析',
          status: 'planned' as const,
          estimatedTime: '待定',
          progress: 0,
        }
      ]
    }
  ]
};

interface DevelopmentPlanProps {
  className?: string;
}

// 文本截断函数
const truncateText = (text: string, maxLength: number = 60): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// 获取状态图标
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircleOutlined className="text-green-500" />;
    case 'in_progress':
      return <ClockCircleOutlined className="text-blue-500" />;
    case 'planned':
      return <PlusCircleOutlined className="text-gray-400" />;
    default:
      return <ClockCircleOutlined className="text-gray-400" />;
  }
};

// 获取状态标签
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge status="success" text="已完成" />;
    case 'in_progress':
      return <Badge status="processing" text="进行中" />;
    case 'planned':
      return <Badge status="default" text="计划中" />;
    default:
      return <Badge status="default" text="未知" />;
  }
};

export function DevelopmentPlan({ className }: DevelopmentPlanProps) {
  const [activeTab, setActiveTab] = useState('planned');

  // 渲染开发项目卡片
  const renderDevelopmentItem = (item: DevelopmentItem) => (
    <div key={item.id} className="bg-gray-50 rounded-lg p-4 mb-3 hover:bg-gray-100 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon(item.status)}
          <h4 className="font-medium text-sm">{truncateText(item.title, 20)}</h4>
        </div>
        {getStatusBadge(item.status)}
      </div>
      
      <p className="text-xs text-gray-600 mb-2 leading-relaxed">
        {truncateText(item.description, 50)}
      </p>
      
      {item.progress !== undefined && (
        <div className="mb-2">
          <Progress 
            percent={item.progress} 
            size="small"
            strokeColor={item.status === 'completed' ? '#52c41a' : '#1890ff'}
          />
        </div>
      )}
      
      {item.features && item.features.length > 0 && (
        <div className="mt-2">
          <div className="flex flex-wrap gap-1">
            {item.features.slice(0, 3).map((feature) => (
              <span
                key={feature.id}
                className={`inline-block px-2 py-1 rounded text-xs ${
                  feature.completed
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {truncateText(feature.name, 8)}
              </span>
            ))}
            {item.features.length > 3 && (
              <span className="inline-block px-2 py-1 rounded text-xs bg-gray-100 text-gray-400">
                +{item.features.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-400">
        {item.completedTime && (
          <span>完成时间: {item.completedTime}</span>
        )}
        {item.estimatedTime && (
          <span>预计时间: {item.estimatedTime}</span>
        )}
      </div>
    </div>
  );

  // 渲染分类
  const renderCategory = (category: DevelopmentCategory) => (
    <div key={category.id} className="mb-4">
      <h3 className="font-semibold text-sm text-gray-700 mb-3 px-2 border-l-3 border-blue-500 bg-blue-50 py-1">
        {category.name}
      </h3>
      <div className="space-y-2">
        {category.items.map(renderDevelopmentItem)}
      </div>
    </div>
  );

  return (
    <div className={`w-full h-full overflow-hidden ${className}`}>
      <div className="h-full flex flex-col">
        {/* 标题区域 */}
        <div className="px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">开发计划</h2>
          <p className="text-sm text-gray-600 mt-1">项目进度和计划</p>
        </div>

        {/* 标签页区域 */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="flex-1"
            size="small"
            tabBarStyle={{ margin: '0 16px', borderBottom: '1px solid #f0f0f0' }}
          >
            <TabPane tab={`开发计划 (${developmentData.planned.reduce((acc, cat) => acc + cat.items.length, 0)})`} key="planned">
              <div 
                className="overflow-y-auto px-4 pb-4 custom-scrollbar" 
                style={{ 
                  height: 'calc(100% - 40px)',
                  maxHeight: '480px'
                }}
              >
                {developmentData.planned.map(renderCategory)}
              </div>
            </TabPane>
            
            <TabPane tab={`已完成 (${developmentData.completed.reduce((acc, cat) => acc + cat.items.length, 0)})`} key="completed">
              <div 
                className="overflow-y-auto px-4 pb-4 custom-scrollbar" 
                style={{ 
                  height: 'calc(100% - 40px)',
                  maxHeight: '480px'
                }}
              >
                {developmentData.completed.map(renderCategory)}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}