'use strict';

//Initialize Variables for maps
var map;
var marker;
var markers = [];

// Handling the location array
var locations = [];
var viewModel;


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

  // chicagoListModel();
  // Create the infowindow

;
}
// Loading Locations Data Dynamically
function chicagoListModel(favoritePlaces){
  $.getJSON("../locations.json", function(data) {
    var locationJSON = data.locations;
    // createMarker(locationJSON);
    for(var i = 0; i < locationJSON.length; i++){
      favoritePlaces.push(locationJSON[i]);
    };
  });
}



// function createMarker(locations){
//   //Create Map Marker array
//   for(var i = 0; i < locations.length; i++){
//     var position = locations[i].position;
//     var title = locations[i].name;
//
//     // Loops and creates markers for each object in the array
//     marker = new google.maps.Marker ({
//       position: position,
//       map: map,
//       title: title,
//       animation: google.maps.Animation.DROP,
//       id: i
//     });
//     // Push the markers
//     markers.push(marker);
//   }
// }

//Model
var LocationModel = function(location) {
  var self = this;

  self.title = ko.observable(location.name);
  self.position = ko.observable(location.position);
  self.address = ko.observable(location.address);
  self.city = ko.observable(location.city);
  self.state = ko.observable(location.state);
  self.zipcode = ko.observable(location.zip);

  // Create single marker
  self.marker = new google.maps.Marker ({
    position: self.position,
    map: map,
    title: self.title,
    animation: google.maps.Animation.DROP,
  });
};

// ViewModel
var ViewModel = function(LocationModel) {
  var self = this;
  self.favoritePlaces = ko.observableArray();

  chicagoListModel(self.favoritePlaces);

};

// Instiate the viewModel
var viewModel = new ViewModel();
ko.applyBindings(viewModel);
// // Wikipedia API
// var wikiUrl = 'https://en.wikipedia.org/w/api.php?'
// $.ajax({})
