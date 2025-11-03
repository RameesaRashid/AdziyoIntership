const apiKey = 'e3e6c9327d9240af9bc91207253010';


  // interface CitySuggestions{
  //   name: string,
  //   region: string,
  //   country: string
  // }

  interface WeatherResponse{
    location:{
      name: string;
      country: string;
      localtime: string
    };
    current:{
      temp_c: number,
      temp_f: number,
      condition:
      {
        text: string, 
        icon: string
      };
      wind_kph: number,
      humidity: number,
      feelslike_c: number
    };
  }
  
async function fetchWeather(city:string): Promise<void> {
const weatherDiv = document.getElementById("weather") as HTMLDivElement;
weatherDiv.innerHTML =`<p class="text-blue-700 animate-pulse">Fetching Weather data...</p>`
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
try {
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("City not found or API issue.");
  const data: WeatherResponse = await response.json();
  displayWeather(data);
} catch (error) {
  weatherDiv.innerHTML =`<p class="text-red-700">Failed to fetch weather for "${city}". Please check the name.</p>`  
}
}

// to display fetched data.
function displayWeather(data: WeatherResponse): void{
  const weatherDiv = document.getElementById("weather") as HTMLDivElement;

  const iconUrl = `https:${data.current.condition.icon}`;
  locationButton.style.display = "none";

  weatherDiv.innerHTML= `<div class= "text-white space-y-2">
  <h2 class= "text-3xl font-bold">${data.location.name}</h2>
  <p class= "text-gray-100 text-sm">${data.location.country}</p>
  <p class= "text-yellow-300 text-xs">${data.location.localtime}</p>
  <div class="flex justify-center">
  <p class= "text-slate-950 font-semibold text-4xl">${data.current.temp_c}°C </p>
  <p class= "text-red-800 font-semibold text-sm mt-4 ml-1.5">/ ${data.current.temp_f} °F</p>
  </div>
  <p class= "text-blue-800 font-serif text-xs">${data.current.condition.text}</p> 
  <img src= "${iconUrl}" alt="Weather icon" class="w-15 h-15 mt-2 text-center ml-83"/>
  <p>Feels like: ${data.current.feelslike_c} °C</p>
  <div class="flex justify-center gap-4 mt-3 text-sm text-white">
  <p>🌫️ Humidity: ${data.current.humidity}%</p>
  <p>🌬 Wind: ${data.current.wind_kph} km/h</p>
  </div>
  </div>`;
}

// EventListener
const cityInput = document.getElementById("city") as HTMLInputElement;
const getWeatherBtn = document.getElementById("getWeatherBtn") as HTMLButtonElement;

getWeatherBtn.addEventListener("click", ()=>{
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);    
  }else{
    const weatherDiv = document.getElementById("weather") as HTMLDivElement;
    weatherDiv.innerHTML= `<p class="text-red-900"> Please Enter a City Name.</p>`
  }

});

// cityInput.addEventListener("input",()=>{
//   const city = cityInput.value.trim();
//   if (city.length>1) {
//     fetchWeather(city);    
//   }
// });


// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(userData => {
    
//     console.log('User Data:', userData);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

const locationButton = document.getElementById("location") as HTMLButtonElement;


locationButton.addEventListener("click", ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error);
  }else{
    alert ("Geolocation is not supported by your browser.")
  }
});

async function success(position: GeolocationPosition): Promise <void> {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = "e3e6c9327d9240af9bc91207253010"
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    displayWeather(data);    
  }) 
  .catch(err => {
    console.error("Error fetching weather", err);
    alert("Unable to fetch Weather for your location")
  })
}

function error(err: GeolocationPositionError): void{
  if (err.code == err.PERMISSION_DENIED) {
    alert("Permission denied. Please allow location access");
  }else{
    alert("Unable to get your location.");
  }
}