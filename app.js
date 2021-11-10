const btnSwitch = document.querySelector('#switch');
const API_KEY='74a84bd7f45ef94da50d9ec454b76e37';
let visibilidad1;

// ---------------------------------detectar modo noche--------------------------------------
function detectar_modo(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        btnSwitch.classList.toggle('active');
        document.body.classList.toggle('dark');
        localStorage.setItem('dark-mode', 'true');
    }
};
detectar_modo();
btnSwitch.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');

});
//---------------------------------------api-clima-del-dia--------------------------------------------------
const fetchData = position =>{
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?&lang=sp&units=metric&lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}`)
        .then(response=>response.json())
        .then(data=>setWeatherData(data));
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response=>response.json())
        .then(data1=>setWeatherData1(data1));
}
const setWeatherData=data=>{
    console.log(data);
    const weatherData={
        description: data.current.weather[0].description,
        humidity: data.current.humidity,
        pressure: data.current.pressure,
        temperature: data.current.temp,
        wind: data.current.wind_speed,
        max_1:data.daily[1].temp.max,
        min_1:data.daily[1].temp.min,
        max_2:data.daily[2].temp.max,
        min_2:data.daily[2].temp.min,
        max_3:data.daily[3].temp.max,
        min_3:data.daily[3].temp.min,
        max_4:data.daily[4].temp.max,
        min_4:data.daily[4].temp.min,
        max_5:data.daily[5].temp.max,
        min_5:data.daily[5].temp.min,
        

        
    }
    visibilidad1=data.current.visibility;
    visibilidaText();
    function visibilidaText(){
        if(visibilidad1>=0 && visibilidad1<=24){
            document.getElementById('visibility').innerHTML='Con Niebla densísima';
        }
        if(visibilidad1>=25 && visibilidad1<=49){
            document.getElementById('visibility').innerHTML='Con Niebla muy densa';
        }
        if(visibilidad1>=50 && visibilidad1<=99){
            document.getElementById('visibility').innerHTML='Con Niebla espesa';
        }
        if(visibilidad1>=100 && visibilidad1<=999){
            document.getElementById('visibility').innerHTML='Con Niebla';
        }
        if(visibilidad1>=1000 && visibilidad1<=9999){
            document.getElementById('visibility').innerHTML='Con Neblina ';
        }
        if(visibilidad1>=10000 && visibilidad1<=50000){
            document.getElementById('visibility').innerHTML='Despejado';
        }
    }
    Object.keys(weatherData).forEach(key=>{
        document.getElementById(key).textContent = weatherData[key];
    });
}
const setWeatherData1=data1=>{
    
    const weatherData={
        location: data1.name,
    }
    Object.keys(weatherData).forEach(key=>{
        document.getElementById(key).textContent = weatherData[key];
    });  
}
//---------------------------------obtener-hora------------------------------------------------
var hoy=new Date();
var fecha = hoy.getDate() + '/' + ( hoy.getMonth() + 1 ) + '/' + hoy.getFullYear();
var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('hora').innerHTML=t;
  }
document.getElementById('date').innerHTML=fecha;
//-------------------------------cordenadas----------------------------------------------------
const onLoad=()=>{
    navigator.geolocation.getCurrentPosition(fetchData);
}



