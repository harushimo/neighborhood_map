(function () {
  "use strict";
}());


//Initialize Variables for maps
var map;
var marker;
var markers = [];

// Handling the location array
var locations = [];
// Other Variables
var viewModel;
var contentString;

// Error Handling for the Google Maps API
function googleMapError(){
  alert("Google Maps API isn't loading");
}

// Initialize the Google Map
function initMap() {
  var chicago = {lat: 41.8781136, lng: -87.6297982};
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
    for(var i = 0; i < locationJSON.length; i++){
      viewModel.favoritePlaces.push(new LocationModel(locationJSON[i], viewModel));
    }
  }).fail(function(){
    alert("Location Data isn't loading");
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
        '<div>'+ self.city +', '+ self.state +' '+ self.zipcode + '</div>';
      });
      self.marker.addListener('click', function(){
        // Wikipedia API
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?'+
                      'action=opensearch&search=' + self.title +
                      '&format=json&callback=wikiCallback';
        $.ajax({
          url: wikiUrl,
          dataType: "jsonp"
        }).done(function(response){
          var article = response[3][0];
          var url = '<div>'+ '<a href ="'+ article +'" target="_blank">'+ self.title +'</a></div>';
          //Set content with InfoWindow
          viewModel.largeInfoWindow.setContent(self.contentString() + url);
          // Open LargeInfoWindow
          viewModel.largeInfoWindow.open(map, self.marker);
        }).fail(function(){
          //Set content with InfoWindow
          viewModel.largeInfoWindow.setContent(self.contentString() + '<em><br>'+ "Wikipedia data isn't loading"+'</em>');
          // Open LargeInfoWindow
          viewModel.largeInfoWindow.open(map, self.marker);
        });
        // Marker Animation
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout (function(){self.marker.setAnimation(null);}, 750);
      });
      // Search box
      // var input = document.getElementById('searchItem');
      // var searchBox = new google.maps.places.SearchBox(input);
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    }
  });
};

// ViewModel
var ViewModel = function(LocationModel) {
  var self = this;
  self.favoritePlaces = ko.observableArray();
  self.google = ko.observable(!!window.google);  //Sets the Google Window to False

  chicagoListModel(self.favoritePlaces);

  self.infoWindowCreation = ko.computed(function(){
    if (self.google()){
      self.largeInfoWindow = new google.maps.InfoWindow();
    }
  });

  // Search Filter

  // mapParameter represents the user input into the search box
  self.mapParameter = ko.observable("");

  // Search List is a filtered list of the
  self.searchList = ko.computed(function(){
    var searchFilter = self.mapParameter().toLowerCase();
    return ko.utils.arrayFilter(self.favoritePlaces(), function(location){
      var locationMatch = location.title.toLowerCase().indexOf(searchFilter) >= 0;
      if(location.marker){
        location.marker.setVisible(locationMatch);
      }
      return locationMatch;
    });
  });


  // Click binding
  self.markerAnimator = function(location) {
    google.maps.event.trigger(location.marker, 'click');
  };


};
// Instiate the viewModel
viewModel = new ViewModel();
ko.applyBindings(viewModel);
