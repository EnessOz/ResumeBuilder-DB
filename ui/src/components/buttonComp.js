import React from 'react'
import { Button } from 'antd';

export const ButtonComp = ({ buttonText, onClick, buttonClass }) => {
    return (
        <div style={{ paddingTop: "20px" }}>
            <Button className={buttonClass} onClick={onClick}>{buttonText}</Button>
        </div>
    )
}
