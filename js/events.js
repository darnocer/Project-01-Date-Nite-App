function getEvent() {
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=Ds8xghq3sGbqB3ntRWxevADM1AJPkuzm",
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
    },
    error: function (xhr, status, err) {},
  });
}
getEvent();
