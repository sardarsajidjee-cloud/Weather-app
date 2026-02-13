const cityCoords = {
  "Lahore": {lat: 31.52, lon: 74.35},
  "Karachi": {lat: 24.86, lon: 67.01},
  "Islamabad": {lat: 33.68, lon: 73.04},
  "Multan": {lat: 30.20, lon: 71.45},
  "Faisalabad": {lat: 31.41, lon: 73.11}
};

async function getWeather(){
  const city = document.getElementById("city").value;
  const resultDiv = document.getElementById("result");

  if(!cityCoords[city]){
    resultDiv.innerText = "City not found in database!";
    return;
  }

  const lat = cityCoords[city].lat;
  const lon = cityCoords[city].lon;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try{
    resultDiv.innerText = "Loading...";

    const response = await fetch(url);
    if(!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;

    resultDiv.innerHTML = `
      City: ${city} <br>
      Temperature: ${temp}°C <br>
      Wind Speed: ${wind} km/h
    `;

  } catch(error){
    console.error(error);
    resultDiv.innerText = "Error fetching weather data!";
  }
}
