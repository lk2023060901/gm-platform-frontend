'use client';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// 定义Calendar组件的Value类型
type CalendarValue = Date | null;

interface CalendarWidgetProps {
  className?: string;
}

// 节假日API数据接口
interface HolidayApiData {
  holiday: {
    [key: string]: {
      holiday: boolean;
      name: string;
      wage: number;
      date: string;
    };
  };
}

// 节假日详细信息接口
interface HolidayInfo {
  date: string;
  name: string;
  isMainDay: boolean;
  isHoliday: boolean;
  isWorkday: boolean;
}

export function CalendarWidget({ className }: CalendarWidgetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
  const [holidayData, setHolidayData] = useState<{ [key: string]: HolidayInfo }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [holidayOptions, setHolidayOptions] = useState<Array<{ value: string; label: string; disabled?: boolean }>>([{ value: '', label: '假期', disabled: true }]);
  const [isClient, setIsClient] = useState(false);

  // 节日名称
  const mainHolidayNames = ['元旦', '除夕', '清明节', '劳动节', '端午节', '中秋节', '国庆节'];

  // 备用节假日数据（防止API失败）- 2025年完整版
  const fallbackHolidayData: { [key: string]: HolidayInfo } = {
    // 元旦
    '2025-01-01': { date: '2025-01-01', name: '元旦', isMainDay: true, isHoliday: true, isWorkday: false },

    // 春节调休和假期
    '2025-01-26': { date: '2025-01-26', name: '春节调休', isMainDay: false, isHoliday: false, isWorkday: true },
    '2025-01-28': { date: '2025-01-28', name: '除夕', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-01-29': { date: '2025-01-29', name: '春节', isMainDay: true, isHoliday: true, isWorkday: false },
    '2025-01-30': { date: '2025-01-30', name: '春节假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-01-31': { date: '2025-01-31', name: '春节假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-02-01': { date: '2025-02-01', name: '春节假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-02-02': { date: '2025-02-02', name: '春节假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-02-03': { date: '2025-02-03', name: '春节假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-02-08': { date: '2025-02-08', name: '春节调休', isMainDay: false, isHoliday: false, isWorkday: true },

    // 清明节
    '2025-04-05': { date: '2025-04-05', name: '清明节', isMainDay: true, isHoliday: true, isWorkday: false },
    '2025-04-06': { date: '2025-04-06', name: '清明假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-04-07': { date: '2025-04-07', name: '清明假期', isMainDay: false, isHoliday: true, isWorkday: false },

    // 劳动节调休和假期
    '2025-04-27': { date: '2025-04-27', name: '劳动节调休', isMainDay: false, isHoliday: false, isWorkday: true },
    '2025-05-01': { date: '2025-05-01', name: '劳动节', isMainDay: true, isHoliday: true, isWorkday: false },
    '2025-05-02': { date: '2025-05-02', name: '劳动节假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-05-03': { date: '2025-05-03', name: '劳动节假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-05-04': { date: '2025-05-04', name: '劳动节假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-05-05': { date: '2025-05-05', name: '劳动节假期', isMainDay: false, isHoliday: true, isWorkday: false },

    // 端午节
    '2025-05-31': { date: '2025-05-31', name: '端午节', isMainDay: true, isHoliday: true, isWorkday: false },
    '2025-06-01': { date: '2025-06-01', name: '端午假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-06-02': { date: '2025-06-02', name: '端午假期', isMainDay: false, isHoliday: true, isWorkday: false },

    // 中秋节和国庆节调休和假期
    '2025-09-28': { date: '2025-09-28', name: '国庆节调休', isMainDay: false, isHoliday: false, isWorkday: true },
    '2025-10-01': { date: '2025-10-01', name: '国庆节', isMainDay: true, isHoliday: true, isWorkday: false },
    '2025-10-02': { date: '2025-10-02', name: '国庆假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-10-03': { date: '2025-10-03', name: '国庆假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-10-04': { date: '2025-10-04', name: '国庆假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-10-05': { date: '2025-10-05', name: '国庆假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-10-06': { date: '2025-10-06', name: '中秋节', isMainDay: true, isHoliday: true, isWorkday: false },
    '2025-10-07': { date: '2025-10-07', name: '国庆假期', isMainDay: false, isHoliday: true, isWorkday: false },
    '2025-10-11': { date: '2025-10-11', name: '国庆节调休', isMainDay: false, isHoliday: false, isWorkday: true },
  };

  // 获取节假日数据
  const fetchHolidayData = async (year: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://timor.tech/api/holiday/year/${year}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: HolidayApiData = await response.json();
      console.log("holiday: ", data.holiday)

      const processedData: { [key: string]: HolidayInfo } = {};

      if (data.holiday) {
        Object.entries(data.holiday).forEach(([dateStr, info]) => {
          const isMainDay = Boolean(
            info.name &&
            !info.name.includes('假期') &&
            !info.name.includes('调休') &&
            mainHolidayNames.some(name => info.name.includes(name) || info.name === name)
          );

          processedData[dateStr] = {
            date: dateStr,
            name: info.name,
            isMainDay: isMainDay,
            isHoliday: Boolean(info.holiday),
            isWorkday: !info.holiday && (typeof info.wage === 'number' ? info.wage > 1 : false) // wage > 1 表示调休工作日
          };
        });
      }

      setHolidayData(processedData);
      console.log(`成功获取${year}年节假日数据:`, Object.keys(processedData).length, '条记录');
      console.log('节假日数据示例:', Object.entries(processedData).slice(0, 10));
      console.log('API原始数据:', data);
    } catch (error) {
      console.error('获取节假日数据失败:', error);
      setError('节假日数据获取失败，使用备用数据');

      // 使用备用数据
      const yearData = Object.fromEntries(
        Object.entries(fallbackHolidayData).filter(([date]) =>
          date.startsWith(year.toString())
        )
      );
      console.log('使用备用节假日数据:', yearData);
      setHolidayData(yearData);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时初始化
  useEffect(() => {
    setIsClient(true);
    const now = new Date();
    setSelectedDate(now);
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));

    // 直接使用静态数据，简单有效
    //setHolidayData(fallbackHolidayData);
    setLoading(false);
  }, []);

  // 当年份变化时重新获取数据
  useEffect(() => {
    if (!currentMonth) return;
    const year = currentMonth.getFullYear();
    if (Object.keys(holidayData).length === 0 || !Object.keys(holidayData)[0]?.startsWith(year.toString())) {
      fetchHolidayData(year);
    }
  }, [currentMonth]);

  // 当节假日数据或月份变化时，更新假期选项
  useEffect(() => {
    if (!currentMonth) return;
    const year = currentMonth.getFullYear();
    const options = getHolidayOptions(year);
    setHolidayOptions(options);
  }, [holidayData, currentMonth]);


  // 处理日期选择
  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  // 处理年份变化
  const handleYearChange = (year: number) => {
    if (!currentMonth) return;
    const newDate = new Date(year, currentMonth.getMonth(), 1);
    setCurrentMonth(newDate);
  };

  // 处理月份变化
  const handleMonthChange = (month: number) => {
    if (!currentMonth) return;
    const newDate = new Date(currentMonth.getFullYear(), month, 1);
    setCurrentMonth(newDate);
  };

  // 处理上一个月
  const handlePrevMonth = () => {
    if (!currentMonth) return;
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(newDate);
  };

  // 处理下一个月
  const handleNextMonth = () => {
    if (!currentMonth) return;
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(newDate);
  };

  // 处理假期选择
  const handleHolidayChange = (holidayDate: string) => {
    const currentYear = new Date().getFullYear();
    const [monthStr, dayStr] = holidayDate.split('-');
    const month = parseInt(monthStr, 10) - 1
    const day = parseInt(dayStr, 10);
    console.log("handleHolidayChange.getFullYear = ", currentYear)
    console.log("handleHolidayChange.day = ", month)
    console.log("handleHolidayChange.getMonth = ", day)
    const date = new Date(currentYear, month, day);
    setSelectedDate(date);
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  // 跳转到今天
  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // 获取当年的主要节假日选项 - 简化版
  const getHolidayOptions = (year: number) => {
    const mainHolidays = Object.values(holidayData)
      .filter(holiday => holiday.isMainDay && mainHolidayNames.includes(holiday.name))
      .sort((a, b) => a.date.localeCompare(b.date));

    // 去重逻辑：保留 name 第一次出现的那一天
    const seen = new Set<string>();
    const uniqueHolidays = mainHolidays.filter(h => {
      if (seen.has(h.name)) return false;
      seen.add(h.name);
      return true;
    });

    return [
      { value: '', label: '假期', disabled: true },
      ...uniqueHolidays.map(holiday => ({
        value: holiday.date,
        label: holiday.name
      }))
    ];
  };

  // 生成年份选项（1900年到当前年份+25年）
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 1900; year <= currentYear + 25; year++) {
    yearOptions.push({ value: year, label: `${year}年` });
  }

  // 生成月份选项
  const monthOptions = [
    { value: 0, label: '1月' },
    { value: 1, label: '2月' },
    { value: 2, label: '3月' },
    { value: 3, label: '4月' },
    { value: 4, label: '5月' },
    { value: 5, label: '6月' },
    { value: 6, label: '7月' },
    { value: 7, label: '8月' },
    { value: 8, label: '9月' },
    { value: 9, label: '10月' },
    { value: 10, label: '11月' },
    { value: 11, label: '12月' },
  ];

  // 判断是否为节假日
  const isHoliday = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return holidayData[dateStr]?.isHoliday || false;
  };

  // 判断是否为调休工作日
  const isWorkday = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const holidayInfo = holidayData[dateStr];
    return holidayInfo?.isWorkday || false;
  };

  // 判断是否为双休日（周六或周日）
  const isWeekend = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0是周日，6是周六
  };

  // 使用专业库获取节气信息
  const getSolarTerm = (date: Date): string => {
    try {
      // 动态导入lunar-javascript库
      const { Solar } = require('lunar-javascript');
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();

      // 获取当天的节气
      const jieQi = lunar.getJieQi();
      return jieQi || '';
    } catch (error) {
      console.error('节气获取失败:', error);
      return '';
    }
  };

  // 使用专业库获取阴历日期
  const getLunarDate = (date: Date): string => {
    try {
      // 动态导入lunar-javascript库
      const { Solar } = require('lunar-javascript');
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();

      // 获取阴历日期
      const day = lunar.getDay();

      // 转换为中文表示
      if (day === 1) return '初一';
      if (day <= 10) return `初${day === 10 ? '十' : ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'][day]}`;
      if (day <= 19) return `${day === 10 ? '十' : '十' + ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'][day - 10]}`;
      if (day <= 29) return `廿${['', '一', '二', '三', '四', '五', '六', '七', '八', '九'][day - 20]}`;
      return '三十';
    } catch (error) {
      console.error('阴历转换失败:', error);
      return '';
    }
  };

  // 获取显示信息（节气优先于农历）
  const getDisplayInfo = (date: Date) => {
    const solarTerm = getSolarTerm(date);
    if (solarTerm) {
      return solarTerm;
    }
    return getLunarDate(date);
  };

  // 自定义日期单元格内容
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const displayInfo = getDisplayInfo(date);
    const isHol = isHoliday(date);
    const isWork = isWorkday(date);

    return (
      <div className="tile-content">
        <div className="date-number">{date.getDate()}</div>
        {displayInfo && <div className="lunar-info">{displayInfo}</div>}
        {isHol && <div className="holiday-indicator">休</div>}
        {isWork && <div className="workday-indicator">班</div>}
      </div>
    );
  };

  // 日期单元格样式类名
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return '';

    const classes = [];

    if (isHoliday(date)) {
      classes.push('holiday-tile');
    }

    if (isWorkday(date)) {
      classes.push('workday-tile');
    }

    // 如果是调休工作日，即使是周末也不显示红色
    if ((isHoliday(date) || isWeekend(date)) && !isWorkday(date)) {
      classes.push('red-text-date');
    }

    return classes.join(' ');
  };

  // 在客户端渲染之前显示加载状态
  if (!isClient || !selectedDate || !currentMonth) {
    return (
      <div className={`w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="h-full flex flex-col">
        {/* 标题区域 */}
        <div className="px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">日程安排</h2>
          <p className="text-sm text-gray-600 mt-1">
            公司活动和重要日期
            {loading && <span className="text-xs text-blue-500">(加载中...)</span>}
            {error && <span className="text-xs text-orange-500">({error})</span>}
          </p>
        </div>

        {/* 导航和日历一体化区域 */}
        <div className="flex-1 bg-white">
          {/* 自定义导航区域 */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Select
                value=""
                onChange={handleHolidayChange}
                options={holidayOptions}
                className="w-20 text-center"
                size="small"
                placeholder="假期"
                style={{ textAlign: 'center' }}
                dropdownMatchSelectWidth={true}
              />

              <div className="flex items-center gap-2">
                <Select
                  value={currentMonth.getFullYear()}
                  onChange={handleYearChange}
                  options={yearOptions}
                  className="w-24"
                  size="small"
                  showSearch
                  filterOption={(input, option) =>
                    option?.label?.toString().includes(input) ?? false
                  }
                  dropdownMatchSelectWidth={true}
                />

                <button
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="上一个月"
                >
                  <LeftOutlined className="text-gray-500 text-xs" />
                </button>

                <Select
                  value={currentMonth.getMonth()}
                  onChange={handleMonthChange}
                  options={monthOptions}
                  className="w-20"
                  size="small"
                  dropdownMatchSelectWidth={true}
                />

                <button
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="下一个月"
                >
                  <RightOutlined className="text-gray-500 text-xs" />
                </button>
              </div>

              <button
                onClick={handleToday}
                className="px-2 py-1 text-xs text-gray-600 bg-gray-100 border border-gray-200 rounded transition-colors hover:bg-gray-200"
                title="跳转到今天"
              >
                今天
              </button>
            </div>
          </div>

          {/* 日历区域 */}
          <div className="p-4">
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              activeStartDate={currentMonth}
              onActiveStartDateChange={({ activeStartDate }) => {
                if (activeStartDate) {
                  setCurrentMonth(activeStartDate);
                }
              }}
              className="w-full custom-calendar"
              formatShortWeekday={(locale, date) => {
                const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
                return weekdays[date.getDay()];
              }}
              tileClassName={tileClassName}
              tileContent={tileContent}
              showNavigation={false}
              showFixedNumberOfWeeks={true}
            />
          </div>
        </div>
      </div>

      {/* 自定义样式 */}
      <style jsx global>{`
        .custom-calendar {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          background: transparent !important;
          font-family: inherit !important;
        }
        
        .custom-calendar .react-calendar__month-view {
          width: 100% !important;
        }
        
        .custom-calendar .react-calendar__month-view__weekdays {
          padding: 8px 0 !important;
        }
        
        .custom-calendar .react-calendar__month-view__weekdays__weekday {
          padding: 8px !important;
          font-size: 12px !important;
          color: #6b7280 !important;
          font-weight: 500 !important;
          text-align: center !important;
        }
        
        .custom-calendar .react-calendar__month-view__days {
          width: 100% !important;
          display: grid !important;
          grid-template-columns: repeat(7, 1fr) !important;
          gap: 6px !important;
          padding: 0 !important;
          box-sizing: border-box !important;
        }
        
        .custom-calendar .react-calendar__month-view__days__day {
          width: 100% !important;
          min-height: 48px !important;
          max-width: none !important;
        }
        
        .custom-calendar .react-calendar__tile {
          border: 2px solid transparent !important;
          border-radius: 4px !important;
          box-sizing: border-box !important;
          margin: 0 !important;
          padding: 4px !important;
          background: transparent !important;
          position: relative !important;
          overflow: visible !important;
          font-size: 14px !important;
          font-weight: normal !important;
        }
        
        .custom-calendar .react-calendar__tile:hover {
          background-color: #f3f4f6 !important;
        }
        
        .custom-calendar .react-calendar__tile--active {
          background-color: transparent !important;
          border-color: #3b82f6 !important;
          font-weight: normal !important;
          outline: none !important;
          color: inherit !important;
        }
        
        .custom-calendar .react-calendar__tile--active .date-number {
          color: inherit !important;
        }
        
        .custom-calendar .react-calendar__tile--now {
          background-color: transparent !important;
          font-weight: bold !important;
          color: #3b82f6 !important;
        }
        
        .custom-calendar .react-calendar__tile--now.red-text-date {
          color: #dc2626 !important;
        }
        
        .custom-calendar .red-text-date .date-number {
          color: #dc2626 !important;
        }
        
        .custom-calendar .holiday-tile {
          background-color: #fce7f3 !important;
          border-radius: 8px !important;
          border: none !important;
        }
        
        .custom-calendar .workday-tile {
          background-color: #f3f4f6 !important;
          border-radius: 8px !important;
          border: none !important;
        }
        
        .custom-calendar .tile-content {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          height: 100% !important;
          position: relative !important;
        }
        
        .custom-calendar .date-number {
          font-size: 18px !important;
          line-height: 1 !important;
          margin-bottom: 2px !important;
        }
        
        .custom-calendar .lunar-info {
          font-size: 12px !important;
          color: #9ca3af !important;
          line-height: 1 !important;
        }
        
        .custom-calendar .holiday-indicator {
          position: absolute !important;
          top: 0 !important;
          right: 0 !important;
          font-size: 12px !important;
          color: white !important;
          background: #dc2626 !important;
          border: none !important;
          border-radius: 2px !important;
          padding: 1px 2px !important;
          line-height: 1 !important;
          transform: translate(50%, -50%) !important;
        }
        
        .custom-calendar .workday-indicator {
          position: absolute !important;
          top: 0 !important;
          right: 0 !important;
          font-size: 12px !important;
          color: white !important;
          background: #6b7280 !important;
          border: none !important;
          border-radius: 2px !important;
          padding: 1px 2px !important;
          line-height: 1 !important;
          transform: translate(50%, -50%) !important;
        }
        
        .custom-calendar .react-calendar__tile abbr {
          display: none !important;
        }
        
      `}</style>
    </div>
  );
}