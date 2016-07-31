$("#main").hide();

$(document).ready(function() {
  //instantiate variables
  $location = $("#location");
  $weather = $("#weather");
  $type = $("#type");
  $temp = $("#temp");
  $degree = $("#degree");
  $unit = $("#unit");
  $todaysIcon = $("#todaysIcon");

  //ajax call function
  function ajax(URL, callback) {
    return $.ajax({
      url: URL,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  }

  //call location API, run callback
  ajax("http://ip-api.com/json", locationCallback);

  //callback function for location API, including weather API call
  function locationCallback(locObj) {
    $location.html(locObj.city);
    var coords = [locObj.lat, locObj.lon];
    // call weather API using location data
    ajax("http://api.openweathermap.org/data/2.5/weather?lat=" + coords[0] +
      "&lon=" + coords[1] +
      "&APPID=184529f2144f13de78724759ad14142d", todaysWeatherCallback);
    ajax("http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + coords[0] +
      "&lon=" + coords[1] +
      "&cnt=5&APPID=184529f2144f13de78724759ad14142d", fiveDayCallback);

  }

  //callback function for weather API
  function todaysWeatherCallback(weatherObj) {
    var tempC = Math.round(weatherObj.main.temp - 273.15);
    tempF = Math.round((tempC * (9 / 5)) + 32);
    $type.html(titleCase(weatherObj.weather[0].description) + " |");

    $degree.html(tempF);
    $unit.html("&deg;F");
    $todaysIcon.addClass(getIcon(weatherObj.weather[0].icon));
    setTheme(weatherObj.weather[0].icon);

  }

  function fiveDayCallback(weatherObj) {
    console.log(weatherObj);
    $.each(weatherObj.list, function(i, obj) {
      var high = Math.round((obj.temp.max - 273.15) * (9 / 5) + 32);
      var low = Math.round((obj.temp.min - 273.15) * (9 / 5) + 32);
      var icon = getIcon(obj.weather[0].icon);
      var day = "#day" + (i + 1);
      var weather = obj.weather[0].main;
      $(day).html("<p>" + getDay(i + 1) + "</p>");
      $(day).append("<i class=\"wi " + icon + "\"></i>");
      $(day).append("<p class=\"small-weather\">" + weather + "</p>");
      $(day).append("<p class=\"high-low\">" + high + "&deg;F | " + low + "&deg;F</p>");
      $("#main").fadeIn();
    });
  }

  //get weather icon function
  function getIcon(icon) {
    switch (icon) {
      case "01d":
        return "wi-day-sunny";
      case "01n":
        return "wi-night-clear";
      case "02d":
        return "wi-day-sunny-overcast";
      case "02n":
        return "wi-night-alt-partly-cloudy";
      case "03d":
        return "wi-day-cloudy";
      case "03n":
        return "wi-night-cloudy";
      case "04d":
        return "wi-cloudy";
      case "04n":
        return "wi-cloudy";
      case "09d":
        return "wi-day-showers";
      case "09n":
        return "wi-night-showers";
      case "10d":
        return "wi-day-rain";
      case "10n":
        return "wi-night-rain";
      case "11d":
        return "wi-day-thunderstorm";
      case "11n":
        return "wi-night-thunderstorm";
      case "13d":
        return "wi-day-snow";
      case "13n":
        return "wi-night-snow";
      case "50d":
        return "wi-day-fog";
      case "50n":
        return "wi-night-fog";
    }
  }

  // set background color and font color
  function setTheme(weatherIcon) {
    switch (weatherIcon) {
      case "01d":
        $("#main").css("color", "white");
        $("#main").css("background", "skyblue");
        $("#todaysIcon").css("color", "#FF9");
        $("#todaysIcon").css("margin-bottom", "15px");
        $("#todaysIcon").addClass("glyphicon-spin");
        break;
      case "01n":
        $("#main").css("color", "white");
        $("#main").css("background", "#546bab");
        $("#todaysIcon").css("color", "#FFFF99");
        $("#todaysIcon").css("margin-bottom", "15px");
        $("#todaysIcon").addClass("glyphicon-rock");
        break;
      case "02d":
        $("#main").css("color", "black");
        $("#main").css("background", "#A4A09B");
        $("#todaysIcon").addClass("glyphicon-slide");
        $("#todaysIcon").css("color", "#414141");
        break;
      case "02n":
        $("#main").css("color", "black");
        $("#main").css("background", "#87889c");
        $("#todaysIcon").css("top", "-5px");
        $("#todaysIcon").addClass("glyphicon-slide");
        $("#todaysIcon").css("color", "#414141");
        break;
      case "03d":
        $("#main").css("color", "black");
        $("#main").css("background", "#A4A09B");
        $("#todaysIcon").addClass("glyphicon-slide");
        $("#todaysIcon").css("color", "#414141");
        break;
      case "03n":
        $("#main").css("color", "black");
        $("#main").css("background", "#87889c");
        $("#todaysIcon").css("top", "2px");
        $("#todaysIcon").addClass("glyphicon-slide");
        $("#todaysIcon").css("color", "#414141");
        break;
      case "04d":
        $("#main").css("color", "black");
        $("#main").css("background", "#A4A09B");
        $("#todaysIcon").addClass("glyphicon-slide");
        $("#todaysIcon").css("color", "#414141");
        $("#todaysIcon").css("top", "2px");
        break;
      case "04n":
        $("#main").css("color", "black");
        $("#main").css("background", "#87889c");
        $("#todaysIcon").css("top", "0px");
        $("#todaysIcon").addClass("glyphicon-slide");
        $("#todaysIcon").css("color", "#414141");
        break;
      case "09d":
        $("#main").css("color", "black");
        $("#main").css("background", "#6d6d6d");
        $("#todaysIcon").css("margin-bottom", "20px").css("margin-top", "5px");
        $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
        break;
      case "09n":
        $("#main").css("color", "black");
        $("#main").css("background", "#87889c");
        $("#todaysIcon").css("top", "-5px");
        $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
        break;
      case "10d":
        $("#main").css("color", "black");
        $("#main").css("background", "#6d6d6d");
        $("#todaysIcon").css("margin-bottom", "20px").css("margin-top", "5px");
        $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
        break;
      case "10n":
        $("#main").css("color", "black");
        $("#main").css("background", "#87889c");
        $("#todaysIcon").css("top", "-5px");
        $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
        break;
      case "11d":
        $("#main").css("color", "black");
        $("#main").css("background", "#6d6d6d");
        $("#todaysIcon").css("margin-bottom", "20px").css("margin-top", "5px");
        $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
        break;
      case "11n":
        $("#main").css("color", "black");
        $("#main").css("background", "#87889c");
        $("#todaysIcon").css("top", "-5px");
        $("#todaysIcon").css("color", "#414141").addClass("glyphicon-slide");
        break;
      case "13d":
        $("#main").css("color", "black");
        $("#main").css("background", "#D1DDDD");
        $("#todaysIcon").css("margin-bottom", "20px").css("margin-top", "5px");
        $("#todaysIcon").addClass("glyphicon-slide");
        break;
      case "13n":
        $("#main").css("color", "white");
        $("#main").css("background", "#031B35");
        $("#todaysIcon").css("margin-bottom", "20px");
        $("#todaysIcon").addClass("glyphicon-slide");
        break;
      case "50d":
        $("#main").css("color", "white");
        $("#main").css("background", "#A9AEB2");
        $("#todaysIcon").css("margin-bottom", "10px").css("margin-top", "10px");
        $("#todaysIcon").addClass("glyphicon-slide");
        break;
      case "50n":
        $("#main").css("color", "#3B4044");
        $("#main").css("background", "#87889c");
        $("#todaysIcon").css("margin-bottom", "10px");
        $("#todaysIcon").addClass("glyphicon-slide");
        break;
    }
  }

  //click handler for temperature conversion
  $temp.on("click", $unit, function() {
    convertMain();
    convertWeekly();
    

  });

  $(".forecast").on("click", ".high-low", function() {
    convertMain();
    convertWeekly();
  })

  // convert temperature function
  function convertTemp(degree, unit) {
    if (unit.includes("F")) {
      var newDegree = Math.round((degree - 32) * (5 / 9));
      unit = "C";
    } else {
      var newDegree = Math.round((degree * (9 / 5)) + 32);
      unit = "F"
    }

    return [newDegree, unit];
  }

  function titleCase(str) {
    words = str.toLowerCase().split(' ');

    for (var i = 0; i < words.length; i++) {
      var letters = words[i].split('');
      letters[0] = letters[0].toUpperCase();
      words[i] = letters.join('');
    }
    return words.join(' ');
  }

  function getDay(number) {
    var d = new Date();
    var today = d.getDay();
    var forecastedDay = today + number;

    if (forecastedDay > 6) {
      forecastedDay -= 7;
    }

    switch (forecastedDay) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  }

  function convertMain() {
    var unit = $unit.html();
    var degree = $degree.html();
    var newTemp = convertTemp(degree, unit);
    $degree.html(newTemp[0]);
    $unit.html("&deg;" + newTemp[1]);
  }

  function convertWeekly() {
    var elements = document.getElementsByClassName("high-low");
    for (var i = 0, len = elements.length; i < len; i++) {
      var temp = elements[i].innerHTML;
      var newHigh = convertTemp(temp.substring(0, 2), temp.substring(3, 4));
      var newLow = convertTemp(temp.substring(7, 9), temp.substring(10, 11));
      var newTemps = newHigh[0] + "&deg;" + newHigh[1] + " | " + newLow[0] + "&deg;" + newLow[1];
      elements[i].innerHTML = newTemps;
    }
  }

});