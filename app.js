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

//get temperature and display it
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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
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

search("Kyiv");
/*


//get location and show temperature

function showCurrentTemperature() {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    function displayTemp(response) {
      let currentTemp = document.querySelector("#next-day-temperature");
      if (response.data.main.temp > "0") {
        currentTemp.innerHTML = `+${Math.round(response.data.main.temp)}`;
      } else {
        currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
      }

      let feelsLikeTemp = document.querySelector("#feels-like-temp");
      if (response.data.main.feels_like > "0") {
        feelsLikeTemp.innerHTML = `+${Math.round(
          response.data.main.feels_like
        )}`;
      } else {
        feelsLikeTemp.innerHTML = `${Math.round(
          response.data.main.feels_like
        )}`;
      }

      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `${response.data.main.humidity}`;

      let atmospherePresure = document.querySelector("#atmosphere-presure");
      atmospherePresure.innerHTML = `${response.data.main.pressure}`;

      let wind = document.querySelector("#wind");
      wind.innerHTML = `${response.data.wind.speed}`;

      let cityName = document.querySelector("#city-name");
      cityName.innerHTML = ``;
    }

    let apiKey = "bdad5baf17a5f89219e6f1fedb3153de";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;

    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrentTemperature);

//convert units

/*function displayCelsius() {
  let temperature = document.querySelector("#next-day-temperature");
  let temp = temperature.innerHTML;
  temperature.innerHTML = `${((temp - 32) * 5) / 9}`;
  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  let tempFeelsLike = feelsLikeTemp.innerHTML;
  feelsLikeTemp.innerHTML = `${((tempFeelsLike - 32) * 5) / 9}`;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

function displayFahrenheit() {
  let temperature = document.querySelector("#next-day-temperature");
  let temp = temperature.innerHTML;
  temperature.innerHTML = `${(temp * 9) / 5 + 32}`;
  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  let tempFeelsLike = feelsLikeTemp.innerHTML;
  feelsLikeTemp.innerHTML = `${(tempFeelsLike * 9) / 5 + 32}`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);
*/
