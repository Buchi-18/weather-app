"use strict";
const monthNam = document.getElementById("monthNam");
const currentDate = document.querySelector(".current-date");
const calendarDates = document.querySelector(".dates ul");
const selectDates = document.querySelector(".dates ul li");
const selectable = document.querySelector(".selectable");
const prevMonth = document.querySelector(".prev");
const nextMonth = document.querySelector(".next");

const dt = new Date();
dt.setFullYear(2023);

let year = dt.getFullYear();
let month = dt.getMonth();
let date = dt.getDate();
let DOW = dt.getDay();
var dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"];
let dayOfWeek = dayOfWeekStr[DOW];
let dayOfWeekFirst = new Date(year, month, 1);
let numberOfDays = new Date(year, month + 1, 0).getDate();
let renderMonth = month + 1;
render();

window.addEventListener("click", function (e) {
  const isClick = e.target.className === "selectable";
  if (!isClick) return;
  const dateInfoArray = e.target.dataset.date.split("_");
  renderMonth = parseFloat(dateInfoArray[1]);
  date = parseFloat(dateInfoArray[2]);
  dayOfWeek = dayOfWeekStr[parseFloat(dateInfoArray[3])];
  currentDate.innerHTML = `<p>${renderMonth}/${date}(${dayOfWeek})</p>`;
});

prevMonth.addEventListener("click", function () {
  initializedDateHtml();
  if (month === 0) {
    month = 11;
    updateMonth(month);
    return;
  }
  month--;
  updateMonth(month);
});
nextMonth.addEventListener("click", function () {
  initializedDateHtml();
  if (month === 11) {
    month = 0;
    updateMonth(month);
    return;
  }
  month++;
  updateMonth(month);
});

function updateMonth(month) {
  dayOfWeekFirst = new Date(year, month, 1);
  numberOfDays = new Date(year, month + 1, 0).getDate();
  DOW = new Date(year, month, date).getDay();
  dayOfWeek = dayOfWeekStr[DOW];
  console.log(numberOfDays);
  render();
}

function initializedDateHtml() {
  calendarDates.innerHTML = "";
}

function render() {
  let dateNum = 0;
  let dayOfWeekNum = dayOfWeekFirst.getDay();
  renderMonth = month + 1;
  monthNam.innerHTML = renderMonth;
  currentDate.innerHTML = `<p>${renderMonth}/${date}(${dayOfWeek})</p>`;

  for (let i = 0; i <= 35 + dayOfWeekNum; i++) {
    
    if (i < dayOfWeekNum) {
      
      calendarDates.innerHTML += `<li></li>`;
    } else if (dateNum < numberOfDays) {
      dateNum++;
      calendarDates.innerHTML += `<li class="selectable" data-date="${year}_${renderMonth}_${dateNum}_${dayOfWeekNum}">${dateNum}</li>`;
      if (dayOfWeekNum < 6) {
        dayOfWeekNum++;
      } else {
        dayOfWeekNum = 0;
      }
    }
  }
}
