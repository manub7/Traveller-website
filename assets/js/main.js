
   function showVenuesHTML(venue,venueName) {
            $("#venueTitle").html(`<div class="d-flex justify-content-center" id="titleDiv">
                                 <h2 id="title" >Top Recomended Venues for ${venueName}</h2></div>`)
            

            venue.forEach((item) => {
                 console.log(item)
                 $("#venues").append(`
                                      <div class="container col-lg-12 align-center margin" id="venue">
                                      <h3>${item.name}</h3>
                                      <h4>Address:</h4>
                                      <p>${item.location.address}</p>
                                      <h4>${item.location.city}</h4>
                                      <h4>${item.location.country}</h4>
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
                    var dayString = day.toLocaleDateString('en-GB', { weekday: "long"});
                    console.log(dayString)
                    console.log(temp)
                    console.log(cond)
                    $("#weatherData").append(` <div class= "d-flex col-lg-3 align-center margin">
                                          <img src="https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png"/>
                                          <h3>${temp}°C</h3>
                                          <h3>${cond}</h3>
                                          <h3>${dayString}</h3>
                                          </div>`)
            
                } while(i<5)
    
        }

/* Get venue infomation function*/
    function getVenueInformation(city) {

        /* Declaring  the variables necessary to access the API*/
        var clientId ='XHDCHJITLFTCRQZUQ21NIUT3UX1INFWQCGICF25USP0IHXZO';
        var clientSecret ='4RPQ1PCFHSDS2YHADEMHE3VAYPTFQSHXL1IOP5IHTVODPKIC';
        var cityName=city;
                 
            $.when(
            
                $.getJSON(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20191112&near=${cityName}&limit=5`)
            
                ).then (function(data){
                   
                     console.log(data);
                     /* Access specific data from the object*/
                     var venues = data.response.venues;
                     var venueName = data.response.geocode.feature.name
                     var venuesId = [""];
                     var photoId = 1; 
                     venues.forEach((e) => {
                            venuesId.push(e.id);
                            
                     })                  
                     venueId = venues[1].id;
                                      
                    /* Call showVenuesHTML to display data in the div*/
                     showVenuesHTML(venues,venueName);

                     /* venuesId.forEach((id) => {

                                var photoId=id;*/
                                               
                                $.when(
                                   
                                    $.getJSON(`https://api.foursquare.com/v2/venues//photos?venue_id=${venueId}&client_id=${clientId}&client_secret=${clientSecret}&v=20190425&group=venue&limit=10`)
                                           
                                ).then (function(data){
                                    console.log(data);
                                    console.log(photoId)

                               /* var prefix = data.prefix;
                               /* var suffix = data.suffix;
                               /* var size = cap36;*/

                             })
                       /* })*/
                                      
                    /* Call showVenuesHTML to display data in the div*/
                   /*  showVenuesHTML(venues,venueName); */

                      } , function(errorResp) {
                            if(errorResp.status === 400) { $("#messageBox").append(`<p>Venue Error: No venue information found for "${cityName}", please try again </p>`);
                                                           $("#weatherSection").empty();
                                                           $("#venueSection").empty();
                                                           $("#apiName").empty();
                   
                            }else { $("#messageBox").append(`<p>Venue Error: ${errorResp.responseJSON.message},please try again</p>`);
                                    $("#weatherSection").empty();
                                    $("#venueSection").empty();
                                    $("#apiName").empty();    
                                                                
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
                     
                     
                    /*  Fetch venu data from API*/
                    $.when(
            
                             $.getJSON(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}` ).
                             
                             then (function(data){
                                var newWeather = data;
                                var dailyData = newWeather.daily;
                                console.log(newWeather)
                                showWeatherHTML(newWeather,weatherInfo);

                             }, function(errorResp) {
                                                
                                        if(errorResp.status === 400) {
                                            $("#messageBox").append(`<p>Weather Error: No weather information found for "${cityName}",please try again </p>`);
                   
                                        }else {
                                            $("#messageBox").append(`<p>Weather Error: ${errorResp.responseJSON.message},please try again</p>`);
                                        }
                                })
                        )
    
                }, function(errorResp) {
                    if(errorResp.status === 400) {
                
                        $("#messageBox").append(`<p>Weather Error:No weather information found for "${cityName}", please try again </p>`);
                   
                    }else {
                        $("#messageBox").append(`<p>Weather Error: ${errorResp.responseJSON.message}, please try again</p>`);
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
          $("#messageBox").empty();
         /* Getting the input value to assign it to function*/
         var cityName = $("#city").val();
         alert(cityName);
            if (cityName==="") {
                 $("#messageBox").html(`<p>No input, please type in the destination..</p>`);
                 $("#weatherSection").empty();
                 $("#venueSection").empty();
                 $("#apiName").empty();
                 
                   
            }else {
                 /*Calling the fetch API infomation with the argument value of cityName */
                    $("#apiDiv").css("visibility","visible");
                    getVenueInformation(cityName);
                    getWeatherInfomration(cityName);
                }
          })
    })