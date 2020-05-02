var gKey = config.google;
var wKey = config.weather;
var tKey = config.ticketMaster;

$(document).ready(function () {
  function getEvent() {
    // var APIKeyEvents = "Ds8xghq3sGbqB3ntRWxevADM1AJPkuzm";
    var city = "denver";
    var date = "2021-09-18";

    $.ajax({
      type: "GET",
      url:
        "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=" +
        tKey +
        "&city=" +
        city,
      //"?localStartDateTime=" +
      //date,
      async: true,
      dataType: "json",
      success: function (json) {
        console.log(json);
      },
      error: function (xhr, status, err) {},
    });
  }
  getEvent();
});
