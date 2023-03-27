let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";

function todayDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.getElementById("city");
  let cityInput = document.getElementById("city-input");
  cityElement.innerHTML = `Weather in ${cityInput.value}`;
  let city = cityInput.value;
  let unit = "metric";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";

  function showTemp(response) {
    let roundedTemp = Math.round(response.data.main.temp);
    let temperatureElement = `${roundedTemp}ºC`;
    console.log(temperatureElement);
    let replace = document.getElementById("temp-now");
    replace.innerHTML = `${temperatureElement}`;
  }
  axios.get(`${apiURL}${city}&units=${unit}&appid=${apiKey}`).then(showTemp);
}

let dateElement = document.querySelector(".today");
let currentTime = new Date();
dateElement.innerHTML = todayDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
