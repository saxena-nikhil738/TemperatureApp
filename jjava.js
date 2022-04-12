// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// 5a955640326090c69c5a948c51f4225d
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key : "408907116591bc78005e71fd0842e7ea",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const search = document.getElementById("search-bar");

search.addEventListener("keypress", (event)=> {
   
   if(event.keyCode == 13){
      console.log(search.value);
      getReport(search.value);
      document.querySelector('.weather-body').style.display = 'block';
   }
    
});

function getReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showReport);
}

function showReport(weather){
    console.log(weather);

    let city = document.getElementById("city");
    city.innerHTML = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById("temp");
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;c`;

    let minMaxTemp = document.getElementById("min-max");
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;c (min) / ${Math.ceil(weather.main.temp_max)}&deg;c (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById("date");
    let todayDate = new Date();
    date.innerHTML = dateManager(todayDate);

    if(weatherType.textContent = 'clear'){
        document.body.style.backgroundImage = 'url("clear.jpg")';
    }
    else if(weatherType.textContent = 'haze'){
        document.body.style.backgroundImage = 'url("haze.jpg")';
    }
    else if(weatherType.textContent = 'cloud'){
        document.body.style.backgroundImage = 'url("cloud.jpg")';
    }
    else if(weatherType.textContent = 'rain'){
        document.body.style.backgroundImage = 'url("rain.jpg")';
    }
}

function dateManager(dateArgs){
    let days = ['Sun','Mon','Tues','thurs','Fri','Sat'];
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

    let year = dateArgs.getFullYear();
    let month = months[dateArgs.getMonth()];
    let date = dateArgs.getDate();
    let day = days[dateArgs.getDay()];

    return `${date} ${month} ${day} ${year}`;
}