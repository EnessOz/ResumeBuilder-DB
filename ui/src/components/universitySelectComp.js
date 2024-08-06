import React, { useContext } from 'react';
import { Select } from 'antd';
import { DataContext } from '../context/dataContext';

const UniversitySelectComp = ({ selecterHeader, placeHolder, onChange }) => {
    const { universities } = useContext(DataContext);

   
    const filteredUniversities = universities.map(university => {
        if (university.title.startsWith("Category:")) {
            university.title = university.title.substring("Category:".length).trim();
        }
        return university;
    });

    return (
        <div>
            <h4>{selecterHeader}</h4>
            <Select
                mode="default"
                style={{ width: '100%' }}
                placeholder={placeHolder}
                onChange={onChange}
            >
                {filteredUniversities.map(university => (
                    <Select.Option key={university.pageid} value={university.title}>
                        {university.title}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default UniversitySelectComp;
