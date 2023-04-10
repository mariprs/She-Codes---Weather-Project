let apiKey = "3bef43ebc55cddcde9520t9o4186efa4";

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

function search(event) {
  event.preventDefault();
  let cityElement = document.getElementById("city");
  let cityInput = document.getElementById("city-input");
  cityElement.innerHTML = `Weather in ${cityInput.value}`;
  let city = cityInput.value;
  let unit = "metric";
  let apiURL = "https://api.shecodes.io/weather/v1/current?query=";

  function showTemp(response) {
    let roundedTemp = Math.round(response.data.temperature.current);
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
    const imageURL = response.data.condition.icon_url;
    const imageElement = document.getElementById("replacePicOne");
    imageElement.src = imageURL;
    celciusLink.innerHTML = "ºC";
    fahrenheitLink.innerHTML = "ºF";
    //description
    replaceDesc = document.getElementById("mainDescription");
    replaceDesc.innerHTML = `${response.data.condition.description}`;
    //humidity - percentage
    let humidity = response.data.temperature.humidity;
    let humidityPerc = document.getElementById("humidityPerc");
    humidityPerc.innerHTML = `${humidity}% Humidity`;
    //wind
    let wind = response.data.wind.speed;
    let windResponse = document.getElementById("wind");
    windResponse.innerHTML = `${wind}km/h Wind`;

    function displayForecast(event) {
      let forecastElement = document.getElementById("forecast");
      let forecastHTML = `<div class="row" style="display: contents; margin: 0 auto;">`;
      forecastHTML =
        forecastHTML +
        `          <div class="col">
        <div class="weather-forecast-date">MON</div>
        <i class="fa-solid fa-cloud-sun-rain" style="width: 42;"></i>
        <div class="col" style="font-size: 18px; "><span style="background-color: #A6AAB4" class="weather-forecast-temp-max">28ºC /</span><span class="weather-forecast-temp-min"> 25ºC</span></div>
</div> `;
      forecastHTML =
        forecastHTML +
        `          <div class="col">
        <div class="weather-forecast-date">THU</div>
        <i class="fa-solid fa-cloud-sun-rain" style="width: 42;"></i>
        <div class="col" style="font-size: 18px; "><span style="background-color: #A6AAB4" class="weather-forecast-temp-max">28ºC /</span><span class="weather-forecast-temp-min"> 25ºC</span></div>
</div> `;
      forecastHTML =
        forecastHTML +
        `          <div class="col">
        <div class="weather-forecast-date">WED</div>
        <i class="fa-solid fa-cloud-sun-rain" style="width: 42;"></i>
        <div class="col" style="font-size: 18px; "><span style="background-color: #A6AAB4" class="weather-forecast-temp-max">28ºC /</span><span class="weather-forecast-temp-min"> 25ºC</span></div>
</div> `;
      forecastHTML =
        forecastHTML +
        `          <div class="col">
        <div class="weather-forecast-date">TUE</div>
        <i class="fa-solid fa-cloud-sun-rain" style="width: 42;"></i>
        <div class="col" style="font-size: 18px; "><span style="background-color: #A6AAB4" class="weather-forecast-temp-max">28ºC  /</span><span class="weather-forecast-temp-min"> 25ºC</span></div>
</div> `;
      forecastHTML =
        forecastHTML +
        `          <div class="col">
        <div class="weather-forecast-date">FRI</div>
        <i class="fa-solid fa-cloud-sun-rain" style="width: 42;"></i>
        <div class="col" style="font-size: 18px; "><span style="background-color: #A6AAB4" class="weather-forecast-temp-max">28ºC /</span><span class="weather-forecast-temp-min"> 25ºC</span></div>
</div> `;
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
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
