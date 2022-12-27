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
}

let apiKey = "bdad5baf17a5f89219e6f1fedb3153de";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);

/*
//show current date and time

let newDate = new Date();
let day = newDate.getDay();
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

let date = document.querySelector("#current-date");
date.innerHTML = `${days[day]}, ${hours}:${minutes}`;

//get temperature

function displayTemp(response) {
  console.log(response.data);

  let currentTemp = document.querySelector("#next-day-temperature");
  if (response.data.main.temp > "0") {
    currentTemp.innerHTML = `+${Math.round(response.data.main.temp)}`;
  } else {
    currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  }

  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  if (response.data.main.feels_like > "0") {
    feelsLikeTemp.innerHTML = `+${Math.round(response.data.main.feels_like)}`;
  } else {
    feelsLikeTemp.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  }

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let atmospherePresure = document.querySelector("#atmosphere-presure");
  atmospherePresure.innerHTML = `${response.data.main.pressure}`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}`;
}

//display search city on the page

function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search");

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${input.value}`;

  let city = input.value;
  let apiKey = "bdad5baf17a5f89219e6f1fedb3153de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);

  input.value = "";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

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

/*let city = prompt("Please enter the city");
let alteredCity = city.toLowerCase();

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

if (alteredCity in weather) {
  if (alteredCity === "tokyo") {
    alert(
      `It is currently ${Math.round(weather.tokyo.temp)}°C (${Math.round(
        (weather.tokyo.temp * 9) / 5 + 32
      )}°F) in ${city} with a humidity of ${weather.tokyo.humidity}%`
    );
  } else if (alteredCity === "paris") {
    alert(
      `It is currently ${Math.round(weather.paris.temp)}°C (${Math.round(
        (weather.paris.temp * 9) / 5 + 32
      )}°F) in ${city} with a humidity of ${weather.paris.humidity}%`
    );
  } else if (alteredCity === "lisbon") {
    alert(
      `It is currently ${Math.round(weather.lisbon.temp)}°C (${Math.round(
        (weather.lisbon.temp * 9) / 5 + 32
      )}°F) in ${city} with a humidity of ${weather.lisbon.humidity}%`
    );
  } else if (alteredCity === "san francisco") {
    alert(
      `It is currently ${Math.round(
        weather["san francisco"].temp
      )}°C (${Math.round(
        (weather["san francisco"].temp * 9) / 5 + 32
      )}°F) in ${city} with a humidity of ${weather.tokyo.humidity}%`
    );
  } else if (alteredCity === "oslo") {
    alert(
      `It is currently ${Math.round(weather.oslo.temp)}°C (${Math.round(
        (weather.oslo.temp * 9) / 5 + 32
      )}°F) in ${city} with a humidity of ${weather.oslo.humidity}%`
    );
  }
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${alteredCity}`
  );
}*/
