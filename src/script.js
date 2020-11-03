function formatDate(now) {
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

return `${day}, ${date} ${month} ${year}`
}

function formatTime(now) {
  let hour = now.getHours();
  if (hour < 10) {
  hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
  minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function searchLocation(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let unit = "metric"
  let apiKey = "79432bad8a08e24accbb2ab649dcc7be";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=${unit}&appid=${apiKey}`; 
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayWeatherConditions(response) {
  console.log(response.data);
  actualCelsiusTemperature = response.data.main.temp;
  feelsLikeCelsiusTemperature = response.data.main.feels_like;
  document.querySelector("#today-temp").innerHTML = Math.round(actualCelsiusTemperature); 
  document.querySelector("#city-heading").innerHTML = response.data.name;
  document.querySelector("#today-weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#real-feel").innerHTML = Math.round(feelsLikeCelsiusTemperature);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#today-weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#today-weather-icon").setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#unit").innerHTML = "°C";
  document.querySelector("#feels-like-unit").innerHTML = "°C";
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function searchCity(city) {
  let apiKey = `79432bad8a08e24accbb2ab649dcc7be`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#location-input").value;
  searchCity(locationInput);
}

function displayFarenheit(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let actualTemperatureElement = document.querySelector("#today-temp");
  let feelsLikeTemperatureElement = document.querySelector("#real-feel");
  let actualTempUnit = document.querySelector("#unit");
  actualTempUnit.innerHTML = "°F"
  let feelsLikeTempUnit = document.querySelector("#feels-like-unit");
  feelsLikeTempUnit.innerHTML = "°F"
  let actualFarenheitTemperature = (actualCelsiusTemperature * 9/5) + 32;
  let feelsLikeFarenheitTemperature = (feelsLikeCelsiusTemperature * 9/5) + 32;
  actualTemperatureElement.innerHTML = Math.round(actualFarenheitTemperature);
  feelsLikeTemperatureElement.innerHTML = Math.round(feelsLikeFarenheitTemperature);

}

function displayCelsius(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let actualTempUnit = document.querySelector("#unit");
  actualTempUnit.innerHTML = "°C"
  let feelsLikeTempUnit = document.querySelector("#feels-like-unit");
  feelsLikeTempUnit.innerHTML = "°C"
  let actualTemperatureElement = document.querySelector("#today-temp");
  actualTemperatureElement.innerHTML = Math.round(actualCelsiusTemperature);
  let feelsLikeTemperatureElement = document.querySelector("#real-feel");
  feelsLikeTemperatureElement.innerHTML = Math.round(feelsLikeCelsiusTemperature);
}

let now = new Date();
let dayAndDate = document.querySelector("#day-and-date");
dayAndDate.innerHTML = formatDate(now);
let time = document.querySelector("#time");
time.innerHTML = formatTime(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let farenheitLink = document.querySelector("#select-farenheit");
farenheitLink.addEventListener("click", displayFarenheit);

let celsiusLink = document.querySelector("#select-celsius");
celsiusLink.addEventListener("click", displayCelsius);

let actualCelsiusTemperature = null;

let feelsLikeCelsiusTemperature = null;

searchCity("New York");





