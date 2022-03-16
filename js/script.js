const PROXYURL = "https://api.allorigins.win/raw?url=";
const APIURL = "https://www.metaweather.com/api/location/search/?query=";
const WOEIDURL = "https://www.metaweather.com/api/location/";
const IMGURL = "https://www.metaweather.com/static/img/weather/png/64/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getWoeid(city) {
  const resp = await fetch(PROXYURL + APIURL + city);
  const respData = await resp.json();
  const cts = JSON.stringify(respData);
  if (5 < cts.length && cts.length < 200) {
    const dfnl = JSON.parse(cts.slice(1, -1));
    getWeather(dfnl.woeid);
  } else {
    errorDisplay();
  }
}

async function getWeather(woeID) {
  const resp = await fetch(PROXYURL + WOEIDURL + woeID + "/");
  const respData = await resp.json();
  displayWeather(respData);
}

function displayWeather(data) {
  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
  <div class="today">
    <div class="sub-today">
      <img src="${
        IMGURL + data.consolidated_weather[0].weather_state_abbr
      }.png"/>
      <h3>${data.consolidated_weather[0].weather_state_name}</h3>
    </div>
    <div class="sub-today">
      <h1>${Math.floor(data.consolidated_weather[0].the_temp)}°C</h1>
      <p>min-temp: ${Math.floor(data.consolidated_weather[0].min_temp)}°C</p>
      <p>max-temp: ${Math.floor(data.consolidated_weather[0].max_temp)}°C</p>
      <p>wind: ${data.consolidated_weather[0].wind_speed.toFixed(2)}Kmph</p>
      <p>Pressure: ${data.consolidated_weather[0].air_pressure}mb</p>
    </div>
  </div>
  <div class="future">
    <div class="sub-future">
      <h5>${data.consolidated_weather[1].applicable_date
        .split("-")
        .reverse()
        .join("/")
        .slice(0, -5)}</h5>
      <img src="${
        IMGURL + data.consolidated_weather[1].weather_state_abbr
      }.png "/>
      <p>${Math.floor(data.consolidated_weather[1].the_temp)}°C 
      </p>
      <p>${data.consolidated_weather[1].weather_state_name}</p>
    </div>
    <div class="sub-future">
      <h5>${data.consolidated_weather[2].applicable_date
        .split("-")
        .reverse()
        .join("/")
        .slice(0, -5)}</h5>
      <img src="${
        IMGURL + data.consolidated_weather[2].weather_state_abbr
      }.png "/>
      <p>${Math.floor(data.consolidated_weather[2].the_temp)}°C 
      </p>
      <p>${data.consolidated_weather[2].weather_state_name}</p>
    </div>
    <div class="sub-future">
      <h5>${data.consolidated_weather[3].applicable_date
        .split("-")
        .reverse()
        .join("/")
        .slice(0, -5)}</h5>
      <img src="${
        IMGURL + data.consolidated_weather[3].weather_state_abbr
      }.png "/>
      <p>${Math.floor(data.consolidated_weather[3].the_temp)}°C 
      </p>
      <p>${data.consolidated_weather[3].weather_state_name}</p>
    </div>
    <div class="sub-future">
      <h5>${data.consolidated_weather[4].applicable_date
        .split("-")
        .reverse()
        .join("/")
        .slice(0, -5)}</h5>
      <img src="${
        IMGURL + data.consolidated_weather[4].weather_state_abbr
      }.png "/>
      <p>${Math.floor(data.consolidated_weather[4].the_temp)}°C 
      </p>
      <p>${data.consolidated_weather[4].weather_state_name}</p>
    </div>
    <div class="sub-future">
      <h5>${data.consolidated_weather[5].applicable_date
        .split("-")
        .reverse()
        .join("/")
        .slice(0, -5)}</h5>
      <img src="${
        IMGURL + data.consolidated_weather[5].weather_state_abbr
      }.png "/>
      <p>${Math.floor(data.consolidated_weather[5].the_temp)}°C 
      </p>
      <p>${data.consolidated_weather[5].weather_state_name}</p>
    </div>
  </div>
  `;
  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWoeid(city);
  } else {
    main.innerHTML = "";
    main.innerHTML = `<h3 class="error_message">Please enter a valid Input</h3>`;
  }
});

function errorDisplay() {
  main.innerHTML = "";
  main.innerHTML = `<h3 class="error_message">Sorry data not available</h3>`;
}
