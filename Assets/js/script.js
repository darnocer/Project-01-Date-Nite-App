$(document).ready(function () {
  // global variables
  var userCity;
  var userDate;
  var weather;

  // API keys even though these shouldn't be here
  var APIKeyGoogle = "AIzaSyDLnmaYaDkfgDwgSHFbipNdh5ztO6nFE3E";
  var APIKeyWeather = "c3dc07b6ca30d039abcea5db3779f996";
  var APIKeyEvents = "Ds8xghq3sGbqB3ntRWxevADM1AJPkuzm";

  // when "plan my date" button is clicked
  $("#submit-button").on("click", function () {
    event.preventDefault();

    // get user input
    userCity = $("#city-input").val();
    // userCity.text(str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());
    userDate = $("#date-input").val();

    // force user to enter city
    if (userCity === "") {
      $(".validate").removeClass("is-hidden");
    } else {
      $(".validate").add("is-hidden");

      showResults();
      getWeather();
      getRestaurants();
      getBars();
      getEvents();
      formatDate();
    }
  });

  // plan another date button
  $("#go-back").click(function () {
    // swap to show inputs containers
    $("#user-inputs").removeClass("is-hidden");
    $("#date-results").addClass("is-hidden");

    // clear user inputs
    $("#city-input").val("");
    $("#date-input").val("");
  });

  // hides the inputs and displays results
  function showResults() {
    $("#user-inputs").addClass("is-hidden");
    $("#date-results").removeClass("is-hidden");
  }

  // calls Google Places API for restaurants
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

  // calls Google Places API for bars
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

  // calls TicketMaster API for events
  function getEvents() {
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
        if (response._embedded.events !== undefined) {
          var results = response._embedded.events;
          console.log(results);

          //MOUAD functions
          var eventDetails = $(".event-details");

          for (var i = 0; i < 3; i++) {
            var nameEvent = results[i].name;
            var dateEvent = results[i].dates.start.localDate;

            if (results[i].priceRanges !== undefined) {
              var priceEventMin = results[i].priceRanges[0].min;
              var priceEventMax = results[i].priceRanges[0].max;
              eventDetails[i].querySelector(".event-price").textContent =
                "$" + priceEventMin + "-" + "$" + priceEventMax;
            }

            var linkEvent = results[i].url;

            eventDetails[i].querySelector(
              ".event-name"
            ).textContent = nameEvent;
            eventDetails[i].querySelector(
              ".event-date"
            ).textContent = dateEvent;
            eventDetails[i]
              .querySelector(".event-link")
              .setAttribute("href", linkEvent);
          }
        }
      },
      error: function (xhr, status, err) {},
    });
  }

  // call openweathermap API
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
      console.log(response);

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

      if (tempK === undefined) {
        var unavailable = $("<p>").addClass("unavailable");
        unavailable.text("Weather data not available");
        $("#temp").append(unavailable);
      } else {
        var tempF = (tempK - 273.15) * 1.8 + 32;

        $("#temp").html(tempF.toFixed(1) + " &deg;" + "F");

        $("#weather-icon").html("");
        renderIcons();
        weatherIcon = $("<img>").attr("src", imgURL);
        weatherIcon.attr("alt", "weather icon");

        $("#weather-icon").append(weatherIcon);
      }
    });
  }

  // formats user input date to day of week - month - day
  function formatDate() {
    var formattedDate = moment(userDate, "YYYY-MM-DD").format("dddd, MMMM D");

    // if no date entered, just display city name
    if (formattedDate === "Invalid date") {
      $("#date-of").text(userCity);
    } else {
      $("#date-of").text(formattedDate + " in " + userCity);
    }
  }

  // render weather icon
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
});
