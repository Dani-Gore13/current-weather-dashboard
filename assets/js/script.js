const API_KEY = "c54e427ce0efe00a4cc548351acba42e";
const CITY_NAME = "Richmond";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}`;

// Get a reference to the weather button, weather forecast div, and city name and date elements
const weatherButton = document.getElementById("weatherButton");
const weatherForecast = document.getElementById("weatherForecast");
const cityNameElement = document.getElementById("cityName");
const dateElements = document.querySelectorAll(".date");

// Add a click event listener to the weather button
weatherButton.addEventListener("click", () => {
  // Fetch weather data from OpenWeatherMap API
  fetch(WEATHER_URL)
    .then((response) => response.json())
    .then((data) => {
      // Get the list of weather forecasts for the next 5 days
      const forecasts = data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );

      // Clear any existing weather forecast elements
      weatherForecast.innerHTML = "";

      // Display the weather forecast for each day
      forecasts.forEach((forecast, index) => {
        const date = new Date(forecast.dt_txt);
        const temperature = Math.round((forecast.main.temp - 273.15) * 9/5 + 32) ; // Convert temperature from Kelvin to Celsius
        const description = forecast.weather[0].description;
        const dayOfWeek = getDayOfWeek(date.getDay());

        // Create HTML elements to display the weather forecast
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");

        const dateElement = document.createElement("div");
        dateElement.classList.add("date");
        dateElement.textContent = `${dayOfWeek}, ${date.toLocaleDateString(
          "en-US"
        )}`;

        const temperatureElement = document.createElement("div");
        temperatureElement.textContent = `${temperature}°F`;

        const descriptionElement = document.createElement("div");
        descriptionElement.textContent = description;

        // Append the HTML elements to the weather forecast div
        dayElement.appendChild(dateElement);
        dayElement.appendChild(temperatureElement);
        dayElement.appendChild(descriptionElement);
        weatherForecast.appendChild(dayElement);

        // Update the city name and date for the first day of the forecast
        if (index === 0) {
          cityNameElement.textContent = data.city.name;
          dateElements.forEach(
            (element) =>
              (element.textContent = date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              }))
          );
        }
      });
    })
    .catch((error) => console.error(error));
});

// Utility function to get the day of the week from a numeric value (0-6)
function getDayOfWeek(day) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[day];
}
