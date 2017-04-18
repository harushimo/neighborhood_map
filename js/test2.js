'use strict';

//Handles Locations Markers on the map
var markers = [];
var map;

// Handling the location array
var locations = [];
var locationJSON


// // Initialize the Google Map
// function initMap() {
//   // Initialize Google maps
//   var chicago = {lat: 41.8781136, lng: -87.6297982}
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 10,
//     center: chicago
//   });
//
//   var largeInfoWindow = new google.maps.InfoWindow();
//   var bounds = new google.maps.LatLngBounds();
//
//   ko.applyBindings(new viewModel());
//
//
// }

$.getJSON("../locations.json", function(data) {
    locationJSON = data
    console.log(locationJSON);
});
// Loading Locations Data Dynamically
// function chicagoListModel(){
//   $.getJSON("../locations.json", function(data) {
//     var locationJSON = data.locations;
//     console.log(locationJSON);
//     for(var i = 0; i < locationJSON.length; i++){
//       locationJSON.push(locationJSON[i]);
//     };
//   });
// }

// Model
var viewModel = function() {
  var self = this;
  this.favoritePlaces = ko.observableArray([]);
  locations.forEach(function(location){
    self.favoritePlaces.push(new markerModel(location))
  })
};

var markerModel = function(location) {
  // console.log("Inside createMarker function");
  //Create Map Marker array
    var self = this;

    this.position = ko.observable(location.position);
    this.title = ko.observable(location.name);
    this.address = ko.observable(location.address);

    // Loops and creates markers for each object in the array
    this.marker = new google.maps.Marker ({
      position: self.position(),
      map: map,
      title: self.title(),
      animation: google.maps.Animation.DROP
    });
    // Push the markers
  this.marker.setMap(map)
  //Test Marker for Chicago Center Point
  // this.marker = new google.maps.Marker ({
  //   position: chicago,
  //   map: map
  // });
  }


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

  ko.applyBindings(new viewModel());

  // //Test Marker for Chicago Center Point
  // markers = new google.maps.Marker ({
  //   position: chicago,
  //   map: map
  // });
}
// // Wikipedia API
// var wikiUrl = 'https://en.wikipedia.org/w/api.php?'
// $.ajax({})
