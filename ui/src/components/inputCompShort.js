import React from 'react'
import { Input } from 'antd';

export const InputCompShort = ({ placeholder, inputShortHeader, type, onChange, onClick, maxLength }) => {
    return (
        <div className='input-comp-short-container'>
            <h4 style={{ fontSize: "30px" }}>{inputShortHeader}</h4>
            <Input placeholder={placeholder} type={type} onChange={onChange} onClick={onClick} maxLength={maxLength} />
        </div>
    )
}
