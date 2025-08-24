console.log("Hello, world");
const weatherDiv = document.getElementById("weather-conditions");
const container = document.body;
const form = document.querySelector("form");
const inputCity = document.getElementById("city");

const weather_crossing_api_key = "HVLE4KL3U5FZXW3LW55V46T8V";


// default weather place
let hello = useApi("johanesburg");
hello.then((message) => showCurrentWeatherConditions(message));

function toCelsius(fahrenheit) {
  return parseInt((fahrenheit - 32) / 1.8)
}

function mphToKph(mph) {
  return parseInt(mph * 1.609344 )
}

async function useApi(location) {
  let my_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weather_crossing_api_key}`;

  const data = await fetch(my_url, { mode: "cors" });
  const weatherInfo = await data.json();

  return weatherInfo;
}

function changeBackground(datetime) {
  const time = datetime.split(":")[0];

  if (parseInt(time >= 17)) {
    container.id = "evening";
  } else if (parseInt(time) < 17 && parseInt(time) > 12) {
    container.id = "afternoon";
  } else {
    container.id = "morning";
  }
}

function showCurrentWeatherConditions(jsonMessage) {

  changeBackground(jsonMessage.currentConditions.datetime);
  weatherDiv.textContent = "";

  const location = document.createElement("h3");
  location.textContent = `${jsonMessage.address} (${container.id})`;
  location.id = "location";

  const conditions = document.createElement("h1");
  conditions.textContent = jsonMessage.currentConditions.conditions;
  conditions.id = "conditions";

  const moreConditions = document.createElement("p");
  moreConditions.textContent = `Temp: ${toCelsius(jsonMessage.currentConditions.temp)} °C   Humidity: ${jsonMessage.currentConditions.humidity}%    Wind: ${mphToKph(jsonMessage.currentConditions.windspeed)} kph`;
  moreConditions.id = "moreConditions";

  weatherDiv.appendChild(location);
  weatherDiv.appendChild(conditions);
  weatherDiv.appendChild(moreConditions);
}


form.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    inputCity.value = inputCity.value.replace(" ", "%20");
    let response = useApi(inputCity.value.toLowerCase());
    response.then((message) => showCurrentWeatherConditions(message));
  }
});
