import getWeatherIcon from './weather-icons';

const arrayDays = ['Neděle', 'Pondelí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
let forecastData = [];

export default class Forecast {
    getForecastData(apiKey, apiUrl, params = "q=Brno,cz") {
        let query =  fetch(`${apiUrl}forecast?APPID=${apiKey}&${params}&units=metric&lang=CZ`);

        query
            .then(response => response.json())
            .then(dataReceived => {
                forecastData = dataReceived.list.map(forecastDays => {
                    return {
                        temp: Math.round(forecastDays.main.temp),
                        date: this.getDate(forecastDays.dt),
                        icon: getWeatherIcon(forecastDays.weather[0].id, forecastDays.weather[0].icon)
                    }
                });
                // console.log(forecastData);
                this.displayForecastData(forecastData);
        })
    }

    getDate(time){
        let date = new Date(time*1000);

        return {
            weekDay: date.getDay(),
            day: date.getDate(),
            month: date.getMonth()+1
        }
    }

    displayForecastData(data) {

        const groups = data.reduce((groups, forecast) => {
            const date = forecast.date.day;
            if (!groups[date]) {
                groups[date] = [];
            }
            // groups[date].push(forecast.temp);
            groups[date].push(forecast);

            return groups;
        }, {});

        const temps = Object.keys(groups).map((day) => {

            return groups[day].reduce(function(prev, current) {
                    if (current.temp > prev.temp) {
                        return current;
                    } else {
                        return prev;
                    }
                })

        });

        this.getHTML(temps.slice(1,-1));

    }

    getHTML(list){
        document.querySelector('#predpoved').innerHTML = list.reduce((total, curr) => {
            return total + this.renderForecast(curr)
        }, '');
    }

    renderForecast(object){
        return `
        <div class="forecast">
            <div class="forecast__day">${arrayDays[object.date.weekDay]} ${object.date.day}. ${object.date.month}.</div>
            <div class="forecast__icon">${object.icon}</div>
            <div class="forecast__temp">${object.temp} °C</div>
      </div>

        `
    }
}