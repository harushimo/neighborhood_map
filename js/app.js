'use strict';

// Handling the location array
var locations = ko.observableArray();

//Handles Locations Markers on the map
var markers = [];

// Loading Locations Data Dynamically
function chicagoListModel(){
  $.getJSON("locations.json", function(locations) {
    var locationJSON = locations.locations;
    console.log(locationJSON);
    for(var i = 0; i < locationJSON.length; i++){
      locations.push(data.i);
    };
  });
}


// Initialize the Google Map
function initMap() {
  // Initialize Google maps
  var chicago = {lat: 41.8781136, lng: -87.6297982}
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: chicago
  });


  // Create the infowindow
  // var largeInfoWindow = new google.maps.InfoWindow();
  // var bounds = new google.maps.LatLngBounds();


  // // Test Marker for Chicago Center Point
  // markers = new google.maps.Marker ({
  //   position: chicago,
  //   map: map
  // });
}

function createMarker(){

  chicagoListModel();

  //Create Map Marker array
  for(var i = 0; i < locations.length; i++){
    var position = locations[i].position;
    var title = locations[i].name;

    // Loops and creates markers for each object in the array
    markers = new google.maps.Marker ({
      position: position,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the markers
    markers.push(markers);
  }
}

// // Wikipedia API
// var wikiUrl = 'https://en.wikipedia.org/w/api.php?'
// $.ajax({})
