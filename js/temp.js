$(document).ready(function () {
  var APIKeyWeather = "c3dc07b6ca30d039abcea5db3779f996";

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
});
