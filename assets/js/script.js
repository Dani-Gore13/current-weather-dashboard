const API_KEY = "c54e427ce0efe00a4cc548351acba42e";
const CITY_NAME = "Richmond";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${Richmond}&appid=${c54e427ce0efe00a4cc548351acba42e}`;

// Get a reference to the weather button and weather forecast div
const weatherButton = document.getElementById("weatherButton");
const weatherForecast = document.getElementById("weatherForecast");

// Add a click event listener to the weather button
weatherButton.addEventListener("click", () => {
  // Fetch weather data from OpenWeatherMap API
  fetch(WEATHER_URL)
    .then(response => response.json())
    .then(data => {
      // Get the list of weather forecasts for the next 5 days
      const forecasts = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

      // Clear any existing weather forecast elements
      weatherForecast.innerHTML = "";

      // Display the weather forecast for each day
      forecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const temperature = Math.round(forecast.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
        const description = forecast.weather[0].description;

        // Create HTML elements to display the weather forecast
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");

        const dateElement = document.createElement("div");
        dateElement.textContent = date.toLocaleDateString("en-US", {weekday: "long"});

        const temperatureElement = document.createElement("div");
        temperatureElement.textContent = `${temperature}°C`;

        const descriptionElement = document.createElement("div");
        descriptionElement.textContent = description;

        // Append the HTML elements to the weather forecast div
        dayElement.appendChild(dateElement);
        dayElement.appendChild(temperatureElement);
        dayElement.appendChild(descriptionElement);
        weatherForecast.appendChild(dayElement);
      });
    })
    .catch(error => console.error(error));
});
