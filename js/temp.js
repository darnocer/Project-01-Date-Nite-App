$(document).ready(function () {
  var APIKeyWeather = "c3dc07b6ca30d039abcea5db3779f996";
  // var userCity = $("#city-input").val();
  // var userDate = $("#date-input").val();

  var userCity = "denver";
  var userDate = "2020-05-06";
  var weather;

  function getWeather() {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&appid=" +
      APIKeyWeather;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var results = response.list;
      console.log(results);

      var date;

      for (i = 0; i < results.length; i++) {
        date = results[i].dt_txt.slice(0, 10);
        if (date === userDate) {
          var tempK = results[i].main.temp;
          weather = results[i].weather[0].main;
          break;
        }
      }

      var tempF = (tempK - 273.15) * 1.8 + 32;

      $("#temp").html("Temperature: " + tempF.toFixed(1) + " &deg;" + "F");

      $("#weather-icon").html("");
      renderIcons();
      weatherIcon = $("<img>").attr("src", imgURL);
      weatherIcon.attr("alt", "weather icon");

      $("#weather-icon").append(weatherIcon);
    });
  }

  function formatDate() {
    var formattedDate = moment(userDate, "Y-M-D").format("dddd, MMMM D");
    $("#date-of").text("Weather for " + formattedDate);
  }

  function renderIcons() {
    var stormIcon = "11d";
    var drizzleIcon = "09d";
    var rainIcon = "10d";
    var snowIcon = "13d";
    var atmosphereIcon = "50d";
    var clearIcon = "01d";
    var cloudIcon = "02d";

    if (weather === "Thunderstorm") {
      icon = stormIcon;
    } else if (weather === "Drizzle") {
      icon = drizzleIcon;
    } else if (weather === "Rain") {
      icon = rainIcon;
    } else if (weather === "Snow") {
      icon = snowIcon;
    } else if (weather === "Clear") {
      icon = clearIcon;
    } else if (weather === "Clouds") {
      icon = cloudIcon;
    } else {
      icon = atmosphereIcon;
    }

    imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  }

  getWeather();
  formatDate();
});