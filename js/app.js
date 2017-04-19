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

  // Instiate the viewModel
  viewModel = new ViewModel();
  ko.applyBindings(viewModel);


}
// Loading Locations Data Dynamically
function chicagoListModel(favoritePlaces){
  $.getJSON("../locations.json", function(data) {
    var locationJSON = data.locations;
    console.log(locationJSON)
    // createMarker(locationJSON);
    for(var i = 0; i < locationJSON.length; i++){
      viewModel.favoritePlaces.push(new LocationModel(locationJSON[i]));
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

//Model - LocationModel constructor funtion
var LocationModel = function(location) {
  var self = this;

  self.title = location.name;
  self.position = location.position;
  self.address = location.address;
  self.city = location.city;
  self.state = location.state;
  self.zipcode = location.zip;

  // Create single marker
  self.marker = new google.maps.Marker ({
    position: self.position,
    map: map,
    title: self.title,
    animation: google.maps.Animation.DROP,
  });

  self.marker.setMap(map)
};

// ViewModel
var ViewModel = function(LocationModel) {
  var self = this;
  self.favoritePlaces = ko.observableArray();

  chicagoListModel(self.favoritePlaces);

};


// // Wikipedia API
// var wikiUrl = 'https://en.wikipedia.org/w/api.php?'
// $.ajax({})
