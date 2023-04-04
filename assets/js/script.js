const apiKey = "API_KEY"; // replace with API key
const city = "Richmond"; // replace with the name of the city you want to retrieve data for

// use the OpenWeatherMap API to retrieve weather data for the city
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // log the retrieved data to the console for debugging

    // get the necessary data from the retrieved JSON object
    const cityName = data.city.name;
    const temperature = data.list[0].main.temp; 
    const description = data.list[0].weather[0].description;

    // update the HTML elements in the weather dashboard with the retrieved data
    document.getElementById("city-name").textContent = cityName;
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("description").textContent = description;
  })
  .catch(error => console.error(error)); // log any errors to the console