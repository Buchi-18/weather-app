"use strict";
import { config } from "./apiKey.js";

const apiKey = config.apiKey;

let limit = 5;
let lat = 36; //緯度Latitude
let lon = 140; //経度Longitude

let userLocation = document.getElementById("userLocation");
let index = userLocation.selectedIndex;
console.log(userLocation.value);

const btn = document.getElementById("btn");
const weatherResult = document.getElementById("weatherResult");

const weatherDataYText = {
  "01d": "せいてん",
  "02d": "はれ",
  "03d": "はれときどきくもり",
  "04d": "くもり",
  "09d": "こさめ",
  "10d": "あめ",
  "11d": "らいう",
  "13d": "ゆき",
  "50d": "きり",
};

btn.addEventListener("click", function () {
  userLocation = userLocation;
  index = userLocation.selectedIndex;

  async function callApi() {
    const getWeatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${userLocation.value}&appid=${apiKey}&units=metric`;
    const direct = `http://api.openweathermap.org/geo/1.0/direct?q=神奈川&limit=${limit}&appid=${apiKey}`;
    const reverse = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;

    const res = await fetch(getWeatherApi);
    const user = await res.json();

    const iconId = user.weather[0].icon;
    console.log(user);
    console.log(weatherDataJa[iconId]);

    weatherResult.innerHTML = `
    <p class="location">${userLocation[index].innerHTML}</p>
    <h2>今日の天気</h2>
    <div class="weather-icon"><img src="./img/weather-icon-${iconId}.jpg" alt="${weatherDataJa[iconId]}のアイコン"></div>
    <p class="weather-text">
      <span class="ja">${weatherDataJa[iconId]}</span>
      <span class="en">${user.weather[0].main}</span>
    </p>
    <div class="temp-wrap">
      <div class="main-temp">${user.main.temp}℃</div>
      <div class="min-max-temp">
        <span class="min-temp">${user.main.temp_min}℃</span>
        <span class="max-temp">${user.main.temp_max}℃</span>
      </div>
    </div>
    `;
  }

  callApi();
});
