import { useState, useEffect } from 'react';
import type { WeatherData } from './types';
import { useLocation } from './hooks/useLocation';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const { location, error, isLocating } = useLocation();

  useEffect(() => {
    if (!isLocating && location) {
      const fetchWeather = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            location.lat
          }&lon=${location.long}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        );
        const data = await response.json();
        setWeather(data);
      };

      fetchWeather();
    }
  }, [location, isLocating]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">Your weather</h1>
      <p className="mb-4">Weather based on your location.</p>
      {weather && !error ? (
        <div className="text-center">
          <img
            className="mx-auto mb-2"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt=""
          />
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp.toFixed(0)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed.toFixed(0)} m/s</p>
        </div>
      ) : (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
}

export default App;
