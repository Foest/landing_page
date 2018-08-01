const weatherPanel = document.querySelector('.weather-panel');
let coords;
let weatherInfoCurrent;
let weatherInfoForcast;
const weatherIcons = {
    clear: 'https://static.thenounproject.com/png/653889-200.png',
    clouds: 'https://static.thenounproject.com/png/653891-200.png',
    rain: 'https://static.thenounproject.com/png/653883-200.png',
    snow: 'https://static.thenounproject.com/png/655907-200.png'
}



function error(e) {
    console.warn(`ERROR(${e.code}): ${e.message}`);
}

function displayWeather() {
    if(weatherInfoCurrent){
        let iconLink = weatherIcons.hasOwnProperty((weatherInfoCurrent.description).toLowerCase()) ? weatherIcons[(weatherInfoCurrent.description).toLowerCase()] : weatherIcons['clear'];
        let icon = weatherPanel.querySelector('#weather-icon');
        let temp = weatherPanel.querySelector('#weather-temp');
        let name = weatherPanel.querySelector('#weather-name');
        temp.textContent = `${weatherInfoCurrent.temp}°F`;
        icon.src = iconLink;
        name.textContent = `${weatherInfoCurrent.name}`;
    }
}

function getWeather() {
    //Check if geolocation is available, and if so attempt to get the user's location
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            coords = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/forecast?APPID=94e0a125bbf1b5625a0bc4dbe35ea72a&lat=${coords.latitude}&lon=${coords.longitude}`)
                .then((response) => { return response.json() })
                .then((json) => {
                    weatherInfoForecast = {
                    };
                    displayWeather();
                })
                .catch(error);

            fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=94e0a125bbf1b5625a0bc4dbe35ea72a&lat=${coords.latitude}&lon=${coords.longitude}`)
                .then((response) => { return response.json() })
                .then((json) => {
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

