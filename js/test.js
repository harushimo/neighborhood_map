"use strict"
var map;
var markers = [];
// Load data using KO observableArray

function initMap() {
  // Initialize Google maps
  var chicago = {lat: 41.8781136, lng: -87.6297982}
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: chicago
  });

var locations = [
  {
    title: 'Solider Field',
    location: {lat: 41.8623132, lng: -87.6188824},
    address: '1410 Museum Campus Dr',
    city: 'Chicago',
    state: 'IL',
    zipcode:'60605'
  },
  {
    title: 'Art Institute',
    location: {lat: 41.8795845, lng: -87.6259073},
    address: '111 S Michigan Ave',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60603'
  },
  {
    title: 'Museum of Science and Industry',
    location: {lat: 41.7905726, lng: -87.6188824},
    address: '5700 S Lake Shore Dr',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60637'
  },
  {
    title: 'Wrigley Field',
    location: {lat: 41.9484384, lng: -87.6575267},
    address: '1060 W Addison St',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60613'
  },
  {
    title: 'Kohl Childrens Museum',
    location: {lat: 42.09376, lng: -87.828103},
    address: '2100 Patriot Blvd',
    city: 'Glenview',
    state: 'IL',
    zipcode: '60613'
  }
];

// Create the infowindow
var largeInfoWindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();


  //Create Map Marker array
  for(var i = 0; i < locations.length; i++){
    var position = locations[i].location;
    var title = locations[i].title;

    // Loops and creates markers for each object in the array
    var marker = new google.maps.Marker ({
      position: position,
      map: map,
      title: title,
      id: i
    });
    // Push the markers
    markers.push(marker);
  }
  // //Test Marker for Chicago Center Point
  // markers = new google.maps.Marker ({
  //   position: chicago,
  //   map: map
  // });
}
