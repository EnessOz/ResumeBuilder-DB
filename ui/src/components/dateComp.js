import React from 'react';
import { DatePicker, Space, message } from 'antd';

export const DateComp = ({ onChange }) => {
  const handleChange = (date, dateString) => {
    const currentDate = new Date();
    const selectedDate = new Date(dateString);
    let age = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDifference = currentDate.getMonth() - selectedDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < selectedDate.getDate())) {
      age--;
    }

    if (age < 18) {
      message.error('You must be at least 18 years old!');
    } else {
      console.log(date, dateString);
      onChange(dateString); 
    }
  };

  const disabledDate = (current) => {
    return current && current > new Date();
  };

  return (
    <div>
      <Space direction="vertical">
        <DatePicker
          placeholder='Date of Birth'
          format="YYYY-MM-DD"
          onChange={handleChange}
          disabledDate={disabledDate}
        />
      </Space>
    </div>
  );
};
