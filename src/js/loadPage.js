import getData from "./getData";
import icons from "./getImages";
import searchIcon from "./search.png";
const input = document.getElementById("search");
const submit = document.getElementById("search_form");
submit.addEventListener("submit", (e) => {
  e.preventDefault();
  loadPage(input.value.replace(/\s+/g, "+"));
});
const searchBtn = document.getElementById("submit");
const searchImg = document.createElement("img");
searchImg.src = searchIcon;
searchBtn.appendChild(searchImg);

export default async function loadPage(location) {
  input.value = "";

  const data = await getData(location);
  if (data == 1) {
    alert("This location is not valid");
    return;
  }
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const cityDiv = document.getElementById("city_container");
  const hoursDiv = document.getElementById("hour_container");
  const daysDiv = document.getElementById("day_container");

  hoursDiv.innerHTML = "";
  daysDiv.innerHTML = "";
  cityDiv.innerHTML = "";

  const cityTitle = document.createElement("h1");
  cityTitle.textContent = data.getLocation();
  cityDiv.appendChild(cityTitle);

  const cityImg = document.createElement("img");
  console.log(data.getIcon());
  cityImg.src = icons[data.getIcon()];
  cityDiv.appendChild(cityImg);

  const cityTemp = document.createElement("h1");
  cityTemp.textContent = data.getCurrentTemp();
  cityDiv.appendChild(cityTemp);

  // Defines the current hour to make sure it is the first to be displayed
  let hours = data.getHours(0).concat(data.getHours(1));
  const currentHour = new Date();

  while (true) {
    const hourEpoch = new Date(hours[0].datetimeEpoch * 1000);
    if (currentHour.getHours() == hourEpoch.getHours()) {
      break;
    } else {
      hours.shift();
    }
  }

  //Changes hours array to make sure a whole day is displayed
  hours = hours.slice(0, 24);
  console.log(hours);
  //   Display Hours div
  hours.forEach((hour) => {
    const hourEpoch = new Date(hour.datetimeEpoch * 1000);
    const formattedHour = String(hourEpoch.getHours()).padStart(2, "0");
    const hourItemDiv = document.createElement("div");
    hourItemDiv.classList.add("hour_item");

    const dayOrNight = hour.solarenergy > 0 ? "day" : "night";

    hourItemDiv.classList.add(dayOrNight);
    hoursDiv.appendChild(hourItemDiv);

    const hourDiv = document.createElement("div");
    hourDiv.textContent = `${formattedHour}:00`;
    hourItemDiv.appendChild(hourDiv);
    hourDiv.classList.add("hour_title");

    const icon = document.createElement("img");
    icon.src = icons[hour.icon];
    hourItemDiv.appendChild(icon);
    icon.classList.add("hour_icon");

    const tempDiv = document.createElement("div");
    tempDiv.textContent = hour.temp;
    hourItemDiv.appendChild(tempDiv);
    tempDiv.classList.add("hour_temp");
  });

  //Display Days div
  const days = data.getDays();
  const today = new Date();
  const todayWeekday = today.getDay();
  console.log(days);
  days.slice(0, 7).forEach((day) => {
    const dayEpoch = new Date(day.datetimeEpoch * 1000);
    const weekDay = dayEpoch.getDay();
    const dayItemDiv = document.createElement("div");
    dayItemDiv.classList.add("day_item");
    daysDiv.appendChild(dayItemDiv);

    const dayDiv = document.createElement("div");
    dayDiv.textContent =
      todayWeekday == weekDay ? "Today" : `${weekDays[weekDay]}`;
    dayItemDiv.appendChild(dayDiv);
    dayDiv.classList.add("day_title");

    const img = document.createElement("img");
    img.src = icons[day.icon];
    dayItemDiv.appendChild(img);
    img.classList.add("day_icon");

    const minTempDiv = document.createElement("div");
    minTempDiv.textContent = `Min:${day.tempmin}`;

    dayItemDiv.appendChild(minTempDiv);
    minTempDiv.classList.add("min_temp");

    const maxTemp = document.createElement("div");
    maxTemp.textContent = `Max:${day.tempmax}`;

    dayItemDiv.appendChild(maxTemp);
    maxTemp.classList.add("max_temp");
  });
}
