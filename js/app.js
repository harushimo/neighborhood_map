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
  // Create the infowindow


;
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

//Model
var locationModel = function() {
  var self = this;

  self.title = ko.observable(location.name);
  self.position = ko.observable(location.position);
  self.address = ko.observable(location.address);
  self.city = ko.observable(location.city);
  self.state = ko.observable(location.state);
  self.zipcode = ko.observable(location.zip);
}

// ViewModel
var viewModel = function() {
  var self = this;

  locations.forEach(function(){
    self.favoritePlaces.push()
  })
};

viewModel.favoritePlaces = ko.observableArray();
ko.applyBindings(new viewModel());
// // Wikipedia API
// var wikiUrl = 'https://en.wikipedia.org/w/api.php?'
// $.ajax({})
