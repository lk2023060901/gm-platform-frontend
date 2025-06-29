'use client';

import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface TaskItem {
  id: number;
  title: string;
  status: string;
}

const developingTasks: TaskItem[] = [
  { id: 1, title: '任务 A：角色系统开发中', status: '进行中' },
  { id: 2, title: '任务 B：数据分析模块设计', status: '进行中' },
  { id: 3, title: '任务 C：用户权限管理优化', status: '进行中' }
];

const completedTasks: TaskItem[] = [
  { id: 1, title: '任务 D：登录界面开发完成', status: '已完成' },
  { id: 2, title: '任务 E：轮播组件实现完成', status: '已完成' },
  { id: 3, title: '任务 F：主题切换功能完成', status: '已完成' }
];

interface TaskPanelProps {
  className?: string;
}

export function TaskPanel({ className }: TaskPanelProps) {
  const [activeTab, setActiveTab] = useState('developing');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const currentTasks = activeTab === 'developing' ? developingTasks : completedTasks;

  // 轮播逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTaskIndex((prev) => (prev + 1) % Math.min(currentTasks.length, 3));
    }, 3000);

    return () => clearInterval(timer);
  }, [currentTasks.length]);

  const displayTasks = currentTasks.slice(currentTaskIndex, currentTaskIndex + 2);
  if (displayTasks.length < 2 && currentTasks.length > 1) {
    displayTasks.push(currentTasks[0]);
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>
      {/* 标签页头部 */}
      <div className="border-b border-gray-100">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="task-panel-tabs"
          size="large"
          tabBarStyle={{ 
            margin: '0 24px', 
            borderBottom: 'none',
            paddingTop: '16px'
          }}
        >
          <TabPane tab="正在开发的计划" key="developing" />
          <TabPane tab="已完成的开发计划" key="completed" />
        </Tabs>
      </div>

      {/* 任务轮播区域 */}
      <div className="p-6">
        <div className="space-y-4 min-h-[120px]">
          {displayTasks.map((task, index) => (
            <div 
              key={`${task.id}-${index}`}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700 text-sm font-medium truncate">
                {task.title}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                task.status === '进行中' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>

        {/* 轮播指示器 */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: Math.min(currentTasks.length, 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTaskIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTaskIndex % Math.min(currentTasks.length, 3)
                  ? 'bg-blue-500' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}