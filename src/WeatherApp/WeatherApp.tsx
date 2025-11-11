import "./WeatherApp.css";
import { useCallback, useEffect, useRef, useState } from "react";

const API_KEY = "890ddfaf688043ff9d5173200252710";
const API_BASE = "http://api.weatherapi.com/v1";

const WeatherApp = () => {
  const [units, setUnits] = useState("");
  const [city, setCity] = useState("New York");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState("");

  const fetchWeatherData = useCallback(async (cityName: any) => {
    if (!API_KEY) {
      console.log("API_KEY error");
      return;
    }
    try {
      const url = `${API_BASE}/current.json?q=${encodeURIComponent(
        cityName
      )}&key=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json;
      console.log(data);
      setWeather(data);
      const currentTemp =
        units === "metric" ? weather.current.temp_c : weather.current.temp_f;
      setTemp(currentTemp);
    } catch {
      console.log("Error fetching data");
    }
  }, [units, weather]);

  const onSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    fetchWeatherData(query);
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city, fetchWeatherData]);

  return (
    <div className="weather-app">
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <section>
          <form onSubmit={onSearch}>
            <input
              placeholder="Type City"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button type="submit">Search</button>
          </form>
          <select value={units} onChange={(e) => setUnits(e.target.value)}>
            <option value="metric">Metric C</option>
            <option value="imperial">Imperial F</option>
          </select>
          <span>{temp}</span>
        </section>
      </main>
    </div>
  );
};

export default WeatherApp;
