function initialize(trails) {
  var markers = []

  trails.forEach((trail) => {
    markers.push({
      position: trail.nodes[0],
      label: trail.name
    });
  })

  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 12,
    center: markers[0].position,
    mapTypeId: 'terrain'
  });

  var infoWindow = new google.maps.InfoWindow();

  markers.forEach((marker, index) => {
    var point = new google.maps.Marker({
      position: marker.position,
      map: map,
    })

    google.maps.event.addListener(point, 'click', (function(point) {
      return function() {
        infoWindow.setContent(marker.label);
        infoWindow.open(map, point);
      }
    })(point));
  })
}
