"use strict";

const dt = new Date();
dt.setFullYear(2023);
console.log(dt);

let year = dt.getFullYear();
let month = dt.getMonth() + 1;
let date = dt.getDate();
let DOW = dt.getDay();
var dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"];
let dayOfWeek = dayOfWeekStr[DOW];
let dayOfWeekFirst = new Date(year, month - 1, 1).getDay();
let numberOfDays = new Date(year, month, 0).getDate();

console.log(DOW);
console.log(dayOfWeekFirst);
// console.log(date);
console.log(numberOfDays);


const currentDate = document.querySelector(".current-date")


currentDate.innerHTML = `
<p>${month}/${date}(${dayOfWeek})</p>
`

for (let i = 0; i < numberOfDays; i++){
  let dateNum = 1;
  if (i < 7) {
    
  }
}