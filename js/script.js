// var gKey = config.google;
// var wKey = config.weather;
// var tKey = config.ticketMaster;

$(document).ready(function () {
  $("#submit-button").on("click", function () {
    event.preventDefault();
    console.log("button was clicked");
    $("#user-inputs").addClass("is-hidden");
    $("#date-results").removeClass("is-hidden");
    var cityInput = $("#city-input").val();
    var userDate = $("#date-input").val();
    getRestaurants();
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
      gKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(response);
    });
  }

  $("#go-back").click(function () {
    $("#user-inputs").removeClass("is-hidden");
    $("#date-results").addClass("is-hidden");
  });
});
