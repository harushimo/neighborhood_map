'use strict';

// Handling the location array
var locations = ko.observableArray();

//Handles Locations Markers on the map
var markers = [];

// Loading Locations Data Dynamically
function chicagoListModel(){
  $.getJSON("/some/url", function(data){
    var locationJSON = data.locations;
    for(var i = 0; i < locationJSON.length; i++){
      locations.push(data.i);
    };
  });
}


function initMap() {
  // Initialize Google maps
  var chicago = {lat: 41.8781136, lng: -87.6297982}
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: chicago
  });


  // Create the infowindow
  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // Creating Initial Map markers array
  var chicagoLocations = locations

  //Create Map Marker array
  for(var i = 0; i < chicagoLocations.length; i++){
    var position = chicagoLocations[i].position;
    var title = chicagoLocations[i].name;

    // Loops and creates markers for each object in the array
    markers = new google.maps.Marker ({
      position: position,
      map: map,
      title: title,
      id: i
    });
    // Push the markers
    markers.push(markers);
  }
  // Test Marker for Chicago Center Point
  // markers = new google.maps.Marker ({
  //   position: chicago,
  //   map: map
  // });
}

// // Wikipedia API
// var wikiUrl = 'https://en.wikipedia.org/w/api.php?'
// $.ajax({})
