const API_KEY = 'b71ca2424f7ca2f981190ce292e41ccd';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(cityName) {
  const url = `${API_BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weatherData = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
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