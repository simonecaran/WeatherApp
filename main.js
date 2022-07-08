// Crezione degli URL per le fetch
let urlTimezoneApi = 'https://timezoneapi.io/api/ip/?token='
let tokenTimezoneApi //Inserire token di TimezoneApi
let completeUrlTimezone = urlTimezoneApi + tokenTimezoneApi
let weatherAppID = '&appid=' // Dopo l'uguale inserire appID di openweathermap
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
let completeWeatherUrl
// QuerySelector dall'HTML
let iconIMG = document.querySelector('#Icon')
let weatherP = document.querySelector('#weather')
let cityP = document.querySelector('#city')
let tempMinP = document.querySelector('#tempMin')
let tempMaxP = document.querySelector('#tempMax')
let tempP = document.querySelector('#temp')
let btn = document.querySelector('#button')
let cityInput = document.querySelector('#cityInput')
// Inizializzazione variabile per città
let city
// Cattura della città di provienenza dell'utente
fetch(completeUrlTimezone)
.then(response => response.json())
.then(data => {
    city = data.data.city
    completeWeatherUrl = weatherUrl + data.data.city + weatherAppID;
})
// Cattura del meteo
 setTimeout(()=>{
    fetch(completeWeatherUrl)
    .then(response => response.json())
    .then(data => {
        let icon = data.weather[0].icon;
        let urlIcon = 'http://openweathermap.org/img/wn/'
        let endurl = '@2x.png'
        let allUrl = urlIcon + icon + endurl
        iconIMG.setAttribute('src',allUrl)
        let tempMax = Math.round(KelvinToCelsius(data.main.temp_max))
        let tempMin = Math.round(KelvinToCelsius(data.main.temp_min))
        let temp = Math.round(KelvinToCelsius(data.main.temp))
        cityP.innerHTML = `${data.name}`
        tempMaxP.innerHTML = `Temperatura massima: ${tempMax} &deg;C`
        tempMinP.innerHTML = `Temperatura minima: ${tempMin} &deg;C`
        tempP.innerHTML = `Temperatura attuale: ${temp} &deg;C`
        weatherP.innerHTML = `Descrizione: ${data.weather[0].description}`
    })
},1000)

// Eventi per la ricerca
btn.addEventListener('click',()=>{
    city = cityInput.value;
    cityInput.value = ''
    completeWeatherUrl = weatherUrl + city + weatherAppID
    fetch(completeWeatherUrl)
    .then(response => response.json())
    .then(data => {
        let icon = data.weather[0].icon;
        let urlIcon = 'http://openweathermap.org/img/wn/'
        let endurl = '@2x.png'
        let allUrl = urlIcon + icon + endurl
        iconIMG.setAttribute('src',allUrl)
        let tempMax = Math.round(KelvinToCelsius(data.main.temp_max))
        let tempMin = Math.round(KelvinToCelsius(data.main.temp_min))
        let temp = Math.round(KelvinToCelsius(data.main.temp))
        cityP.innerHTML = `${data.name}`
        tempMaxP.innerHTML = `Temperatura massima: ${tempMax} &deg;C`
        tempMinP.innerHTML = `Temperatura minima: ${tempMin} &deg;C`
        tempP.innerHTML = `Temperatura attuale: ${temp} &deg;C`
        weatherP.innerHTML = `Descrizione: ${data.weather[0].description}`
})})

document.querySelector('#weatherSearch').addEventListener('submit',()=>{
    event.preventDefault()
    city = cityInput.value;
    cityInput.value = ''
    completeWeatherUrl = weatherUrl + city + weatherAppID
    fetch(completeWeatherUrl)
    .then(response => response.json())
    .then(data => {
        let icon = data.weather[0].icon;
        let urlIcon = 'http://openweathermap.org/img/wn/'
        let endurl = '@2x.png'
        let allUrl = urlIcon + icon + endurl
        iconIMG.setAttribute('src',allUrl)
        let tempMax = Math.round(KelvinToCelsius(data.main.temp_max))
        let tempMin = Math.round(KelvinToCelsius(data.main.temp_min))
        let temp = Math.round(KelvinToCelsius(data.main.temp))
        cityP.innerHTML = `${data.name}`
        tempMaxP.innerHTML = `Temperatura massima: ${tempMax} &deg;C`
        tempMinP.innerHTML = `Temperatura minima: ${tempMin} &deg;C`
        tempP.innerHTML = `Temperatura attuale: ${temp} &deg;C`
        weatherP.innerHTML = `Descrizione: ${data.weather[0].description}`
})})
 
function KelvinToCelsius(temp){
    return temp - 273;
}
