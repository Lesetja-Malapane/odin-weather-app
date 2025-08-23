console.log("Hello, world");

const weather_crossing_api_key = "HVLE4KL3U5FZXW3LW55V46T8V";

async function useApi(location) {
  let my_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weather_crossing_api_key}`;
  
  const data = await fetch(my_url, {mode: "cors"})
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

function printCurrentWeatherConditions(jsonMessage) {
// place
console.log(`${jsonMessage.address}`)

  // all data
  console.log(jsonMessage)

  // today's date
  console.log(jsonMessage.days[0].datetime)

  // Current temp
  console.log(`Current Tempreture: ${jsonMessage.currentConditions.temp} °F`)

  // Humidity
  console.log(`Humidity: ${jsonMessage.currentConditions.humidity}%`)

  // Wind Conditions
  console.log(`Wind: ${jsonMessage.currentConditions.windspeed} mph`)

  // current conditions
  console.log(`Weather Conditions: ${jsonMessage.currentConditions.conditions}`)
}


let hello = useApi("Johannesburg");
console.log(hello.then(message => printCurrentWeatherConditions(message)))
