//show current date
function formatDate(timestamp) {
  let newDate = new Date(timestamp);
  let hours = newDate.getHours();
  let minutes = ("0" + newDate.getMinutes()).slice(-2);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = newDate.getDay();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = newDate.getMonth();
  let date = newDate.getDate();
  return `${days[day]} (${months[month]}, ${date}), ${hours}:${minutes}`;
}

//add the dymanic HTML to weather forcast section
function displayForecast(response) {
  console.log(response.data.list);

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = "";
  forecastHTML = `<div class="row2">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHTML += `
    <div class="column-next-day first-column">
      <div class="next-day">
        <h2 class="weekday">${day}</h2>
        <img
          src="images/cloudy-sunny.png"
          alt="Weather image"
          class="weather-image-next-day"
        />
        <p class="next-day-temperature">
          <img
            src="images/thermometer.png"
            alt="Temperature"
            class="temperature-icon"
          />
          +20°C
        </p>
      </div>
    </div>
  `;
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//get forecast from the API
function getForecast(coords) {
  let apiKey = "bdad5baf17a5f89219e6f1fedb3153de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//get info from API and display it
function displayTemp(response) {
  let currentTempElement = document.querySelector("#current-temperature");
  if (response.data.main.temp > "0") {
    currentTempElement.innerHTML = `+${Math.round(response.data.main.temp)}`;
  } else {
    currentTempElement.innerHTML = Math.round(response.data.main.temp);
  }

  let feelsLikeTempElement = document.querySelector("#feels-like-temp");
  if (response.data.main.feels_like > "0") {
    feelsLikeTempElement.innerHTML = `+${Math.round(
      response.data.main.feels_like
    )}`;
  } else {
    feelsLikeTempElement.innerHTML = Math.round(response.data.main.feels_like);
  }

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#atmosphere-presure").innerHTML =
    response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureFeelsLike = response.data.main.feels_like;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

//search engine
function search(city) {
  let apiKey = "bdad5baf17a5f89219e6f1fedb3153de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search");
  search(input.value);
  input.value = "";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

//convert units
let celsiusTemperature = null;
let celsiusTemperatureFeelsLike = null;

//convert Celsius to Fahrenheit
function displayFahrenheit(event) {
  event.preventDefault();
  //make celsius link inactive
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  //convert current temperature
  let temperature = document.querySelector("#current-temperature");
  fahrenheitTemperature = `${Math.round((celsiusTemperature * 9) / 5 + 32)}`;
  if (fahrenheitTemperature > "0") {
    temperature.innerHTML = `+${fahrenheitTemperature}`;
  } else {
    temperature.innerHTML = `${fahrenheitTemperature}`;
  }
  //convert feelsLike temperature
  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  fahrenheitTemperature = `${Math.round(
    (celsiusTemperatureFeelsLike * 9) / 5 + 32
  )}`;
  if (fahrenheitTemperature > "0") {
    feelsLikeTemp.innerHTML = `+${fahrenheitTemperature}`;
  } else {
    feelsLikeTemp.innerHTML = `${fahrenheitTemperature}`;
  }
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

//convert Fahrenheit to Celsius
function displayCelsius(event) {
  event.preventDefault();
  //make fahrenheit link inactive
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  //convert current temperature
  let temperature = document.querySelector("#current-temperature");
  if (celsiusTemperature > "0") {
    temperature.innerHTML = `+${Math.round(celsiusTemperature)}`;
  } else {
    temperature.innerHTML = `${Math.round(celsiusTemperature)}`;
  }
  //convert feelsLike temperature
  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  if (celsiusTemperatureFeelsLike > "0") {
    feelsLikeTemp.innerHTML = `+${Math.round(celsiusTemperatureFeelsLike)}`;
  } else {
    feelsLikeTemp.innerHTML = `${Math.round(celsiusTemperatureFeelsLike)}`;
  }
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

//get current location and weather info for it
function showPositionData(position) {
  let apiKey = "bdad5baf17a5f89219e6f1fedb3153de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

function showCurrentWeatherInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionData);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrentWeatherInfo);

search("Kyiv");
