import React, { useContext } from 'react';
import { Select } from 'antd';
import { DataContext } from '../context/dataContext';


export const SelecterComp = ({ selecterHeader, placeHolder, onChange, options, onClick }) => {
    const { countryList } = useContext(DataContext);

    return (
        <div>
            <h4>{selecterHeader}</h4>
            <Select
                mode="default"
                style={{ width: '100%' }}
                placeholder={placeHolder}
                onChange={onChange}
                options={countryList}
                onClick={onClick}
            />
        </div>
    );
};

export default SelecterComp;
