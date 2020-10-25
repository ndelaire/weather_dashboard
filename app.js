$(document).ready(function () {
    const apiKey = "80fe851452521571df17e0e7c488da43";

    $("#citysearch").on("click", function () {
        let cityName = $("#city").val().trim();
        console.log(cityName);
        currentWeather(cityName);
    });
// current city weather function
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
            let card = $("<div>").attr("class", "card")
            let cardBody = $("<div>").attr("class", "card-body")
            let title = $("<h1>").text(response.name);
            let currentCityWeather = $("<p>").text("Temperature: " + response.main.temp);
            let currentWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);
            let currentHumidity = $("<p>").text("Humidity: " + response.main.humidity);
            cardBody.append(title, currentCityWeather, currentHumidity, currentWindSpeed); 
            card.append(cardBody);
            //col.append(card)
            // $("#fivedayforecast").append(col);
            $("#currentweather").append(card);
            
        });
    }
    
    function uvIndex(lat, lon) {
        let queryUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
        let result;
        $.ajax({
            url: queryUV,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log("I am the value" + response.value);
            let currentUvIndex = $("<button>").text(response.value);
            if (response.value < 3) {
                currentUvIndex.attr("class", "btn green");
            } else if (currentUvIndex > 3 && currentUvIndex < 7) {
                currentUvIndex.attr("class", "btn yellow")
                
            } else {
                currentUvIndex.attr("class", "btn red");
            }
            
            let uvIndexButton = $("<p>").text("UV Index: ").append(currentUvIndex);
            $("#currentweather .card-body").append(uvIndexButton);
            
        });
    }
// Five day forecast function 
    function fiveDay(city) {
        let forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
        let col = $("<div>").attr("class", "col")
        let currentCityWeather = $("<p>").text("Temperature: " + response.main.temp);
        let currentHumidity = $("<p>").text("Humidity: " + response.main.humidity);
        $.ajax({
            url: forecast,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            const dailyData = response.list.filter(day => {
                return day.dt_txt.includes("15:00:00")
            });
            console.log(dailyData)
             col.append(card)
            $("#fivedayforecast").append(col);
            for (let i = 0; i < 5; i++){

            }
             // cardBody.append(title, currentCityWeather, currentHumidity, currentWindSpeed); 
            // card.append(cardBody);
        });
    }


});