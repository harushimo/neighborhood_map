'use strict';

//Handles Locations Markers on the map
var markers = [];
var map;

// Handling the location array
var locations = [];


// Initialize the Google Map
function initMap() {
  // Initialize Google maps
  var chicago = {lat: 41.8781136, lng: -87.6297982}
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: chicago
  });

  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  chicagoListModel();
  // createMarker(locations);
  // Create the infowindow


  // // Test Marker for Chicago Center Point
  // markers = new google.maps.Marker ({
  //   position: chicago,
  //   map: map
  // });
}
// Loading Locations Data Dynamically
function chicagoListModel(){
  $.getJSON("../locations.json", function(data) {
    var locationJSON = data.locations;
    createMarker(locationJSON);
    for(var i = 0; i < locationJSON.length; i++){
      viewModel.favoritePlaces.push(locationJSON[i]);
    };
  });
}


function createMarker(locations){
  // console.log("Inside createMarker function");
  //Create Map Marker array
  for(var i = 0; i < locations.length; i++){
    var position = locations[i].position;
    var title = locations[i].name;

    // Loops and creates markers for each object in the array
    var marker = new google.maps.Marker ({
      position: position,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the markers
    markers.push(marker);
  }
}

var viewModel = function() {
};
viewModel.favoritePlaces = ko.observableArray();
ko.applyBindings(viewModel);
// // Wikipedia API
// var wikiUrl = 'https://en.wikipedia.org/w/api.php?'
// $.ajax({})
