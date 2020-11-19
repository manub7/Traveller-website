
   function showVenuesHTML(venue,venueName) {
            $("#venueTitle").html(`<div class="d-flex justify-content-center" id="titleDiv">
                                 <h2 id="title" >Top recomended venues for ${venueName}</h2></div>`)
            console.log(venue)

            venue.forEach((item) => {
                 console.log(item)
                 $("#venues").append(`
                                      <div class="container col-md-2 align-center margin" id="venue">
                                      <h2>${item.name}</h2>
                                      <h3>Address:</h3>
                                      <p>${item.location.address}</p>
                                      <p>${item.location.city}</p>
                                      <p>${item.location.country}</p>
                                      </div>`)
                                 })
                              };

    function showWeatherHTML(venueSet1,venueSet2) {

            var apiName = venueSet2.city.name;
            console.log(apiName)
            $("#apiName").html(`<h2>${apiName} Weather Forcast </h2>`)
            var venueList = venueSet1.daily;
            console.log(venueList)
            /*var day = d.getDate()+ "/" + (d.getMonth()+1) + "/"+d.getFullYear();*/
            /*While loop to iterate through API data items with a certain limit */
             var i = 0;
             do { 
                              
                    var date = venueList[i];
                    i++;
                    var temp = date.temp.day.toFixed(0);
                    var cond = date.weather[0].main;
                    var d = date.dt*1000;
                    console.log(d);
                    day = new Date(d);
                    var dayString = day.toLocaleDateString('en-GB', { weekday: "short"});
                    console.log(dayString)
                    console.log(temp)
                    console.log(cond)
                    $("#weatherData").append(` <div class= "container col-md-2 align-center margin">
                                          <img src="https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png"/>
                                          <h2>${temp}°C</h2>
                                          <h2>${cond}</h2>
                                          <h2>${dayString}</h2>
                                          </div>`)
            
                } while(i<5)
    
        }

/* Get venue infomation function*/
    function getVenueInformation(city) {

        /* Declaring  the variables necessary to access the API*/
        var clientId ='PU3IY1PZEOOANTPSHKNMS5HFSMEGEQ1IAVJYGYM4YVZP3NGD';
        var clientSecret ='0V21IXU0EETE3SZJGGCP4T4R13NUTBJ0LMI5WQY45IMDPEKY';
        var cityName=city;
                 
            $.when(
            
                $.getJSON(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20191112&near=${cityName}&limit=5`)
            
                ).then (function(data){
                   
                     console.log(data);
                     /* Access specific data from the object*/
                     var venues = data.response.venues;
                     var venueName = data.response.geocode.feature.name
                    
                                      
                    /* Call showVenuesHTML to display data in the div*/
                     showVenuesHTML(venues,venueName);
                     
                      } , function(errorResp) {
            if (cityName === "") {
                $("#messageBox").html(
                    `<p>Please input destination</p>`);
            
            }else if(errorResp.status === 400) {
                
                $("#messageBox").html(
                    `<p>No information found for "${cityName}", try again </p>`);
                   
            }
            else {
                
                $("#messageBox").html(
                    `<p>Error: ${errorResp.responseJSON.message}</p>`);
            }
                      
      }
    )
};

/* Get Weather information function */

    function getWeatherInfomration(city) {
        /* Declaring  the variables necessary to access the API*/
        var apiKey = "bd582b7a8caf8259d410f2f2bd53bf07"
        var cityName = city;
      
        $.when(
            
                $.getJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=5&appid=${apiKey}` )
                            
                ).then (function(data){

                  /* Access specific data from the object*/
                     var weatherInfo = data;
                     var coord =  data.city.coord
                     var lat = coord.lat;
                     var lon = coord.lon;
                     console.log(coord, lat, lon)
                     
                     

                    $.when(
            
                             $.getJSON(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}` ).
                             
                             then (function(data){
                                var newWeather = data;
                                var dailyData = newWeather.daily;
                                console.log(newWeather)
                                showWeatherHTML(newWeather,weatherInfo);

                             }, function(errorResp) {
                                        if (cityName === "") {
                                             $("#messageBox").html(`<p>Please input destination</p>`);
            
                                        }else if(errorResp.status === 400) {
                                            $("#messageBox").html(`<p>No information found for "${cityName}", try again </p>`);
                   
                                        }else {
                                            $("#messageBox").html(`<p>Error: ${errorResp.responseJSON.message}</p>`);
                                        }
                                })
                        )
    
                }, function(errorResp) {
                    if (cityName === "") {
                        $("#messageBox").html(`<p>Please input destination</p>`);
            
                    }else if(errorResp.status === 400) {
                
                        $("#messageBox").html(`<p>No information found for "${cityName}", try again </p>`);
                   
                    }else {
                        $("#messageBox").html(`<p>Error: ${errorResp.responseJSON.message}</p>`);
                    }
                      
            })
         }


   /* event handler*/
   $(document).ready(function() {

      $("#buttonS").on("click", function(e) {
       
        /* Get the text box value */
         e.preventDefault()
         /* Clear divs*/
         $("#weatherData").empty();
         $("#venues").empty();
         $("#venue1").html("");
         $("#venue2").html("");
         $("#venue3").html("");
        /* Getting the input value to assign it to function*/
         var cityName = $("#city").val();
         alert(cityName);
            if (cityName==="") {
                 $("#messageBox").html(`<p>No input, please input destination</p>`);
                 $("#apiDiv").css("visibility","hiden");
                   
            }else {
                 /*Calling the fetch API infomation with the argument value of cityName */
                    $("#apiDiv").css("visibility","visible");
                    getVenueInformation(cityName);
                    getWeatherInfomration(cityName);
                }
          })
    })