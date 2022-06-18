const api = {
    key: "0697c9dfde59a3c9bb91e4bc00953917",
    base: "https://api.openweathermap.org/data/2.5/",
}

const search = document.querySelector('.search');
const error = document.querySelector('.error');
const btn = document.querySelector('.btn');

btn.addEventListener('click', getInput);

function getInput(e) {
    e.preventDefault();
    if(e.type == 'click') {
        getData(search.value);
    }
}

function getData() {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then((response) => {
        return response.json()
    })
    .then(displayData)
}

function getDataAut(d) {
    fetch(`${api.base}weather?q=${d}&units=metric&appid=${api.key}`)
    .then((response) => {
        return response.json()
    })
    .then(displayData)
}

function displayData(response) {
    if(response.cod === '404') {
        error.textContent = "please enter a valid city" ;
        search.value = "";
    } else {
        error.textContent = "";
        const city = document.querySelector('.city');
        city.innerText = `${response.name}, ${response.sys.country}`

        const today = new Date();
        const date = document.querySelector('.date');
        date.innerText = dateFunction(today);
        

        console.log(currentMonth);

        const temp = document.querySelector('.temp');
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)}<span>˚C</span>`;

        const weather = document.querySelector('.weather');
        weather.innerText = `Weather: ${response.weather[0].main}`

        const tempRange = document.querySelector('.temp-range');
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}˚C / ${Math.round(response.main.temp_max)}˚C`;

        const weatherIcon =document.querySelector('.weather-icon');
        const iconUrl = "https://api.openweathermap.org/img/w/";
        weatherIcon.src = iconUrl+`${response.weather[0].icon}`+".png";

        search.value = "";
    }
}

function dateFunction(d) {
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Junly', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    currentDate = d.getDate();
    currentday = dayOfWeek[d.getDay()];
    currentMonth = month[d.getMonth()];
    currentYear = d.getFullYear();

    return `${currentday}, ${currentMonth} ${currentDate} ${currentYear}`;
}

getDataAut('london');