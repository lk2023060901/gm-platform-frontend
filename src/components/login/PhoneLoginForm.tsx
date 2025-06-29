'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MobileOutlined, SafetyOutlined } from '@ant-design/icons';

interface PhoneLoginFormProps {
  onFinish: (values: any) => void;
}

export function PhoneLoginForm({ onFinish }: PhoneLoginFormProps) {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 发送验证码
  const handleSendCode = async () => {
    const phone = phoneValue;
    
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      message.error('请输入有效的手机号码');
      return;
    }

    setLoading(true);
    
    try {
      // TODO: 实际的验证码发送逻辑
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API调用
      
      message.success('验证码已发送');
      setCountdown(60); // 60秒倒计时
    } catch (error) {
      message.error('验证码发送失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 获取发送按钮文本
  const getSendButtonText = () => {
    if (loading) return '发送中...';
    if (countdown > 0) return `${countdown}秒后重发`;
    return '发送验证码';
  };

  // 检查手机号是否有效
  const isValidPhone = () => {
    return phoneValue && /^1[3-9]\d{9}$/.test(phoneValue);
  };

  // 处理手机号输入变化
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneValue(value);
    form.setFieldsValue({ phone: value });
    
    // 如果输入框被清空，立即清除错误提示
    if (!value || value.trim() === '') {
      form.setFields([{ name: 'phone', errors: [] }]);
    }
  };

  return (
    <Form
      form={form}
      name="phone-login"
      onFinish={onFinish}
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="phone"
        validateTrigger={[]}
        rules={[
          { required: true, message: '请输入手机号码' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
        ]}
      >
        <Input
          prefix={<MobileOutlined />}
          placeholder="请输入手机号码"
          className="h-12"
          maxLength={11}
          value={phoneValue}
          onChange={handlePhoneChange}
          onBlur={(e) => {
            const value = e.target.value;
            if (value && value.trim() !== '') {
              // 延迟验证，避免在输入过程中显示错误
              setTimeout(() => {
                form.validateFields(['phone']);
              }, 100);
            } else {
              // 清除错误信息
              form.setFields([{ name: 'phone', errors: [] }]);
            }
          }}
        />
      </Form.Item>

      <Form.Item
        name="code"
        validateTrigger={[]}
        rules={[
          { required: true, message: '请输入验证码' },
          { len: 6, message: '验证码为6位数字' }
        ]}
      >
        <Input
          prefix={<SafetyOutlined />}
          placeholder="请输入验证码"
          className="h-12"
          maxLength={6}
          onChange={(e) => {
            const value = e.target.value;
            // 如果输入框被清空，立即清除错误提示
            if (!value || value.trim() === '') {
              form.setFields([{ name: 'code', errors: [] }]);
            }
          }}
          onBlur={(e) => {
            const value = e.target.value;
            if (value && value.trim() !== '') {
              // 延迟验证，避免在输入过程中显示错误
              setTimeout(() => {
                form.validateFields(['code']);
              }, 100);
            } else {
              // 清除错误信息
              form.setFields([{ name: 'code', errors: [] }]);
            }
          }}
          suffix={
            <Button
              type="text"
              className="h-full px-4 min-w-[100px] border-0 text-gray-700 hover:text-blue-500 disabled:text-gray-400"
              disabled={!isValidPhone() || countdown > 0 || loading}
              loading={loading}
              onClick={handleSendCode}
            >
              {getSendButtonText()}
            </Button>
          }
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
  );
}