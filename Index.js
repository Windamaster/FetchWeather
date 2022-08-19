//Es una Key generada por la API cuando nos registramos
const APP_ID = '895ac7d2b93c1beca8afc75e48f2fccf';

//weather recibe la informacion de la ubicacion del usuario mediante coordenadas
//el fetch busca en la API toda la data del clima en la ubicacion del usuario
const weather = position => {
    const { latitude, longitude } = position.coords;
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}')
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

//Almacenar la informacion del clima
const setWeatherData = data => {
    //Se almacena todo en la variable "weatherData"
    const weatherData = {
         location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    //Recorre el objeto y devuelve las key para mostrarlas en el HTML
    Object.keys(weatherData).forEach( key => {
        setTextContent(key, weatherData[key]);
    });

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; 
    container.style.display = 'flex'; 
}

//Obtiene la fecha DD-MM-AAAA
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text; 
}

//Se obtiene la ubicacion del usuario con navigator
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(weather)
}
