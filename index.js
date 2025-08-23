console.log("Hello, world");
const weatherDiv = document.getElementById("weather-conditions");
const container = document.querySelector(".container");

const weather_crossing_api_key = "HVLE4KL3U5FZXW3LW55V46T8V";

async function useApi(location) {
  let my_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weather_crossing_api_key}`;

  const data = await fetch(my_url, { mode: "cors" });
  const weatherInfo = await data.json();

  return weatherInfo;
  // return new Promise((resolve) => {
  //   if (my_url != null) {
  //     const response = fetch(my_url, { mode: "cors" });
  //     resolve(response);
  //   }
  // }).then(function(message) {return message.json()})
  // // .then(data => console.log(data));
}

function changeBackground(datetime) {
  const time = datetime.split(":")[0];

  if (parseInt(time >= 17)) {
    container.id = "evening"
  } else if (time > 0 && time < 12) {
    container.id = "afternoon"
  } else {
    container.id = "morning"
  }
}

function printCurrentWeatherConditions(jsonMessage) {
  // place
  console.log(`${jsonMessage.address}`);

  // Humidity
  console.log(`Humidity: ${jsonMessage.currentConditions.humidity}%`);

  // Wind Conditions
  console.log(`Wind: ${jsonMessage.currentConditions.windspeed} mph`);
  
  // current conditions
  console.log(
    `Weather Conditions: ${jsonMessage.currentConditions.conditions}`
  );
  
  // all data
  console.log(jsonMessage);

  // today's date
  console.log(jsonMessage.days[0].datetime);

  // Current temp
  console.log(`Current Tempreture: ${jsonMessage.currentConditions.temp} °F`);


  const location = document.createElement("h3");
  location.textContent = jsonMessage.address;
  location.id = "location";


  const conditions = document.createElement("h1");
  conditions.textContent = jsonMessage.currentConditions.conditions;
  conditions.id = "conditions";

  const moreConditions = document.createElement("p");
  moreConditions.textContent = `Temp: ${jsonMessage.currentConditions.temp} °F   Humidity: ${jsonMessage.currentConditions.humidity}%    Wind: ${jsonMessage.currentConditions.windspeed} mph`;
  moreConditions.id = "moreConditions"

  weatherDiv.appendChild(location)
  weatherDiv.appendChild(conditions)
  weatherDiv.appendChild(moreConditions)

  changeBackground(jsonMessage.currentConditions.datetime)
}

let hello = useApi("brisbane");
console.log(hello.then((message) => printCurrentWeatherConditions(message)));

