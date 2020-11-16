
    function showVenuesHTML(venue){
       return `<h2>${venue.name}</h2>
                <h3>Address:</h3>
                <p>${venue.location.address}</p>
                <p>${venue.location.city}</p>
                <p>${venue.location.country}</p>`
    }

    function getVenueInformation(cityName) {

        var clientId ='PU3IY1PZEOOANTPSHKNMS5HFSMEGEQ1IAVJYGYM4YVZP3NGD';
        var clientSecret ='0V21IXU0EETE3SZJGGCP4T4R13NUTBJ0LMI5WQY45IMDPEKY';
        var cityName = cityName;
         
            $.when(
            
                $.getJSON(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20191112&near=${cityName}&limit=3`)
            
                ).then( function(data){
                    var venues = data.response.venues;
                    console.log(venues);
                   /*Get data for each venue index and display it on the venues divs*/ 
                    var venue1 = venues[0];
                    console.log(venue1);
                    var venue2 = venues[1];
                    var venue3 = venues[2];
                     $("#venue1").html(showVenuesHTML(venue1));
                     $("#venue2").html(showVenuesHTML(venue2));
                     $("#venue3").html(showVenuesHTML(venue3));

                      }, function(errorResp) {
            if (errorResp.status === 404) {
                $("#destiantionCity").html(
                    `<h2>No info found for user ${cityName}</h2>`);
            
            }else {
                
                $("#destiantionCity").html(
                    `<h2>Error: ${errorResp.responseJSON.message}</h2>`);
            }
                      
      })
}

/* event handler */
    $(document).ready(function(){
    // Get value on button click and show alert
    $("#test").click(function() {
        /* $("#destiantionCity").html("");
         $("#venue1").html(showVenuesHTML(""));
         $("#venue2").html(showVenuesHTML(""));
         $("#venue3").html(showVenuesHTML(""));*/

        /*Getting the "#city" value and checking if the value exists*/
        var cityName = $("#city").val();
      /*  if(!cityName) {
                $("#destiantionCity").html(`<h2>Please input city</h2>`);
                return;
        } /*else {

         $("#destiantionCity").html(`<h2>${cityName}</h2>`);

             alert(cityName);
             getVenueInformation(cityName);
               
            
                     }*/
            $("#destiantionCity").html(`<h2>${cityName}</h2>`);

             alert(cityName);
             getVenueInformation(cityName);
                })
        })