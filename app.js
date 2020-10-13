$(document).ready(function() {
    const apiKey = "80fe851452521571df17e0e7c488da43";

    $("#citysearch").on("click", function () {
        let cityName = $("#city").val().trim();
        console.log(cityName);
        currentWeather(cityName);
    });
  
    function currentWeather(city) {
       console.log("currentWeather")
        let apiCitySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
        console.log(apiCitySearch);
        $.ajax({
            url: apiCitySearch,
            method: "GET"
        }).then(function (response) {
            console.log("query string");
            console.log(response);
            uvIndex(response.coord.lat, response.coord.lon);
            fiveDay(city);
            let title = $("<h1>").text(response.name);
            $("#currentweather").append(title);
        });
    }
    function uvIndex (lat, lon){
        let queryUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
        $.ajax({
            url: queryUV,
            method: "GET"
        }).then(function (response){
            console.log (response);
        });
    }
    function fiveDay (city) {
        let forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
        $.ajax({
            url: forecast,
            method: "GET"
        }).then(function (response){
            console.log (response);
            const dailyData = response.list.filter(day => {   
                return day.dt_txt.includes("15:00:00")
                }
              );
              console.log(dailyData)
        });
    }


});