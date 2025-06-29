'use client';

import React, { useState } from 'react';
import { Tabs, Badge } from 'antd';
import { 
  NotificationOutlined, 
  LinkOutlined, 
  FileTextOutlined,
  BugOutlined,
  CodeOutlined,
  ExperimentOutlined,
  AuditOutlined,
  BranchesOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'maintenance' | 'policy' | 'urgent' | 'info';
  date: string;
}

interface QuickLink {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  category: 'tool' | 'workflow' | 'system';
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: '系统维护通知',
    content: '平台将于今晚22:00-24:00进行系统维护，请提前保存工作进度。维护期间所有功能将暂停使用，请合理安排工作时间。',
    type: 'maintenance',
    date: '2024-12-29 14:30'
  },
  {
    id: 2,
    title: '游戏发布流程更新',
    content: '新增审核环节，所有游戏发布需经过安全审核，预计增加1-2个工作日。请开发团队提前规划发布时间，确保项目按时上线。',
    type: 'policy',
    date: '2024-12-28 09:15'
  },
  {
    id: 3,
    title: '紧急通知：测试环境异常',
    content: '测试环境暂时无法访问，技术团队正在紧急修复中。预计修复时间2小时，期间请使用本地开发环境进行测试。',
    type: 'urgent',
    date: '2024-12-29 16:45'
  },
  {
    id: 4,
    title: '假期安排提醒',
    content: '元旦期间（1月1日-3日）仅保留紧急发布通道，常规发布暂停。如有紧急发布需求，请联系值班人员。',
    type: 'info',
    date: '2024-12-27 11:20'
  },
  {
    id: 5,
    title: '新版本发布',
    content: '平台v2.1.0版本已发布，新增批量操作功能，优化用户界面体验。请及时更新到最新版本以获得更好的使用体验。',
    type: 'info',
    date: '2024-12-26 08:00'
  },
  {
    id: 6,
    title: '安全政策更新',
    content: '为提高平台安全性，现要求所有用户启用双因子认证。请在个人设置中绑定手机号或邮箱，确保账户安全。',
    type: 'policy',
    date: '2024-12-25 15:30'
  },
  {
    id: 7,
    title: '数据库升级维护',
    content: '数据库将于周末进行版本升级，预计维护时间4小时。维护期间可能出现数据延迟，请耐心等待。',
    type: 'maintenance',
    date: '2024-12-24 10:45'
  },
  {
    id: 8,
    title: '新功能培训通知',
    content: '将于下周三下午2点举行新功能培训会议，主要介绍批量操作和权限管理功能。请相关人员准时参加。',
    type: 'info',
    date: '2024-12-23 13:15'
  },
  {
    id: 9,
    title: '服务器迁移通知',
    content: '生产环境将于下月初迁移至新的服务器机房，迁移期间服务不中断。新服务器性能提升30%，响应速度更快。',
    type: 'maintenance',
    date: '2024-12-22 17:00'
  },
  {
    id: 10,
    title: '年度总结会议',
    content: '年度技术总结会议将于12月30日举行，请各部门准备工作汇报。会议将回顾全年技术成果和制定明年发展规划。',
    type: 'info',
    date: '2024-12-21 09:30'
  }
];

const quickLinks: QuickLink[] = [
  {
    id: 1,
    title: '内部Wiki',
    description: '开发文档和规范',
    icon: <FileTextOutlined />,
    url: '#',
    category: 'tool'
  },
  {
    id: 2,
    title: 'Bug追踪',
    description: 'Jira问题管理',
    icon: <BugOutlined />,
    url: '#',
    category: 'tool'
  },
  {
    id: 3,
    title: '代码仓库',
    description: 'GitLab项目管理',
    icon: <CodeOutlined />,
    url: '#',
    category: 'tool'
  },
  {
    id: 4,
    title: '测试环境',
    description: '开发测试入口',
    icon: <ExperimentOutlined />,
    url: '#',
    category: 'system'
  },
  {
    id: 5,
    title: '审核待办',
    description: '待处理审核项目',
    icon: <AuditOutlined />,
    url: '#',
    category: 'workflow'
  },
  {
    id: 6,
    title: '版本管理',
    description: '发布版本控制',
    icon: <BranchesOutlined />,
    url: '#',
    category: 'workflow'
  },
  {
    id: 7,
    title: '监控面板',
    description: '系统性能监控',
    icon: <NotificationOutlined />,
    url: '#',
    category: 'system'
  },
  {
    id: 8,
    title: '构建系统',
    description: 'CI/CD流水线',
    icon: <CodeOutlined />,
    url: '#',
    category: 'workflow'
  },
  {
    id: 9,
    title: '日志中心',
    description: '系统日志查询',
    icon: <FileTextOutlined />,
    url: '#',
    category: 'system'
  },
  {
    id: 10,
    title: '数据库管理',
    description: '数据库操作工具',
    icon: <ExperimentOutlined />,
    url: '#',
    category: 'system'
  },
  {
    id: 11,
    title: '用户管理',
    description: '权限和角色管理',
    icon: <AuditOutlined />,
    url: '#',
    category: 'workflow'
  },
  {
    id: 12,
    title: '备份恢复',
    description: '数据备份和恢复',
    icon: <BranchesOutlined />,
    url: '#',
    category: 'system'
  },
  {
    id: 13,
    title: 'API文档',
    description: '接口文档和调试',
    icon: <FileTextOutlined />,
    url: '#',
    category: 'tool'
  },
  {
    id: 14,
    title: '性能分析',
    description: '应用性能分析',
    icon: <NotificationOutlined />,
    url: '#',
    category: 'tool'
  }
];

interface AnnouncementPanelProps {
  className?: string;
}

export function AnnouncementPanel({ className }: AnnouncementPanelProps) {
  const [activeTab, setActiveTab] = useState('announcements');

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <ClockCircleOutlined className="text-orange-500" />;
      case 'policy':
        return <NotificationOutlined className="text-blue-500" />;
      case 'urgent':
        return <ExclamationCircleOutlined className="text-red-500" />;
      default:
        return <CheckCircleOutlined className="text-green-500" />;
    }
  };

  const getAnnouncementBadge = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Badge status="warning" text="维护" />;
      case 'policy':
        return <Badge status="processing" text="政策" />;
      case 'urgent':
        return <Badge status="error" text="紧急" />;
      default:
        return <Badge status="success" text="通知" />;
    }
  };

  const handleQuickLinkClick = (url: string, title: string) => {
    console.log(`访问 ${title}: ${url}`);
    // 这里可以添加实际的跳转逻辑
  };

  const renderAnnouncements = () => {
    // 使用固定高度解决显示问题：
    // 每个公告固定高度180px，2个公告=360px，间距12px，容器padding32px
    // 总高度=360+12+32=404px
    const shouldScroll = announcements.length > 2;
    const maxHeight = shouldScroll ? '404px' : '100%';
    
    return (
      <div className={`px-4 pt-4 pb-4 h-full ${shouldScroll ? 'overflow-y-auto custom-scrollbar' : ''}`}
           style={{ maxHeight: maxHeight }}>
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-l-3 border-blue-400 h-[180px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-0.5 flex-shrink-0">
                <div className="flex items-center space-x-1.5 min-w-0">
                  {getAnnouncementIcon(announcement.type)}
                  <h4 className="font-medium text-sm text-gray-800 truncate">
                    {announcement.title}
                  </h4>
                </div>
                <div className="flex-shrink-0">
                  {getAnnouncementBadge(announcement.type)}
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-4 mb-1 line-clamp-5 flex-1 overflow-hidden">
                {announcement.content}
              </p>
              <div className="text-xs text-gray-400 flex-shrink-0">
                发布时间: {announcement.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuickLinks = () => {
    // 重新计算6个工具的高度：
    // 单个工具高度: padding(12*2) + 图标(20) + 标题(16) + 描述(16) + space-y-2(8) = 84px
    // 3行工具: 84 * 3 = 252px
    // gap间距: 12px * 2 = 24px
    // 容器padding: pt-4 + pb-4 = 32px
    // 总计: 252 + 24 + 32 = 308px
    // 保险起见增加到330px
    const shouldScroll = quickLinks.length > 6;
    const maxHeight = shouldScroll ? '330px' : '100%';
    
    return (
      <div className={`px-4 pt-4 pb-4 h-full ${shouldScroll ? 'overflow-y-auto custom-scrollbar' : ''}`}
           style={{ maxHeight: maxHeight }}>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <div 
              key={link.id}
              onClick={() => handleQuickLinkClick(link.url, link.title)}
              className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 
                         border border-gray-200 cursor-pointer transition-all duration-200
                         flex flex-col items-center text-center space-y-2"
            >
              <div className="text-lg text-gray-600 hover:text-blue-600 transition-colors">
                {link.icon}
              </div>
              <div>
                <h4 className="font-medium text-xs text-gray-800">
                  {link.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {link.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="h-full flex flex-col">
        {/* 标题区域 */}
        <div className="px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">工作台</h2>
          <p className="text-sm text-gray-600 mt-1">公告通知和快捷工具</p>
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
            <TabPane tab={`公告通知 (${announcements.length})`} key="announcements">
              <div style={{ height: '480px' }}>
                {renderAnnouncements()}
              </div>
            </TabPane>
            
            <TabPane tab={`快捷工具 (${quickLinks.length})`} key="quicklinks">
              <div style={{ height: '480px' }}>
                {renderQuickLinks()}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}