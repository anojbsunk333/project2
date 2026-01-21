import React, { useEffect, useState } from "react";
import "./Weather.css";
import { useRef } from "react";
import search_icon from "../assets/search.png";
import sunny_icon from "../assets/sunny.png";
import cloudy_icon from "../assets/cloudy.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import search2_icon from "../assets/search2.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}&units=metric&aqi=no
`;

      const response = await fetch(url);
      const data = await response.json();
      //   console.log(data);
      //   setResponse(data);
      setWeatherData({
        humidity: data.current.humidity,
        windSpeed: data.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        location: data.location.name,
        text: data.current.condition.text,
        icon: data.current.condition.icon,
      });
    } catch (error) {}
  };

  useEffect(() => {
    search("Pokhara");
  }, []);

  return (
    <div className="weather">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(inputRef.current.value);
        }}
        className="search-bar"
      >
        <input ref={inputRef} type="text" placeholder="Search" />
        <button
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
          }}
        >
          <svg
            onClick={() => search(inputRef.current.value)}
            className="img"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth={2}
              d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"
            ></path>
          </svg>
        </button>
      </form>
      <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">
        {weatherData.location} "{weatherData.text}"
      </p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
