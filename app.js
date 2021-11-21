const btnSwitch = document.querySelector('#switch');
const btnSwitch2 = document.querySelector('#switch2');
const loading=document.querySelector('#onload');
const API_KEY='74a84bd7f45ef94da50d9ec454b76e37';
let clima;
let visibilidad1;

//variables imagnes
let clear_sky_day='<lottie-player src="https://assets6.lottiefiles.com/temp/lf20_Stdaec.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay ></lottie-player>';
let clear_sky_night='<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_5ummrxou.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay ></lottie-player>';
let few_clouds_day='<lottie-player src="https://assets6.lottiefiles.com/temp/lf20_dgjK9i.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';
let few_clouds_night='<lottie-player src="https://assets7.lottiefiles.com/packages/lf20_iiga74ve.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';
let scattered_clouds='<lottie-player src="https://assets6.lottiefiles.com/temp/lf20_VAmWRg.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>'; 
let broken_clouds='<lottie-player src="https://assets10.lottiefiles.com/packages/lf20_qraxezms.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';
let shower_rain='<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_y0m1ai0y.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';
let rain_day='<lottie-player src="https://assets6.lottiefiles.com/temp/lf20_rpC1Rd.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';
let rain_night='<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_uafa2nyv.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';
let thunderstorm ='<lottie-player src="https://assets6.lottiefiles.com/temp/lf20_XkF78Y.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';
let snow ='<lottie-player src="https://assets6.lottiefiles.com/temp/lf20_WtPCZs.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';
let mist='<lottie-player src="https://assets6.lottiefiles.com/temp/lf20_kOfPKE.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>';


// ---------------------------------detectar modo noche--------------------------------------
function detectar_modo(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        btnSwitch.classList.toggle('active');
        document.body.classList.toggle('dark');
        loading.classList.toggle('pre-drak');
        localStorage.setItem('dark-mode', 'true');
    }
};
detectar_modo();
btnSwitch.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
});
//-------------------------------------Cambiar-grados----------------
btnSwitch2.addEventListener('click', ()=>{
    btnSwitch2.classList.toggle('active');
    if(btnSwitch2.classList.contains('active')){
        localStorage.setItem('grados', 'true');
        btnSwitch2.classList.toggle('active');
        location.reload();
    }else{
        localStorage.setItem('grados', 'false');
        location.reload();
    }
});
if(localStorage.getItem('grados')==='true'){
    grados='';
    btnSwitch2.classList.toggle('active');
    
}else{
    grados='&units=metric';
    btnSwitch2.classList.remove('active');
}

//---------------------------------------api-clima-del-dia--------------------------------------------------

const fetchData = position =>{
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?&${grados}&lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}`)
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
    //----------------------------------imagenes---------------------------------------------------
    clima=data.current.weather[0].description;
    if(clima!=''){
        $('#onload').fadeOut();
    }
    function colocarImagenes(){
        switch(clima){
            case 'clear sky':
                document.getElementById('img_weather').innerHTML=clear_sky_day;
                break;
            case 'few clouds':
                document.getElementById('img_weather').innerHTML=few_clouds_day;
                break;
            case 'scattered clouds':
                document.getElementById('img_weather').innerHTML=scattered_clouds;
                break;
            case 'broken clouds':
                document.getElementById('img_wether').innerHTML=broken_clouds;
                break;
            case 'shower rain':
                document.getElementById('img_weather').innerHTML=shower_rain;
                break;
            case 'rain':
                document.getElementById('img_weather').innerHTML=rain_day;
                break;
            case 'thunderstorm':
                document.getElementById('img_weather').innerHTML=thunderstorm;
                break;
            case 'snow':
                document.getElementById('img_weather').innerHTML=snow;
                break;
            case 'mist':
                document.getElementById('img_weather').innerHTML=mist;
                break;
        }


        
        
    }
    colocarImagenes();
    //----------------------------------visibilidad------------------------------------------------
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



//precarga

    
