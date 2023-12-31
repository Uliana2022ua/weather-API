"use strict";
//блок з погодою
const weatherBlock = document.querySelector("#weather");
async function loadWeather(e) {
  weatherBlock.innerHTML = `
    <div class="weather__loading">
    <img src="img/loading.gif" alt="Loading..."</div>`;
  const server =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=warsaw&appid=c680af63bb1a6516dd0ecb9f8998abaa";
  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();
  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}
function getWeather(data) {
  //обробляємо та виводимо дані
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  //HTML шаблон
  const template = `<div class="weather__header">
                <div class="weather__main">
                    <div class="weather__city">${location}</div>
                    <div class="weather__status">${weatherStatus}</div>
                </div>
                <div class="weather__icon">
                    <img src=" https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherStatus}" width="100" height="100">
                </div>
            </div>
            <div class="weather__temp">${temp}°C</div>
            <div class="weather__feels-like">Feels like: ${feelsLike}°C</div>`;
  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}
