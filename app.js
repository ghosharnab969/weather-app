const key = "78f2cbb4f21daf2cf6b7cd2256296ab8";
const formE1 = document.querySelector("form");
const details = document.querySelector(".details");

formE1.addEventListener("submit", (e) => {
  e.preventDefault();
  details.innerHTML = "<h1>Loading...<h1>";
  const location = e.target.location.value;
  weatherApp(location);
});

async function weatherApp(location) {
  const data = await fetchAPI(location);
  generateHTML(data);
}

async function fetchAPI(location) {
  const baseURL = `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
  const res = await fetch(baseURL);
  const data = await res.json();
  console.log(data);
  return data;
}

function generateHTML(data) {
  const html = `
   <h1 class="temp">${data.current.temperature}°C</h1>
          <h1 class="status">${data.current.weather_descriptions
            .map((item) => item)
            .join(" ")}</h1>
          <div class="more-info">
            <p>Humidity : ${data.current.humidity}%</p>
            <p>Wind Speed : ${data.current.wind_speed} km/hr</p>
            <p>Wind Direction : ${data.current.wind_dir}</p>
            <p>Pressure : ${data.current.pressure} MB</p>
          </div>
          <div class="query">${data.request.query}</div>
  `;
  details.innerHTML = html;
}