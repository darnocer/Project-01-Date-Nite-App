$(document).ready(function () {
  function getEvent() {
    var APIKeyEvents = "Ds8xghq3sGbqB3ntRWxevADM1AJPkuzm";
    var city = "denver";
    var date = "2021-09-18";

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

        // event name
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

        // link to tickets
        console.log(response._embedded.events[0].url);
      },
      error: function (xhr, status, err) {},
    });
  }
  getEvent();
});
