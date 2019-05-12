import getWeatherIcon from './weather-icons';

export default class Weather {

    getWeatherData(apiKey, apiUrl, params = "q=Brno,cz") {

        let query =  fetch(`${apiUrl}weather?APPID=${apiKey}&${params}&units=metric&lang=CZ`);

        query
            .then(response => response.json())
            .then(data => this.displayWeatherData(data));
    }

    getTime(time){

        let date = new Date(time * 1000);

        return {
            hours: date.getHours(),
            minutes: date.getMinutes()
        }
    }

    displayWeatherData(data) {
        // console.log(data);

        const cityEl = document.querySelector("#mesto");
        const tempEl = document.querySelector("#teplota");
        const descriptionEl = document.querySelector("#popis");
        const iconEl = document.querySelector("#ikona");
        const humidityEl = document.querySelector("#vlhkost");
        const speedEl = document.querySelector("#vitr");
        const sunriseEl = document.querySelector("#vychod");
        const sunsetEl = document.querySelector("#zapad");

        cityEl.textContent = data.name;
        tempEl.textContent = Math.round(data.main.temp);
        descriptionEl.textContent = data.weather[0].description;
        iconEl.innerHTML = getWeatherIcon(data.weather[0].id, data.weather[0].icon);
        humidityEl.textContent = data.main.humidity;
        speedEl.textContent = data.wind.speed.toFixed(1);

        let sunrise = this.getTime(data.sys.sunrise);
        let sunset = this.getTime(data.sys.sunset);

        sunriseEl.textContent = `${sunrise.hours}:${sunrise.minutes}`;
        sunsetEl.textContent = `${sunset.hours}:${sunset.minutes}`;
    }

}
