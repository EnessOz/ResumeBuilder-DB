import TextArea from 'antd/es/input/TextArea'
import React from 'react'

export const InputCompLong = ({inputLongHeader, placeholder, onChange, maxLength}) => {
    return (
        <div>
            <h4>{inputLongHeader}</h4>
            <TextArea
                showCount
                maxLength={maxLength}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    height: 120,
                    resize: 'none',
                }}
            />
        </div>
    )
}
