'use strict';

// Initialize Google maps
function initMap() {
  var chicago = {lat: 41.8333908, lng: -88.0130296}
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: chicago
  });
  var marker = new google.maps.Marker({
    position: chicago,
    map: map
  });
}
