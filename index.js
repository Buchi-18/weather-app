"use strict";
import { config } from "./apiKey.js";

const apiKey = config.apiKey;

let limit = 5;
let lat = 36; //緯度Latitude
let lon = 140; //経度Longitude

let userLocationValue = ""
const btn = document.getElementById("btn");



btn.addEventListener("click", function () {
  userLocationValue = document.getElementById("userLocationValue").value;

  async function callApi() {
    const weather = `http://api.openweathermap.org/data/2.5/weather?q=${userLocationValue}&appid=${apiKey}`;
    const direct = `http://api.openweathermap.org/geo/1.0/direct?q=神奈川&limit=${limit}&appid=${apiKey}`;
    const reverse = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;
  
    const res = await fetch(weather);
    const locations = await res.json();
    console.log(locations);
  
    // locations.forEach(function (location) {
    //   let locationName = location.local_names;
    //   if (locationName !== undefined) {
    //     console.log(location);
    //     console.log(locationName.ja);
    //   } else {
    //     return;
    //   }
    // });
  }

  callApi();

})





