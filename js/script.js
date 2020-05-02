$(document).ready(function () {
    $("#search").on("click", function () {
        event.preventDefault();
        console.log("button was clicked");
        var cityInput = $("#search-input").val();

        console.log(cityInput);
    });
});
$("#search").on("click", function () {
    event.preventDefault();


    let corsURL = "https://cors-anywhere.herokuapp.com/";
    let cityInput = $("#search-input").val();
    var queryURL =
        corsURL +
        "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
        cityInput +
        "+restaurants&key=AIzaSyCrIg9cdwW2tu8Vgqh2YgT_myz7NMmom5o";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        console.log(response);
    });
});