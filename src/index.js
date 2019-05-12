import Weather from './weather';
import Forecast from './forecast';
import Geolocation from './geolocation';

const apiKey = 'b873b3cd2a6fe46f2345df4722c65732';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';


let weather = new Weather();
let forecast = new Forecast();
let location = new Geolocation();

weather.getWeatherData(apiKey, apiUrl);
forecast.getForecastData(apiKey, apiUrl);


document.querySelector("#currentLocation").addEventListener('click', async () => {
    const geo = await location.getLocation();
    console.log(geo);
    weather.getWeatherData(apiKey, apiUrl, `lat=${geo.coords.latitude}&lon=${geo.coords.longitude}`);
    forecast.getForecastData(apiKey, apiUrl, `lat=${geo.coords.latitude}&lon=${geo.coords.longitude}`);
});

document.querySelector("#praha").addEventListener('click', () => {
    weather.getWeatherData(apiKey, apiUrl, `q=Praha,cz`);
    forecast.getForecastData(apiKey, apiUrl, `q=Praha,cz`);
});

document.querySelector("#barcelona").addEventListener('click', () => {
    weather.getWeatherData(apiKey, apiUrl, `q=Barcelona,es`);
    forecast.getForecastData(apiKey, apiUrl, `q=Barcelona,es`);
});

document.querySelector("#newyork").addEventListener('click', () => {
    weather.getWeatherData(apiKey, apiUrl, `lat=40.71&lon=-74.01`);
    forecast.getForecastData(apiKey, apiUrl, `lat=40.71&lon=-74.01`);
});
