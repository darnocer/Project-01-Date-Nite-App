$("document").ready(function () {
  function getEvent() {
    var APIKeyEvents = "Ds8xghq3sGbqB3ntRWxevADM1AJPkuzm";
    var city = "Denver";
    //var date = "2020-09-16"; No date because of COVID19

    // $("#submit-button").on("click", function () {
    //   event.preventDefault();
    //   console.log("button was clicked");
    //   $("#user-inputs").addClass("is-hidden");
    //   $("#date-results").removeClass("is-hidden");
    //   cityInput = $("#city-input").val();
    //   userDate = $("#date-input").val();
    //   getRestaurants();
    //   console.log(cityInput);
    //   console.log("user date: " + userDate);
    // });

    $.ajax({
      type: "GET",
      url:
        "https://app.ticketmaster.com/discovery/v2/events?apikey=" +
        APIKeyEvents +
        "&city=" +
        city,

      // "https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=" +
      // APIKeyEvents +
      // "&city=" +
      // city,

      async: true,
      dataType: "json",
      success: function (response) {
        //console.log(response);

        var results = response._embedded;
        console.log(results);

        //event name
        console.log(response._embedded.events[2].name);

        //event date
        console.log(response._embedded.events[2].dates.start.localDate);

        //price range
        console.log(
          "$" +
            response._embedded.events[2].priceRanges[0].min +
            " - " +
            "$" +
            response._embedded.events[2].priceRanges[0].max
        );

        //MOUAD functions

        for (i = 0; i < 3; i++) {
          var nameEvent = $("<p>").text(
            " Event Name " + response._embedded.events[i].name
          );
          var dateEvent = $("<p>").text(
            " Event Date " + response._embedded.events[i].dates.start.localDate
          );

          var priceEvent = $("<p>").text(
            " Price Range " +
              "$" +
              response._embedded.events[i].priceRanges[0].min +
              " - " +
              "$" +
              response._embedded.events[i].priceRanges[0].max
          );
          var linkEvent = $("<p>").text(
            " Purchase here " + response._embedded.events[i].url
          );

          $("#events").append(nameEvent);

          $("#events").append(dateEvent);

          $("#events").append(priceEvent);

          $("#events").append(linkEvent);
        }
        //URL Image
        // console.log(response._embedded.events[0].images[2].url);

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
