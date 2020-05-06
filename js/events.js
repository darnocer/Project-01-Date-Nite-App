// var gKey = config.google;
// var wKey = config.weather;
// var tKey = config.ticketMaster;

$("document").ready(function () {
  function getEvent() {
    var APIKeyEvents = "Ds8xghq3sGbqB3ntRWxevADM1AJPkuzm";
    var city = "Chicago";
    var date = "2021-09-16";

    $.ajax({
      type: "GET",
      url:
        "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=" +
        APIKeyEvents +
        "&city=" +
        city,

      async: true,
      dataType: "json",
      success: function (response) {
        console.log(response);

        //event name
        console.log(response._embedded.events[0].name);

        //event date
        console.log(response._embedded.events[0].dates.start.localDate);

        //price range
        console.log(
          "$" +
            response._embedded.events[0].priceRanges[0].min +
            " - " +
            "$" +
            response._embedded.events[0].priceRanges[0].max
        );

        //MOUAD functions

        var dateEvent = $("<p>").text(
          " Event Name " + response._embedded.events[0].name
        );
        var priceEvent = $("<p>").text(
          " Price Range " +
            response._embedded.events[0].priceRanges[0].min +
            " - " +
            "$" +
            response._embedded.events[0].priceRanges[0].max
        );
        var linkEvent = $("<p>").text(
          " Purchase here " + response._embedded.events[0].url
        );
        $("#events").append(dateEvent);

        $("#events").append(priceEvent);

        $("#events").append(linkEvent);

        //URL Image
        console.log(response._embedded.events[0], images[2].url);

        // var photoEvent = $("<p>").text(
        //   response._embedded.events[0],
        //   images[2].url
        // );

        // ================================================

        // link to tickets
        console.log(response._embedded.events[0].url);
      },
      error: function (xhr, status, err) {},
    });
  }
  getEvent();
});
