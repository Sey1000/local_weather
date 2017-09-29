var xhr = new XMLHttpRequest();
xhr.open('GET', "https://ipinfo.io/json", true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    $('#user-city').text(response.city + ", " + response.country);
    var coord = response.loc.split(",")
    requestWeather(coord);
  }
}

function requestWeather(coord) {
  var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + coord[0] + "&lon=" + coord[1] + "&APPID=efddbb03e13590ab0d1995b27a3dd606";
  var weatherXhr = new XMLHttpRequest();
  weatherXhr.open('GET', weatherUrl, true);
  weatherXhr.send()
  weatherXhr.addEventListener("readystatechange", processWeatherRequest, false);
 
  function processWeatherRequest(e) {
    if (weatherXhr.readyState == 4 && weatherXhr.status == 200) {
      var weatherResponse = JSON.parse(weatherXhr.responseText);
      var temperature = Math.round((weatherResponse.main.temp - 273.15) * 10) / 10;
      $('#temperature').text(temperature);

      var currentWeather = weatherResponse.weather[0].main;
      $('#weather').text(currentWeather);

      var iconNum = weatherResponse.weather[0].icon;
      var imgSrc = "http://openweathermap.org/img/w/" + iconNum + ".png";
      $("#weather-icon").attr('src', imgSrc);
      readyForClick(temperature);
    }
  }
}

function readyForClick(temperature) {
  $("#change-unit").click(function() {
    if ($(this).hasClass('cel')) {
      $('#temperature').text(Math.round(temperature * 9 / 5 + 32));
      $(this).text('F');
    } else {
      $('#temperature').text(temperature);
      $(this).text('C');
    }
    $(this).toggleClass('cel');
  });
};