'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Divider } from 'antd';
import { 
  UserOutlined, 
  LockOutlined,
  QqOutlined,
  WechatOutlined,
  GoogleOutlined,
  GithubOutlined
} from '@ant-design/icons';
import { PhoneLoginForm } from './PhoneLoginForm';

const { TabPane } = Tabs;

export function LoginForm() {
  const [activeTab, setActiveTab] = useState('email');
  const [emailForm] = Form.useForm();

  // 邮箱登录
  const handleEmailLogin = (values: any) => {
    console.log('Email login:', values);
  };

  // 手机验证码登录
  const handlePhoneLogin = (values: any) => {
    console.log('Phone login:', values);
  };

  // 第三方登录
  const handleThirdPartyLogin = (provider: string) => {
    console.log('Third party login:', provider);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-black mb-6">游戏管理发布平台</h1>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        centered
        size="large"
      >
        {/* 邮箱登录 */}
        <TabPane tab="邮箱登录" key="email">
          <Form
            form={emailForm}
            name="email-login"
            onFinish={handleEmailLogin}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              validateTrigger={[]}
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入邮箱地址"
                className="h-12"
                onChange={(e) => {
                  const value = e.target.value;
                  // 如果输入框被清空，立即清除错误提示
                  if (!value || value.trim() === '') {
                    emailForm.setFields([{ name: 'email', errors: [] }]);
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value && value.trim() !== '') {
                    // 延迟验证，避免在输入过程中显示错误
                    setTimeout(() => {
                      emailForm.validateFields(['email']);
                    }, 100);
                  } else {
                    // 清除错误信息
                    emailForm.setFields([{ name: 'email', errors: [] }]);
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              validateTrigger={[]}
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                className="h-12"
                onChange={(e) => {
                  const value = e.target.value;
                  // 如果输入框被清空，立即清除错误提示
                  if (!value || value.trim() === '') {
                    emailForm.setFields([{ name: 'password', errors: [] }]);
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value && value.trim() !== '') {
                    // 延迟验证，避免在输入过程中显示错误
                    setTimeout(() => {
                      emailForm.validateFields(['password']);
                    }, 100);
                  } else {
                    // 清除错误信息
                    emailForm.setFields([{ name: 'password', errors: [] }]);
                  }
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 text-lg font-medium"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* 手机验证码登录 */}
        <TabPane tab="手机登录" key="phone">
          <PhoneLoginForm onFinish={handlePhoneLogin} />
        </TabPane>
      </Tabs>

      {/* 第三方登录 */}
      <div className="mt-8 mb-6">
        <div className="flex justify-center space-x-6">
          <Button
            shape="circle"
            size="large"
            icon={<QqOutlined />}
            className="w-10 h-10 border-gray-400 text-gray-600 hover:text-gray-800 hover:border-gray-600"
            onClick={() => handleThirdPartyLogin('qq')}
          />
          <Button
            shape="circle"
            size="large"
            icon={<WechatOutlined />}
            className="w-10 h-10 border-gray-400 text-gray-600 hover:text-gray-800 hover:border-gray-600"
            onClick={() => handleThirdPartyLogin('wechat')}
          />
          <Button
            shape="circle"
            size="large"
            icon={<GoogleOutlined />}
            className="w-10 h-10 border-gray-400 text-gray-600 hover:text-gray-800 hover:border-gray-600"
            onClick={() => handleThirdPartyLogin('google')}
          />
          <Button
            shape="circle"
            size="large"
            icon={<GithubOutlined />}
            className="w-10 h-10 border-gray-400 text-gray-600 hover:text-gray-800 hover:border-gray-600"
            onClick={() => handleThirdPartyLogin('github')}
          />
        </div>
      </div>

      {/* 账户管理链接 */}
      <div className="text-center">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-600 transition-colors">
            注册账号
          </a>
          <span>|</span>
          <a href="#" className="hover:text-gray-600 transition-colors">
            账号找回
          </a>
          <span>|</span>
          <a href="#" className="hover:text-gray-600 transition-colors">
            密码找回
          </a>
        </div>
      </div>
    </div>
  );
}