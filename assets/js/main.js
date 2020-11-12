    
    
   /* function showVenues(venues){

        var venues = venues;
        console.log(venues);
       /* $("venue1").html(showVenuesHTML(venue1));
      
        /*  var venuesArray = [$('venue1'),$('venue2'),$('venue3')];
        
        venuesArray.forEach((venue,index) => {
            venues.forEach((element, index) => {
            var venue = element[index];
            showVenuesHTML(venue);
        });

        /*venues.forEach((element, index) => {
            var venue = element[index];
            
        })}*/
    
    /*function showVenuesHTML(venue){
       return `<h2>${venue.name}</h2>
                <img class="venueimage" src="${iconSource}"/>
                <h3>Address:</h3>
                <p>${venue.location.address}</p>
                <p>${venue.location.city}</p>
                <p>${venue.location.country}</p>`;
    }*/

    function getVenueInformation(cityName) {

        var clientId = 'PU3IY1PZEOOANTPSHKNMS5HFSMEGEQ1IAVJYGYM4YVZP3NGD';
        var clientSecret = '0V21IXU0EETE3SZJGGCP4T4R13NUTBJ0LMI5WQY45IMDPEKY';
        var cityName = cityName;
         
            $.when(
            
                $.getJSON(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20201112&near=${cityName}&limit=3`)
            
                ).then(function(data){
                    var venues = data;
                    console.log(venues);
                    
                })

    }


    $(document).ready(function(){
    // Get value on button click and show alert
    $("#test").click(function() {
        var cityName = $("#city").val();
        alert(cityName);
        console.log(cityName); 
        getVenueInformation(cityName);
        /*showVenues(items);*/
    })
})