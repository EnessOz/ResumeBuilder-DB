import React, { createContext, useState, useEffect } from 'react';
import countries from '../data/countries.json';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [countryList, setCountryList] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    
    const countryOptions = countries.map(country => ({
      label: country.name,
      value: country.name
    }));
    setCountryList(countryOptions);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchUniversities = async () => {
        try {
          const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Universities_and_colleges_in_${selectedCountry}&cmlimit=500&origin=*`);
          const data = await response.json();
          setUniversities(data.query.categorymembers || []);
        } catch (error) {
          console.error('Error fetching universities:', error);
        }
      };
      fetchUniversities();
    }
  }, [selectedCountry]);
  console.log(universities)

  return (
    <DataContext.Provider value={{ countryList, universities, setSelectedCountry }}>
      {children}
    </DataContext.Provider>
  );
};
