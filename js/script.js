const iconSearch = document.querySelector('.icon');
const iconLocation = document.querySelector('.secondIcon')

const mediumTemp = document.querySelector('.medium-temperature');
const myCity = document.querySelector('.main-city');

const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');
const pressure = document.querySelector('.pressure');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');




function convertCelsius(Kelvin) {
    return (Kelvin - 273.15).toFixed(2) + '°' ;
} 


//Creo la funzione che andrà a creare la richiesta di dati all'API
function dataRequest() {
    // Creo le componenti che saranno necessari nella richiesta di dati (chiave dell'API, città da cercare e Url)
    const apiKey = '706b0445abf518285fedad50a1ace2ba';
    const citySearch = document.getElementById("input").value;
    const searchUrl = `http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}`;


    document.getElementById("input").value = '';

    (async () => {
        try {
            const response = await fetch(searchUrl);
            const datiJson = await response.json();

            mediumTemp.textContent = convertCelsius(datiJson.main.temp);
            myCity.textContent = `${datiJson.name}, ${datiJson.sys.country}`;
            myCity.style.fontSize = '1.5em';

            maxTemp.textContent = convertCelsius(datiJson.main.temp_max);
            minTemp.textContent = convertCelsius(datiJson.main.temp_min);
            pressure.textContent = datiJson.main.pressure + ' hPa';
            wind.textContent = datiJson.wind.speed + ' km/h';
            humidity.textContent = datiJson.main.humidity + '%';
        } catch (err) {
            error()
        }

    })();
}


function weatherByPosition(position) {
    const apiKey1 = '706b0445abf518285fedad50a1ace2ba';
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const searchUrlByCord = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey1}`;

    (async () => {
        const response = await fetch(searchUrlByCord);
        const datiJson = await response.json();

        mediumTemp.textContent = convertCelsius(datiJson.main.temp);
        myCity.textContent = `${datiJson.name}, ${datiJson.sys.country}`;
        myCity.style.fontSize = '1.5em';

        maxTemp.textContent = convertCelsius(datiJson.main.temp_max);
        minTemp.textContent = convertCelsius(datiJson.main.temp_min);
        pressure.textContent = datiJson.main.pressure + ' hPa';
        wind.textContent = datiJson.wind.speed + ' km/h';
        humidity.textContent = datiJson.main.humidity + '%';

    })();


}

function error() {
    swal("C'è stato un problema!", 'Assicurati di aver inserito correttamente la tua città o riprova più tardi', 'warning', {
        className: 'avviso-errore'
    } )
}

function errorPosition() {
    swal("C'è stato un problema!", 'Non hai consentito al broswer di ottenere la tua posizione, riprova!', 'warning', {
        className: 'avviso-errore'
    } )
}


function falseFunction() {
    return
}

iconSearch.addEventListener('click', dataRequest);
iconLocation.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(weatherByPosition, errorPosition, {enableHighAccuracy: true, maximumAge: 60000, timeout: 5000
    })
});


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weatherByPosition, falseFunction ,  { enableHighAccuracy: true, maximumAge: 60000, timeout: 5000})
}