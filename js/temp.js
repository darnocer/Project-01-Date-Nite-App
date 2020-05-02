$(document).ready(function () {
  var userCity;
  var userDate;

  var APIKeyWeather = "c3dc07b6ca30d039abcea5db3779f996";

  $("#submit-button").click(function (event) {
    event.preventDefault();
    $("#user-inputs").addClass("is-hidden");
    $("#date-results").removeClass("is-hidden");

    userDate = $("#date-input").val();
    userCity = $("#city-input").val();

    // if date is within 16 days
    getWeather();
    formatDate();
  });

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
    });
  }

  function formatDate() {}

  $("#go-back").click(function (event) {
    console.log("CLICKED");

    $("#user-inputs").removeClass("is-hidden");
    $("#date-results").addClass("is-hidden");
  });
});
