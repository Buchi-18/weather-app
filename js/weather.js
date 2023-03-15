"use strict";
//
// *************** ロケーション要素の取得 ***************
const locationWrap = document.getElementById("locationWrap");
const selectLocation = document.getElementById("selectLocation");
export const currentLocation = document.getElementById("currentLocation");
//
// *************** カレンダー要素の取得 ***************
const calendarWrap = document.getElementById("calendarWrap");
const selectDate = document.getElementById("selectDate");
const monthNam = document.getElementById("monthNam");
export const currentDate = document.getElementById("currentDate");
const calendarDates = document.querySelector(".dates ul");
const prevMonth = document.querySelector(".prev");
const nextMonth = document.querySelector(".next");
//
// *************** 日付情報の取得 ***************
const dt = new Date();
dt.setFullYear(2100);
let year = dt.getFullYear();
let month = dt.getMonth();
let date = dt.getDate();
let DOW = dt.getDay();
var dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"];
let dayOfWeek = dayOfWeekStr[DOW];
let dayOfWeekFirst = new Date(year, month, 1);
let numberOfDays = new Date(year, month + 1, 0).getDate();
let renderMonth = month + 1;
//
// *************** ウェザー要素の取得 ***************
const weatherResult = document.getElementById("weatherResult");
const weatherLocation = document.querySelector("#weatherResult .location");
const weatherTitle = document.querySelector("#weatherResult h2");
const resultBtn = document.getElementById("resultBtn");

let userLocation;
let userDate;
const weatherDataText = {
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

//
// *************** レンダリング処理 ***************
async function callJsonData() {
  getUserData();
  const res = await fetch(`json/${userLocation.dataset.location}.json`);
  const users = await res.json();
  renderWeather(users);
}
render();
callJsonData();

//
// *************** イベントハンドラー ***************
currentLocation.addEventListener("click", function () {
  //ロケーションアコーディオンハンドラー
  AccordionHandler(locationWrap, selectLocation);
});

currentDate.addEventListener("click", function () {
  //カレンダーアコーディオンハンドラー
  AccordionHandler(calendarWrap, selectDate);
});

window.addEventListener("click", function (e) {
  //ロケーション選択
  selectedLocation(e);
});

window.addEventListener("click", function (e) {
  //日付選択
  selectedDate(e);
});

prevMonth.addEventListener("click", function () {
  // prevボタン １ヶ月前
  subtractionMonth();
});
nextMonth.addEventListener("click", function () {
  // nextボタン １ヶ月後
  additionMonth();
});

resultBtn.addEventListener("click", function () {
  //結果表示ボタンを押したときの処理
  callJsonData();
  selectLocation.style.height = 0;
  selectDate.style.height = 0;
  locationWrap.classList.remove("active");
  calendarWrap.classList.remove("active");
});

//
// *************** メソッド ***************
function render() {
  let dateNum = 0;
  let dayOfWeekNum = dayOfWeekFirst.getDay();

  renderMonth = month + 1;
  monthNam.innerHTML = renderMonth;
  if (numberOfDays < date) {
    date = date - (date - numberOfDays);
  }

  document.querySelector(".app-title span").innerHTML = `${year}年`;
  currentDate.innerHTML = `<p data-date="${year}_${renderMonth}_${date}">${renderMonth}/${date}(${dayOfWeek})</p>`;

  for (let i = 0; i <= 35 + dayOfWeekNum; i++) {
    if (i < dayOfWeekNum) {
      calendarDates.innerHTML += `<li></li>`;
    } else if (dateNum < numberOfDays) {
      dateNum++;
      calendarDates.innerHTML += `<li><p class="selectable" data-date="${year}_${renderMonth}_${dateNum}_${dayOfWeekNum}">${dateNum}</p></li>`;
      if (dayOfWeekNum < 6) {
        dayOfWeekNum++;
      } else {
        dayOfWeekNum = 0;
      }
    }
  }
}

function renderWeather(users) {
  for (let i = 0; i < users.length; i++) {
    const { observationDate, weather, temp, temp_min, temp_max } = users[i];

    let tempIcon;
    if (temp < 4) {
      tempIcon = "cold";
    } else if (temp < 30) {
      tempIcon = "normal";
    } else {
      tempIcon = "hot";
    }

    if (userDate.dataset.date === observationDate) {
      weatherResult.innerHTML = `
      <p class="location">${userLocation.innerHTML}</p>
      <h2>${year}年<br>${userDate.innerHTML}の天気</h2>
      <div class="weather-icon">
          <img src="./img/weather-icon-${weather}.jpg" alt="weather-image">
      </div>
      <p class="weather-text">
          <span class="ja">${weatherDataText[weather]}</span>
      </p>
      <div class="temp-wrap">
          <div class="temp-image">
              <img src="./img/weather-icon-temp-${tempIcon}.png" alt="temp-image-icon">
          </div>
          <div class="temp-text">
              <div class="main-temp">気温:${temp}℃</div>
              <div class="min-max-temp">
                  <span class="min-temp">最低気温:${temp_min}℃</span>
                  <span class="max-temp">最高気温:${temp_max}℃</span>
              </div>
          </div>
      </div>
  `;
    }
  }
}

function getUserData() {
  userLocation = currentLocation.children[0];
  userDate = currentDate.children[0];
}

function subtractionMonth() {
  initializedDateHtml();
  if (month === 0) {
    month = 11;
    updateMonth(month);
    return;
  }
  month--;
  updateMonth(month);
}

function additionMonth() {
  initializedDateHtml();
  if (month === 11) {
    month = 0;
    updateMonth(month);
    return;
  }
  month++;
  updateMonth(month);
}

function updateMonth(month) {
  dayOfWeekFirst = new Date(year, month, 1);
  numberOfDays = new Date(year, month + 1, 0).getDate();
  DOW = new Date(year, month, date).getDay();
  dayOfWeek = dayOfWeekStr[DOW];
  render();
}

function initializedDateHtml() {
  calendarDates.innerHTML = "";
}

function AccordionHandler(tag, elem) {
  if (tag.className === "active") {
    elem.style.height = 0;
    tag.classList.remove("active");
  } else {
    elem.style.height = elem.scrollHeight + "px";
    tag.classList.add("active");
  }
}

function selectedLocation(e) {
  const isClick = e.target.className === "otherLocation";
  if (isClick) {
    currentLocation.innerHTML = e.target.outerHTML;
  }
}

function selectedDate(e) {
  const isClick = e.target.className === "selectable";
  if (!isClick) return;
  const dateInfoArray = e.target.dataset.date.split("_");
  renderMonth = parseFloat(dateInfoArray[1]);
  date = parseFloat(dateInfoArray[2]);
  dayOfWeek = dayOfWeekStr[parseFloat(dateInfoArray[3])];
  currentDate.innerHTML = `<p data-date="${year}_${renderMonth}_${date}">${renderMonth}/${date}(${dayOfWeek})</p>`;
}
