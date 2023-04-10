let apiKey = "3bef43ebc55cddcde9520t9o4186efa4";

//Display the initial date & time
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
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
//This will format the date from the next forecasting days
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}
// Async function that displays everything we need
function search(event) {
  event.preventDefault();
  let cityElement = document.getElementById("city");
  let cityInput = document.getElementById("city-input");
  cityElement.innerHTML = `Weather in ${cityInput.value}`;
  let city = cityInput.value;
  let unit = "metric";
  let apiURL = "https://api.shecodes.io/weather/v1/forecast?query=";

  function showTemp(response) {
    let roundedTemp = Math.round(response.data.daily[0].temperature.day);
    let temperatureElement = `${roundedTemp}ºC`;
    let replace = document.getElementById("temp-now");
    replace.innerHTML = `${temperatureElement}`;
    //the bar thing
    let textBar = document.getElementById("barra");
    textBar.innerText = `/`;
    // fahrenheit conversion
    function showFahrenheitTemp(event) {
      event.preventDefault();
      let fahrenheitTemperature = roundedTemp * 1.8 + 32;
      let finalFahrenheitText = `${fahrenheitTemperature}ºF`;
      replace.innerHTML = `${finalFahrenheitText}`;
    }
    let fahrenheitLink = document.getElementById("fahrenheitText");
    fahrenheitLink.addEventListener("click", showFahrenheitTemp);
    //celsius conversion
    function showCelciusTemp(event) {
      event.preventDefault();
      replace.innerHTML = `${temperatureElement}`;
    }
    let celciusLink = document.getElementById("celciusText");
    celciusLink.addEventListener("click", showCelciusTemp);
    //image
    const imageURL = response.data.daily[0].condition.icon_url;
    const imageElement = document.getElementById("replacePicOne");
    imageElement.src = imageURL;
    celciusLink.innerHTML = "ºC";
    fahrenheitLink.innerHTML = "ºF";
    //description
    replaceDesc = document.getElementById("mainDescription");
    replaceDesc.innerHTML = `${response.data.daily[0].condition.description}`;
    //humidity - percentage
    let humidity = response.data.daily[0].temperature.humidity;
    let humidityPerc = document.getElementById("humidityPerc");
    humidityPerc.innerHTML = `${humidity}% Humidity`;
    //wind
    let wind = response.data.daily[0].wind.speed;
    let windResponse = document.getElementById("wind");
    windResponse.innerHTML = `${wind}km/h Wind`;

    function displayForecast() {
      let forecastResponse = response.data.daily;
      console.log(forecastResponse);
      let forecastElement = document.getElementById("forecast");
      let forecastHTML = `<div class="row" style="display: contents; margin: 0 auto;">`;
      forecastResponse.forEach(function (forecastDay, index) {
        if (index < 5) {
          forecastHTML =
            forecastHTML +
            `          <div class="col">
        <div class="weather-forecast-date" style="font-size: 14px">${formatDate(
          forecastDay.time
        )}</div>
        <img src="${forecastDay.condition.icon_url}" style="max-width:40px;"/>
        <div class="col" style="font-size: 18px; ">
        <span style="background-color: #A6AAB4;" class="weather-forecast-temp-max">${Math.round(
          forecastDay.temperature.maximum
        )} ºC /</span>
        <span class="weather-forecast-temp-min"> ${Math.round(
          forecastDay.temperature.minimum
        )} ºC</span></div>
</div> `;
          forecastHTML = forecastHTML + `</div>`;
          forecastElement.innerHTML = forecastHTML;
        }
      });
    }
    displayForecast();
  }
  axios.get(`${apiURL}${city}&key=${apiKey}&units=${unit}`).then(showTemp);
}

let dateElement = document.querySelector(".today");
let currentTime = new Date();
dateElement.innerHTML = todayDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
