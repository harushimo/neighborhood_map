'use strict';

//Initialize Variables for maps
var map;
var marker;
var markers = [];

// Handling the location array
var locations = [];
// Other Variables
var viewModel;
var contentString;
// var largeInfoWindow;


// Initialize the Google Map
function initMap() {
  // Initialize Google maps
  console.log("initMap");
  var chicago = {lat: 41.8781136, lng: -87.6297982}
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: chicago
  });

  // var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  viewModel.google(!!window.google); //true

}
// Loading Locations Data Dynamically
function chicagoListModel(favoritePlaces){
  $.getJSON("../locations.json", function(data) {
    var locationJSON = data.locations;
    console.log(locationJSON);
    // createMarker(locationJSON);
    for(var i = 0; i < locationJSON.length; i++){
      viewModel.favoritePlaces.push(new LocationModel(locationJSON[i], viewModel));
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
var LocationModel = function(location, viewModel) {
  var self = this;

  self.title = location.name;
  self.position = location.position;
  self.address = location.address;
  self.city = location.city;
  self.state = location.state;
  self.zipcode = location.zip;

  self.markerCreation = ko.computed(function(){
    if (viewModel.google()){
      self.marker = new google.maps.Marker ({
        position: self.position,
        map: map,
        title: self.title,
        animation: google.maps.Animation.DROP,
      });
      self.marker.addListener('click', function(){
        // console.log('clicked');
        console.log(this.title); //Keyword this is the marker here.
        //Set content with InfoWindow
        viewModel.largeInfoWindow.setContent(self.contentString());
        // Open LargeInfoWindow
        viewModel.largeInfoWindow.open()
      });
    }
  })
  //Create contentString for the InfoWindow
  self.contentString = '<div><i>'+ self.title + '</i></div>' +
                       '<div>'+ self.address + '</div>' +
                       '<div>'+ self.city + '</div>' +
                       '<div>'+ self.state, self.zipcode + '</div>'





  // self.marker.setMap(map)
};

// ViewModel
var ViewModel = function(LocationModel) {
  console.log("Instiate ViewModel");
  var self = this;
  self.favoritePlaces = ko.observableArray();
  self.google = ko.observable(!!window.google);  //Sets the Google Window to False

  chicagoListModel(self.favoritePlaces);

  self.infoWindowCreation = ko.computed(function(){
    if (self.google()){
      self.largeInfoWindow = new google.maps.InfoWindow();
    }
  });



};
// Instiate the viewModel
viewModel = new ViewModel();
ko.applyBindings(viewModel);


// // Wikipedia API
// var wikiUrl = 'https://en.wikipedia.org/w/api.php?'
// $.ajax({})
