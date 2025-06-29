'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface CarouselItem {
  id: number;
  type: 'image' | 'text' | 'video';
  content: string;
  url?: string;
  title?: string;
  description?: string;
}

const carouselData: CarouselItem[] = [
  {
    id: 1,
    type: 'image',
    content: 'https://picsum.photos/800/600?random=1',
    url: '#',
    title: '游戏发布管理',
    description: '一键发布，轻松管理您的游戏作品',
  },
  {
    id: 2,
    type: 'text',
    content: '',
    url: '#',
    title: '数据分析洞察',
    description: '实时数据分析，助力游戏运营决策',
  },
  {
    id: 3,
    type: 'image',
    content: 'https://picsum.photos/800/600?random=2',
    url: '#',
    title: '社区互动',
    description: '构建玩家社区，提升用户粘性',
  },
];

export function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(5000); // 5秒
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 5000; // 5秒

  // 重置计时器
  const resetTimer = () => {
    setRemainingTime(SLIDE_DURATION);
  };

  // 下一张
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    resetTimer();
  };

  // 上一张
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    resetTimer();
  };

  // 跳转到指定项目
  const handleItemClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  // 处理鼠标悬停
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  // 处理鼠标离开
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // 主计时器逻辑
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // 启动倒计时
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 100) {
          nextSlide();
          return SLIDE_DURATION;
        }
        return prev - 100;
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  // 计算进度百分比
  const progress = ((SLIDE_DURATION - remainingTime) / SLIDE_DURATION) * 100;

  return (
    <div 
      className="relative h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 轮播内容 */}
      <div 
        className="w-full h-full flex transition-transform duration-500 ease-in-out cursor-pointer"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onClick={() => handleItemClick(carouselData[currentIndex].url || '#')}
      >
        {carouselData.map((item, index) => (
          <div key={item.id} className="w-full h-full flex-shrink-0 relative">
            {item.type === 'image' ? (
              <div className="w-full h-full bg-cover bg-center relative"
                   style={{ backgroundImage: `url(${item.content})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
                  <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                  <p className="text-xl text-center max-w-md">{item.description}</p>
                </div>
              </div>
            ) : item.type === 'text' ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl text-center max-w-md">{item.description}</p>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-900 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl text-center max-w-md">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>


      {/* 计时指示器和控制按钮 */}
      <div className="absolute bottom-6 right-6 flex items-center space-x-4">
        {/* 进度圆圈 */}
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            {/* 背景圆圈 */}
            <path
              className="text-white text-opacity-20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* 进度圆圈 */}
            <path
              className="text-white"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {Math.ceil(remainingTime / 1000)}
            </span>
          </div>
        </div>

        {/* 左右箭头 */}
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded transition-all duration-200 backdrop-blur-sm"
          >
            <LeftOutlined />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded transition-all duration-200 backdrop-blur-sm"
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      {/* 底部指示点 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}