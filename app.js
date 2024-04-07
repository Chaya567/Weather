import axios from 'axios';

const API_KEY = 'b71ca2424f7ca2f981190ce292e41ccd';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(cityName) {
  const url = `${API_BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await axios.get(url);
    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };
    return weatherData;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}

function displayWeather(weatherData) {
  const weatherInfo = document.getElementById('weatherInfo');
  if (weatherInfo !== null) {
    weatherInfo.innerHTML = `
        <p>Temperature: ${weatherData.temperature}°C</p>
        <p>Humidity: ${weatherData.humidity}%</p>
        <p>Wind Speed: ${weatherData.windSpeed} m/s</p>
    `;
  }
}

export { getWeather };
