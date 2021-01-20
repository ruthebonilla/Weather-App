function getCurrentDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();
  let date = now.getDate();
  let monthIndex = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[monthIndex];
  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];

  return `-last updated- <br />${day} ${month}. ${date}, ${year} <br />${hours}:${minutes}`;
}

function displayWeatherInfo(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  let description = (document.querySelector("#description").innerHTML =response.data.weather[0].description);
  let humidity = (document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`);
  let wind = (document.querySelector("#wind").innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} mph`);
  let maxTemp = (document.querySelector("#max-temp").innerHTML = `H: ${Math.round(response.data.main.temp_max)}°`);
  let minTemp = (document.querySelector("#min-temp").innerHTML = `L: ${Math.round(response.data.main.temp_min)}°`);
  let iconElement =document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response
.data.weather[0].icon}@2x.png`);

  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "06e918cbeda5078872c6886bf7421496";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityDisplay");
  searchCity(city.value);
}

function searchLocation(position) {
  let apiKey = "06e918cbeda5078872c6886bf7421496";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = getCurrentDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Seattle");
