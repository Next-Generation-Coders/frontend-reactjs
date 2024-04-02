import React, { useState } from 'react';
import CustomSelect from '@ui/CustomSelect';
import classNames from 'classnames';
import countryList from 'react-select-country-list';
import { City } from 'country-state-city';

const CountryCitySelector = ({ onSelectedCountry, onSelectedCity }) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [cities, setCities] = useState([]);

  const getCountriesOptions = () => {
    let countries = countryList().getData();
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].value === 'RU') {
        countries[i].label = 'Russia [terrorist state]';
      }
    }
    return countries;
  }

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); 
    
    const rawData = City.getCitiesOfCountry(country.value);
    const options = rawData.map((item) => ({ value: item.name, label: item.name }));
    setCities(options);


    if (onSelectedCountry) {
      onSelectedCountry(country);
    }
  };


  const handleCityChange = (city) => {
    setSelectedCity(city);


    if (onSelectedCity) {
      onSelectedCity(city);
    }
  };

  

  return (
    <div>
      <div>
        <CustomSelect
          options={getCountriesOptions()}
          value={selectedCountry}
          onChange={(value) => {
            setSelectedCountry(value);
            handleCountryChange(value);
          }}
          placeholder="Country"
          isSearchable={true}
          variant="basic"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <CustomSelect
          options={cities}
          value={selectedCity}
          onChange={(value) => {
            setSelectedCity(value);
            handleCityChange(value);
          }}
          placeholder="City"
          isSearchable={true}
          variant="basic"
        />
      </div>
    </div>
  );
}

export default CountryCitySelector;
