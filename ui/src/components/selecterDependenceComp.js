import React, { useContext } from 'react';
import { Select } from 'antd';
import { DataContext } from '../context/dataContext';

export const SelecterDependenceComp = ({ selecterHeader, placeHolder, onChange }) => {
  const { countryList, setSelectedCountry } = useContext(DataContext);

  const handleChange = (value) => {
    setSelectedCountry(value);
    onChange(value); 
  };

  return (
    <div>
      <h4>{selecterHeader}</h4>
      <Select
        mode="default"
        style={{ width: '100%' }}
        placeholder={placeHolder}
        onChange={handleChange}
        options={countryList}
      />
    </div>
  );
};

export default SelecterDependenceComp;
