import React from 'react';
import TabMenu from '../components/tabMenu';
import { DataProvider } from '../context/dataContext';

const InputPage = () => {
    const token = localStorage.getItem('token');

    return (
        <div>
            <DataProvider>
                {token ? <TabMenu /> : <p>Login Please</p>}
            </DataProvider>
        </div>
    );
};

export default InputPage;
