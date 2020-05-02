$(document).ready(function () {
  function getEvent() {
    var APIKeyEvents = "Ds8xghq3sGbqB3ntRWxevADM1AJPkuzm";
    var city = "denver";
    var date = "2020-08-08";

    $.ajax({
      type: "GET",
      url:
        "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=" +
        APIKeyEvents +
        "&city=" +
        city,
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
