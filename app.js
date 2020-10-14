$(document).ready(function () {
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
            // let col = $("<div>").attr("class", "col")
            let card = $("<div>").attr("class", "card")
            let cardBody = $("<div>").attr("class", "card-body")
            // add the extra things like wind speed, uv, etc duplicate line 29

            let title = $("<h1>").text(response.name);
            let currentCityWeather = $("<p>").text("Temperature: " + response.main.temp);
            cardBody.append(title, currentCityWeather); //append each element
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

    function fiveDay(city) {
        let forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
        $.ajax({
            url: forecast,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            const dailyData = response.list.filter(day => {
                return day.dt_txt.includes("15:00:00")
            });
            console.log(dailyData)
            //use current weather as an example
        //   do a for loop 
        });
    }


});