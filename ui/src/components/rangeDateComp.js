import React from 'react';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export const RangeDateComp = ({ onChange }) => {
    return (
        <div>
            <RangePicker
                format="YYYY-MM-DD"
                onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                    onChange(value); 
                }}
                onOk={(value) => {
                    console.log('onOk: ', value);
                }}
            />
        </div>
    );
}
