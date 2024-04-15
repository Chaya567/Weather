const API_KEY = 'b71ca2424f7ca2f981190ce292e41ccd';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (cityName) => {
  const url = `${API_BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weatherData = {
      temperature: data.main.temp,
      city: data.name // שם העיר מתשובת ה- API
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

    const weatherElement = document.createElement('p');
    weatherElement.textContent = `${weatherData.city}\n${weatherData.temperature}°C`; 

    weatherInfo.appendChild(weatherElement);
  }
};

document.getElementById('cityName').addEventListener('input', async function() {
    let cityName = this.value.trim();
    if (cityName !== '') {
        try {
            const weatherData = await getWeather(cityName);
            displayWeather(weatherData);
        } catch (error) {
            console.error(error);
            // alert('Failed to retrieve weather data. Please try again later.');
        }
    } else {
        document.getElementById('weatherInfo').innerHTML = '';
    }
});
              
