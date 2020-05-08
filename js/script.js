var APIKeyGoogle = "AIzaSyDLnmaYaDkfgDwgSHFbipNdh5ztO6nFE3E";

$(document).ready(function () {
  var cityInput;
  var userDate;

  $("#submit-button").on("click", function () {
    event.preventDefault();
    console.log("button was clicked");
    $("#user-inputs").addClass("is-hidden");
    $("#date-results").removeClass("is-hidden");
    cityInput = $("#city-input").val();
    userDate = $("#date-input").val();
    getRestaurants();
    getBars();
    console.log(cityInput);
    console.log("user date: " + userDate);
  });

  function getRestaurants() {
    event.preventDefault();

    let corsURL = "https://cors-anywhere.herokuapp.com/";
    var queryURL =
      corsURL +
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      cityInput +
      "+restaurants&key=" +
      APIKeyGoogle;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log("test test");
      // console.log(response.results[0].name);
      // console.log(response.results[0].formatted_address);
      // console.log(response.results[0].rating);
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
      cityInput +
      "+bars&key=" +
      APIKeyGoogle;

    $.ajax({
      url: barsURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log("test test");
      // console.log(response.results[0].name);
      // console.log(response.results[0].formatted_address);
      // console.log(response.results[0].rating);
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

  $("#go-back").click(function () {
    $("#user-inputs").removeClass("is-hidden");
    $("#date-results").addClass("is-hidden");
  });
});