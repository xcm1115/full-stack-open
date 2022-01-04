import React, { Fragment, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesShow, setCountriesShow] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(res => {
      const data = res.data;
      setCountries(data);
    });
  }, [])

  const handleSearchValue = async event => {
    let value = event.target.value;

    console.log(value)

    setSearchValue(value);

    if (value === '') {
      setCountriesShow('');
    } else {
      let data = countries.filter(item => {
        return item.name.common.toLowerCase().includes(value.toLowerCase());
      });

      if (data.length === 0) {
        setCountriesShow('');
      } else if (data.length === 1) {
        const apiKey = process.env.REACT_APP_API_KEY;
        const country = data[0];
        const capitals = country.capital;

        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${capitals[0]}&appid=${apiKey}`;
        let weatherData = await axios.get(weatherUrl);
        weatherData = weatherData.data;

        const show = (
          <Fragment>
            <h1>{country.name.common}</h1>
            <div>capital {capitals.map(item => item)}</div>
            <div>population {country.population}</div>

            <h2>Spoken languages</h2>
            <ul>
              {Object.values(country.languages).map((item, index) => <li key={index}>{item}</li>)}
            </ul>

            <h2>Weather in {capitals[0]}</h2>
            <p><b>temperature: {Math.round(weatherData.main.temp - 273.15)} Celcius</b></p>
            <p><b>wind: {weatherData.wind.speed} mph</b></p>
            <img src={country.flags.png} alt="flag" />
          </Fragment>
        )

        setCountriesShow(show);
      } else if (data.length > 10) {
        let show = 'Too many matches, specify another filter';

        setCountriesShow(show);
      } else {
        let show = data.map(item => {
          return (
            <Fragment key={item.area}>
              <div className="top-space">
                <span>{item.name.common}</span>
                <button className="left-space" onClick={showInfo(item.name.common)}>show</button>
              </div>

              <div id={item.name.common} style={{ display: 'none' }}>
                <h1>{item.name.common}</h1>
                <div>capital {item.capital.map(item => item)}</div>
                <div>population {item.population}</div>
                <h2>languages</h2>
                <ul>
                  {Object.values(item.languages).map((item, index) => <li key={index}>{item}</li>)}
                </ul>
                <img src={item.flags.png} alt="flag" />
              </div>
            </Fragment>
          )
        })

        setCountriesShow(show);
      }
    }

    console.log(countriesShow);
  }

  const showInfo = name => {
    return () => {
      let el = document.getElementById(name);

      if (el.style.display === 'none')
        el.style.display = 'block';
      else
        el.style.display = 'none';
    }
  }

  return (
    <Fragment>
      <div>
        find countries <input value={searchValue} onChange={handleSearchValue} />
      </div>
      {countriesShow}
    </Fragment>
  )
}

export default App;