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

  var bounds = new google.maps.LatLngBounds();

  viewModel.google(!!window.google); //true

}
// Loading Locations Data Dynamically
function chicagoListModel(favoritePlaces){
  $.getJSON("../locations.json", function(data) {
    var locationJSON = data.locations;
    console.log(locationJSON);
    for(var i = 0; i < locationJSON.length; i++){
      viewModel.favoritePlaces.push(new LocationModel(locationJSON[i], viewModel));
    };
  });
}

//Model - LocationModel constructor funtion
var LocationModel = function(location, viewModel) {
  var self = this;

  self.title = location.name;
  self.position = location.position;
  self.address = location.address;
  self.city = location.city;
  self.state = location.state;
  self.zipcode = location.zipcode;


  self.markerCreation = ko.computed(function(){
    if (viewModel.google()){

      self.marker = new google.maps.Marker ({
        position: self.position,
        map: map,
        title: self.title,
        animation: google.maps.Animation.DROP,
      });
      //Create contentString for the InfoWindow
      self.contentString = ko.computed(function(){
        return '<div><i>'+ self.title + '</i></div>' +
        '<div>'+ self.address + '</div>' +
        '<div>'+ self.city +', '+ self.state +' '+ + self.zipcode + '</div>'
      });
      self.marker.addListener('click', function(){
        // console.log('clicked');
        console.log(this.title); //Keyword this is the marker here.
        //Set content with InfoWindow
        viewModel.largeInfoWindow.setContent(self.contentString());
        // Open LargeInfoWindow
        viewModel.largeInfoWindow.open(map, self.marker);
      });
      // Wikipedia API
      var wikiUrl = 'https://en.wikipedia.org/w/api.php?'+
                    'action=opensearch&search=' + self.title +
                    '&format=json&callback=wikiCallback';
      $.ajax({
        url: wikiUrl,
        dataType: "jsonp"
      }).done(function(response){
        console.log(response);
      })
    }
  })

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
