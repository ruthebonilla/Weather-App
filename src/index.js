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

  return `${day} ${month}. ${date}, ${year} <br />${hours}:${minutes}`;
}

function displayWeatherInfo(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = (document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`);
  let wind = (document.querySelector(
    "#wind"
  ).innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} mph`);
  let maxTemp = (document.querySelector(
    "#max-temp"
  ).innerHTML = `H: ${Math.round(response.data.main.temp_max)}°`);
  let minTemp = (document.querySelector(
    "#min-temp"
  ).innerHTML = `L: ${Math.round(response.data.main.temp_min)}°`);
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].main);
}

function searchCity(city) {
  let apiKey = "06e918cbeda5078872c6886bf7421496";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityDisplay").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "06e918cbeda5078872c6886bf7421496";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 10;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 50;
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = getCurrentDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Seattle");
