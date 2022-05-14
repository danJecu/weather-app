const API_KEY = '2b14fdeabd67bb3b98e477b1eb93fb50';


const weatherContainer = document.getElementById('weather-container');
const buttonSubmit = document.getElementById('submit');

async function getLocation() {
  const locationInput = document.getElementById('location').value;

  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=5&appid=${API_KEY}`);
  const data = await response.json();
  const location = await data[0];

  return location;
};

async function getWeather(lat, lon) {

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const data = await response.json();

  return data;
}



document.getElementById('location').addEventListener('keypress', async function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    buttonSubmit.click();
    try {
      let location = await getLocation();

      let weather = await getWeather(location.lat, location.lon);

      console.log(weather);
      let weatherIcon = `<img alt="icon" src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"
    width="60" height="60" />`;
      let weatherDescription = `<h4>${weather.weather[0].main}</h4>`;
      let weatherMinMax = `<h6>L:${Math.round(weather.main.temp_min - 273.15)}° / H:${Math.round(weather.main.temp_max - 273.15)}°</h6>`;
      let weatherCardLeft = `<div class="weather-card-left"> ${document.getElementById('location').value} <h2>${Math.round(weather.main.temp - 273.15)}° C</h2></div>`;
      let weatherCardRight = `<div class="weather-card-right">${weatherIcon}${weatherDescription}${weatherMinMax}</div>`

      weatherContainer.innerHTML = `${weatherCardLeft}${weatherCardRight}`;
      weatherContainer.style.display = 'grid';
      document.getElementById('location').value = '';
    } catch {
      alert('Please try a valid location!');
    }
  }
});








