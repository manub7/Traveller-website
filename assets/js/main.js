 /*Venue API keys*/
var clientId ='XHDCHJITLFTCRQZUQ21NIUT3UX1INFWQCGICF25USP0IHXZO';
var clientSecret ='4RPQ1PCFHSDS2YHADEMHE3VAYPTFQSHXL1IOP5IHTVODPKIC';
 /* Weather API key*/
 var apiKey = "bd582b7a8caf8259d410f2f2bd53bf07"

/* Display venue information in HTML divs*/
   function showVenuesHTML(venues,venueName) {

           
            $("#venueTitle").html(`<div class="d-flex justify-content-center" id="titleDiv">
                                 <h2 id="title" >Top Recomended Venues for ${venueName}</h2></div>`)
         
              
           
               for (var j=0; j<5; j++) {
                    var item = venues[j];
                    var prefix =item.categories[0].icon.prefix;
                    var suffix =item.categories[0].icon.suffix;;
                    var size = "bg_120";
                    var  iconLink = (`${prefix}${size}${suffix}`); 

                    $("#venues").append( `
                                      <div class="container col-lg-12 align-center margin" id="venue">
                                      <h3>${item.name}</h3>
                                      <div id= "venuePhoto"><img src = "${iconLink}"</div>
                                      <h4>Address:</h4>
                                      <p>${item.location.address}</p>
                                      <h4>${item.location.postalCode}</h4>
                                      <h4>${item.location.city}</h4>
                                      <h4>${item.location.country}</h4>
                                      </div>`
                                       );
                    
                   
                    $("#venuePhoto").append(`<img src= ""/>`)
                }
              
        }
    

    
/* Displays weather elements inside HTML Div's*/
    function showWeatherHTML(venueSet1,venueSet2) {

            var apiName = venueSet2.city.name;
            $("#weatherTitle").html(`<h2>${apiName} Weather 5 Days Forecast </h2>`)
            var venueList = venueSet1.daily;
            /*While loop to iterate through API data items with a certain limit */
             var i = 0;
             do { 
                              
                    var date = venueList[i];
                    i++;
                    var temp = date.temp.day.toFixed(0);
                    var cond = date.weather[0].main;
                    var d = date.dt*1000;
                    var day = new Date(d);
                    var dayString = day.toLocaleDateString('en-GB', { weekday: "long"});
                   
                    $("#weatherData").append(` <div class= "col-md margin">
                                          <img src="https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png"/>
                                          <h3>${temp}°C</h3>
                                          <h3>${cond}</h3>
                                          <h3>${dayString}</h3>
                                          </div>`)
            
                } while(i<5)
    
        }

/* Get venue infomation function*/
    function getVenueInformation(city) {

        var cityName=city;
                 
            $.when(
            
                $.getJSON(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20191112&near=${cityName}&limit=5`)
            
                ).then (function(data){
                      /* Access specific data from the object*/
                     var venues = data.response.venues;
                     var venueName = data.response.geocode.feature.name
                     $("footer").css("position","relative")
                    /* Call showVenuesHTML to display data in the div*/
                     showVenuesHTML(venues,venueName); 
                        } , function(errorResp) {
                            if(errorResp.status === 400) { $("#messageBox").append(`<p>Venue Error: No venue information found for "${cityName}", please try again </p>`);
                                                            $("#venueTitle").empty()
                                                            $("footer").css("position","absolute")
                            }else { $("#messageBox").append(`<p>Venue Error: ${errorResp.responseJSON.message},please try again</p>`);
                                    $("#venueTitle").empty()
                                    $("footer").css("position","absolute")                            
                                            }
                      
                        }
                    )
                };

/* Get Weather information function */

    function getWeatherInfomration(city) {
        
        var cityName = city;
      
        $.when(
            
                $.getJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=5&appid=${apiKey}` )
                            
                ).then (function(data){

                  /* Access specific data from the object*/
                     var weatherInfo = data;
                     var coord =  data.city.coord
                     var lat = coord.lat;
                     var lon = coord.lon;
                  /*  Fetch venu data from API*/
                    $.when(
            
                             $.getJSON(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}` ).
                             
                             then (function(data){
                                var newWeather = data;
                                
                                showWeatherHTML(newWeather,weatherInfo);
                                $("footer").css("position","relative")

                             }, function(errorResp) {
                                                
                                        if(errorResp.status === 400) {
                                            $("#messageBox").append(`<p>Weather Error: No weather information found for "${cityName}",please try again </p>`);
                                            $("#weatherTitle").empty()  
                                            $("footer").css("position","absolute")
                                               
                                              
                                        }else {
                                            $("#messageBox").append(`<p>Weather Error: ${errorResp.responseJSON.message},please try again</p>`);
                                            $("#weatherTitle").empty()
                                            $("footer").css("position","absolute")  
                                        }
                                })
                        )
    
                }, function(errorResp) {
                    if(errorResp.status === 400) {
                
                        $("#messageBox").append(`<p>Weather Error:No weather information found for "${cityName}", please try again </p>`);
                        $("#weatherTitle").empty()  
                        $("footer").css("position","absolute")
                    }else {
                        $("#messageBox").append(`<p>Weather Error: ${errorResp.responseJSON.message}, please try again</p>`);
                        $("#weatherTitle").empty()  
                        $("footer").css("position","absolute")
                    }
                      
            })
         }


   /* event handler*/
   $(document).ready(function() {
        
      $("#buttonS").on("click", function(e) {
       /* Preveniting the function to enter in a bublle loop phase  */
         e.preventDefault()
        
         /* Clear divs*/
         $("#weatherData").empty();
         $("#venues").empty();
          $("#messageBox").empty();
          

         /* Getting the input value to assign it to function*/
         var cityName = $("#city").val();
            if (cityName==="") {
                 $("#messageBox").html(`<p>No input, please type in the destination..</p>`);
                 $("#weatherSection").empty();
                 $("#venueSection").empty();
                 $("#apiName").empty();
                 
                   
            }else {
                 /*Calling the fetch API infomation with the argument value of cityName */
                    $("#apiDiv").css("visibility","visible");
                    $("#weatherSection").empty();
                    getVenueInformation(cityName);
                    getWeatherInfomration(cityName);
                     setTimeout($("footer").css("visibility","visible"),1000);
                }
                
          }) 
    })