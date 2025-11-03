var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiKey = 'e3e6c9327d9240af9bc91207253010';
function fetchWeather(city) {
    return __awaiter(this, void 0, void 0, function () {
        var weatherDiv, apiUrl, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weatherDiv = document.getElementById("weather");
                    weatherDiv.innerHTML = "<p class=\"text-blue-700 animate-pulse\">Fetching Weather data...</p>";
                    apiUrl = "https://api.weatherapi.com/v1/current.json?key=".concat(apiKey, "&q=").concat(city, "&aqi=yes");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(apiUrl)];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("City not found or API issue.");
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    displayWeather(data);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    weatherDiv.innerHTML = "<p class=\"text-red-700\">Failed to fetch weather for \"".concat(city, "\". Please check the name.</p>");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// to display fetched data.
function displayWeather(data) {
    var weatherDiv = document.getElementById("weather");
    var iconUrl = "https:".concat(data.current.condition.icon);
    locationButton.style.display = "none";
    weatherDiv.innerHTML = "<div class= \"text-white space-y-2\">\n  <h2 class= \"text-3xl font-bold\">".concat(data.location.name, "</h2>\n  <p class= \"text-gray-100 text-sm\">").concat(data.location.country, "</p>\n  <p class= \"text-yellow-300 text-xs\">").concat(data.location.localtime, "</p>\n  <div class=\"flex justify-center\">\n  <p class= \"text-slate-950 font-semibold text-4xl\">").concat(data.current.temp_c, "\u00B0C </p>\n  <p class= \"text-red-800 font-semibold text-sm mt-4 ml-1.5\">/ ").concat(data.current.temp_f, " \u00B0F</p>\n  </div>\n  <p class= \"text-blue-800 font-serif text-xs\">").concat(data.current.condition.text, "</p> \n  <img src= \"").concat(iconUrl, "\" alt=\"Weather icon\" class=\"w-15 h-15 mt-2 text-center ml-83\"/>\n  <p>Feels like: ").concat(data.current.feelslike_c, " \u00B0C</p>\n  <div class=\"flex justify-center gap-4 mt-3 text-sm text-white\">\n  <p>\uD83C\uDF2B\uFE0F Humidity: ").concat(data.current.humidity, "%</p>\n  <p>\uD83C\uDF2C Wind: ").concat(data.current.wind_kph, " km/h</p>\n  </div>\n  </div>");
}
// EventListener
var cityInput = document.getElementById("city");
var getWeatherBtn = document.getElementById("getWeatherBtn");
getWeatherBtn.addEventListener("click", function () {
    var city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
    else {
        var weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = "<p class=\"text-red-900\"> Please Enter a City Name.</p>";
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
var locationButton = document.getElementById("location");
locationButton.addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
        alert("Geolocation is not supported by your browser.");
    }
});
function success(position) {
    return __awaiter(this, void 0, void 0, function () {
        var lat, lon, apiKey, url;
        return __generator(this, function (_a) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            apiKey = "e3e6c9327d9240af9bc91207253010";
            url = "https://api.weatherapi.com/v1/current.json?key=".concat(apiKey, "&q=").concat(lat, ",").concat(lon, "&aqi=yes");
            fetch(url)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                displayWeather(data);
            })
                .catch(function (err) {
                console.error("Error fetching weather", err);
                alert("Unable to fetch Weather for your location");
            });
            return [2 /*return*/];
        });
    });
}
function error(err) {
    if (err.code == err.PERMISSION_DENIED) {
        alert("Permission denied. Please allow location access");
    }
    else {
        alert("Unable to get your location.");
    }
}
