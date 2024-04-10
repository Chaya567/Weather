const API_KEY = 'b71ca2424f7ca2f981190ce292e41ccd';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (cityName) => {
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
};

const displayWeather = (weatherData) => {
  const weatherInfo = document.getElementById('weatherInfo');
  if (weatherInfo) {
    weatherInfo.innerHTML = '';

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${weatherData.temperature}°C`;

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;

    const windSpeedElement = document.createElement('p');
    windSpeedElement.textContent = `Wind Speed: ${weatherData.windSpeed} m/s`;

    weatherInfo.appendChild(temperatureElement);
    weatherInfo.appendChild(humidityElement);
    weatherInfo.appendChild(windSpeedElement);
  }
};

document.getElementById("weatherForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const cityName = document.getElementById("cityName").value.trim();
  try {
    const weatherData = await getWeather(cityName);
    displayWeather(weatherData);
  } catch (error) {
    console.error(error);
    alert('Failed to retrieve weather data. Please try again later.');
  }
});
