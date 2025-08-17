import { useState, useEffect } from 'react';
import type { WeatherData } from './types';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Fetch weather data from an API
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=55,81650&lon=11,94248&units=metric&lang=da&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const data = await response.json();
      setWeather(data);
    };

    fetchWeather();
  }, []);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">My weather app</h1>
      <p className="mb-4">Get the latest weather updates for your location.</p>
      {weather && (
        <div className="text-center">
          <img
            className="mx-auto mb-2"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt=""
          />
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperatur: {weather.main.temp.toFixed(0)}°C</p>
          <p>Luftfugtighed: {weather.main.humidity}%</p>
          <p>Vindhastighed: {weather.wind.speed.toFixed(0)} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
