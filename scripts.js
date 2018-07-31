const weatherPanel = document.querySelector('.weather-panel');
const weatherPanelText = weatherPanel.querySelector('p');
let coords;
let weatherInfoCurrent;
let weatherInfoForcast;



function error(e) {
    console.warn(`ERROR(${e.code}): ${e.message}`);
}

function displayWeather() {
    if (weatherInfoCurrent) {

        weatherPanelText.textContent = `${weatherInfoCurrent.temp} -- ${weatherInfoCurrent.name} -- ${weatherInfoCurrent.description}`;
    }
}

function getWeather() {
    //Check if geolocation is available, and if so attempt to get the user's location
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            coords = position.coords;
            weatherPanelText.textContent = `Looking Up Weather(${coords.latitude},${coords.longitude})`;
            fetch(`https://api.openweathermap.org/data/2.5/forecast?APPID=94e0a125bbf1b5625a0bc4dbe35ea72a&lat=${coords.latitude}&lon=${coords.longitude}`)
                .then((response) => { return response.json() })
                .then((json) => {
                    console.log(json);
                    weatherInfoForecast = {
                    };
                    displayWeather();
                })
                .catch(error);

            fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=94e0a125bbf1b5625a0bc4dbe35ea72a&lat=${coords.latitude}&lon=${coords.longitude}`)
                .then((response) => { return response.json() })
                .then((json) => {
                    console.log(json);
                    weatherInfoCurrent = {
                        temp: Math.round((parseInt(json.main.temp)) * (9/5) -  459.67),
                        name: json.name,
                        description: json.weather[0].main,
                        windSpeed: json.wind.speed
                    };
                    displayWeather();
                })
                .catch(error);
        }, error);
    }
}

getWeather();

