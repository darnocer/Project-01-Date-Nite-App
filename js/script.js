$(document).ready(function () {
  var userCity;
  var userDate;

  var APIKeyGoogle = "AIzaSyDLnmaYaDkfgDwgSHFbipNdh5ztO6nFE3E";
  var APIKeyWeather = "c3dc07b6ca30d039abcea5db3779f996";
  var APIKeyEvents = "Ds8xghq3sGbqB3ntRWxevADM1AJPkuzm";

  $("#submit-button").on("click", function () {
    event.preventDefault();

    $("#user-inputs").addClass("is-hidden");
    $("#date-results").removeClass("is-hidden");
    userCity = $("#city-input").val();
    userDate = $("#date-input").val();
    getRestaurants();
    getBars();

    containers();
    getWeather();
    formatDate();
    getEvent();
  });

  $("#go-back").click(function () {
    $("#user-inputs").removeClass("is-hidden");
    $("#date-results").addClass("is-hidden");
  });

  function getRestaurants() {
    event.preventDefault();

    let corsURL = "https://cors-anywhere.herokuapp.com/";
    var queryURL =
      corsURL +
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      userCity +
      "+restaurants&key=" +
      APIKeyGoogle;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log("test test");

      var restaurantDetails = $(".restaurant-details");
      for (i = 0; i < 3; i++) {
        var nameRestaurant = [response.results[i].name];
        var addressRestaurant = [response.results[i].formatted_address];
        var ratingRestaurant = [response.results[i].rating];
        restaurantDetails[i].querySelector(
          ".restaurant-name"
        ).textContent = nameRestaurant;
        restaurantDetails[i].querySelector(
          ".restaurant-rating"
        ).textContent = ratingRestaurant;
        restaurantDetails[i].querySelector(
          ".restaurant-address"
        ).textContent = addressRestaurant;
      }
    });
  }

  function getBars() {
    event.preventDefault();

    let corsURL = "https://cors-anywhere.herokuapp.com/";
    var barsURL =
      corsURL +
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      userCity +
      "+bars&key=" +
      APIKeyGoogle;

    $.ajax({
      url: barsURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var barDetails = $(".bar-details");
      for (i = 0; i < 3; i++) {
        var nameBar = [response.results[i].name];
        var addressBar = [response.results[i].formatted_address];
        var ratingBar = [response.results[i].rating];
        barDetails[i].querySelector(".bar-name").textContent = nameBar;
        barDetails[i].querySelector(".bar-rating").textContent = ratingBar;
        barDetails[i].querySelector(".bar-address").textContent = addressBar;
      }
    });
  }

  function getEvent() {
    $.ajax({
      type: "GET",
      url:
        "https://app.ticketmaster.com/discovery/v2/events?apikey=" +
        APIKeyEvents +
        "&city=" +
        userCity,

      async: true,
      dataType: "json",
      success: function (response) {
        var results = response._embedded.events;
        console.log(results);

        //MOUAD functions
        var eventDetails = $(".event-details");
        console.log(eventDetails);
        for (i = 0; i < 3; i++) {
          var nameEvent = results[i].name;
          var dateEvent = results[i].dates.start.localDate;
          var priceEventMin = results[i].priceRanges[0].min;
          var priceEventMax = results[i].priceRanges[0].max;
          var linkEvent = results[i].url;

          console.log(linkEvent);

          eventDetails[i].querySelector(".event-name").textContent = nameEvent;
          eventDetails[i].querySelector(".event-date").textContent = dateEvent;
          eventDetails[i].querySelector(".event-price").textContent =
            "$" + priceEventMin + "-" + "$" + priceEventMax;
          eventDetails[i]
            .querySelector(".event-link")
            .setAttribute("href", linkEvent);
        }
      },
      error: function (xhr, status, err) {},
    });
  }

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

      var forecastDate;

      $("#temp").html("");

      for (i = 0; i < results.length; i++) {
        forecastDate = results[i].dt_txt.slice(0, 10);
        if (forecastDate === userDate) {
          var tempK = results[i].main.temp;
          weather = results[i].weather[0].main;
          break;
        }
      }

      if (tempK !== undefined) {
        var tempF = (tempK - 273.15) * 1.8 + 32;

        $("#temp").html("Temperature: " + tempF.toFixed(1) + " &deg;" + "F");

        $("#weather-icon").html("");
        renderIcons();
        weatherIcon = $("<img>").attr("src", imgURL);
        weatherIcon.attr("alt", "weather icon");

        $("#weather-icon").append(weatherIcon);
      } else {
        var unavailable = $("<p>").addClass("unavailable");
        unavailable.text("Weather data not available");
        $("#temp").append(unavailable);
      }
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

  function containers() {
    $("#user-inputs").addClass("is-hidden");
    $("#date-results").removeClass("is-hidden");
  }
});
