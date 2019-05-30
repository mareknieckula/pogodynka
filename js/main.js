document.getElementById('checkWeather').addEventListener('click',getOtherWeather);
document.getElementById('refresh').addEventListener('click',getInfo);
window.onload = function() {
    getDate();
    getInfo();
}

function getDate(){
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var today = currentDate.getDate() + "."
              + month + "."
              + currentDate.getFullYear() + "r.";

    document.getElementById("displayDate").innerHTML="Dziś jest: " + today;
}

function getInfo() {
    var myLocation = document.getElementById("locationInfo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        myLocation.innerHTML = "Twoja przeglądarka nie obsługuje lokalizacji...";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var url = 'http://api.wunderground.com/api/fa2b9dddf90b619a/conditions/q/'+latitude+','+longitude+'.json'

    responseData = new XMLHttpRequest();
    responseData.open('GET',url,true);
    responseData.send();

    responseData.onload = function() {
        var localInformation = JSON.parse(responseData.responseText);
        console.log(localInformation);

        document.getElementById('locationInfo').innerHTML = localInformation.current_observation.display_location.full;

        document.getElementById('weatherIcon').src = localInformation.current_observation.icon_url;
        document.getElementById('weatherInfo').innerHTML =
            "Temperatura : " + localInformation.current_observation.temp_c + "&degC <br/>" +
            "Odczuwalna: " + localInformation.current_observation.feelslike_c + "&degC <br/>" +
            "Widoczność: " + localInformation.current_observation.visibility_km + " km <br/>" +
            "Wiatr: " + localInformation.current_observation.wind_kph + "km/h";
    }

}

function getOtherWeather() {
    var city = document.getElementById('otherCity').value;

    var url = 'http://api.wunderground.com/api/fa2b9dddf90b619a/conditions/q/Poland/'+city+'.json'

    weatherData = new XMLHttpRequest();
    weatherData.open('GET',url,true);
    weatherData.send();

    weatherData.onreadystatechange = function() {
        if (weatherData.readyState == 4 && weatherData.status == 200) {
            var weatherInformation = JSON.parse(weatherData.responseText);
            console.log(weatherInformation);

            document.getElementById('locationInfo').innerHTML = weatherInformation.current_observation.display_location.full;
            document.getElementById('weatherIcon').src = weatherInformation.current_observation.icon_url;
            document.getElementById('weatherInfo').innerHTML =
            "Temperatura : " + weatherInformation.current_observation.temp_c + "&degC <br/>" +
            "Odczuwalna: " + weatherInformation.current_observation.feelslike_c + "&degC <br/>" +
            "Widoczność: " + weatherInformation.current_observation.visibility_km + " km <br/>" +
            "Wiatr: " + weatherInformation.current_observation.wind_kph + "km/h";
            }
        }
}
