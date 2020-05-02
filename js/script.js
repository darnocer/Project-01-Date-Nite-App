$(document).ready(function () {
    $("#submit-button").on("click", function () {
        event.preventDefault();
        console.log("button was clicked");
        $("#user-inputs").addClass("is-hidden");
        $("#date-results").removeClass("is-hidden");
        var cityInput = $("#city-input").val();
        var userDate = $("#date-input").val();
        getWeather();
        getRestaurants();
        console.log(cityInput);
    });
});

function getRestaurants() {
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
};

$("#go-back").click(function (event) {


    $("#user-inputs").removeClass("is-hidden");
    $("#date-results").addClass("is-hidden");
});