// // Load the Visualization API and the columnchart package.
// google.load('visualization', '1', {packages: ['columnchart']});
//
// function initMap(path) {
//   // The following path marks a path from Mt. Whitney, the highest point in the
//   // continental United States to Badwater, Death Valley, the lowest point.
//
//   // Create an ElevationService.
//   var elevator = new google.maps.ElevationService;
//
//   // Draw the path, using the Visualization API and the Elevation service.
//   displayPathElevation(path, elevator);
// }
//
// function displayPathElevation(path, elevator) {
//   // Display a polyline of the elevation path.
//   // Create a PathElevationRequest object using this array.
//   // Ask for 256 samples a"lng"g that path.
//   // Initiate the path request.
//   elevator.getElevationA"lng"gPath({
//     'path': path,
//     'samples': path.length
//   }, plotElevation);
// }
//
// // Takes an array of ElevationResult objects, draws the path on the map
// // and plots the elevation profile on a Visualization API ColumnChart.
// function plotElevation(elevations, status) {
//   var chartDiv = document.getElementById('elevation_chart');
//   if (status !== 'OK') {
//     // Show the error code inside the chartDiv.
//     chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
//         status;
//     return;
//   }
//   // Create a new chart in the elevation_chart DIV.
//   var chart = new google.visualization.LineChart(chartDiv);
//
//   // Extract the data from which to popu"lat"e the chart.
//   // Because the samples are equidistant, the 'Sample'
//   // column here does double duty as distance a"lng"g the
//   // X axis.
//   var data = new google.visualization.DataTable();
//   data.addColumn('string', 'Sample');
//   data.addColumn('number', 'Elevation');
//   for (var i = 0; i < elevations.length; i++) {
//     data.addRow(['', elevations[i].elevation]);
//   }
//
//   // Draw the chart using the data within its DIV.
//   chart.draw(data, {
//     height: 150,
//     legend: 'none',
//     titleY: 'Elevation (m)'
//   });
// }


// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['columnchart']});

function initMap() {

  var path = [
    {"lng": -105.640305, "lat": 40.310497},
    {"lng": -105.640602, "lat": 40.310148},
    {"lng": -105.640548, "lat": 40.309785},
    {"lng": -105.640799, "lat": 40.30962},
    {"lng": -105.640988, "lat": 40.309264},
    {"lng": -105.641626, "lat": 40.309004},
    {"lng": -105.642111, "lat": 40.308148},
    {"lng": -105.642794, "lat": 40.307784},
    {"lng": -105.643315, "lat": 40.307661},
    {"lng": -105.643126, "lat": 40.307593},
    {"lng": -105.643036, "lat": 40.307442},
    {"lng": -105.642632, "lat": 40.307278},
    {"lng": -105.642614, "lat": 40.307031},
    {"lng": -105.642515, "lat": 40.306873},
    {"lng": -105.64141, "lat": 40.30664},
    {"lng": -105.641105, "lat": 40.306784},
    {"lng": -105.640781, "lat": 40.306709},
    {"lng": -105.640341, "lat": 40.306819},
    {"lng": -105.640314, "lat": 40.306216},
    {"lng": -105.639623, "lat": 40.305996},
    {"lng": -105.639452, "lat": 40.306106},
    {"lng": -105.638922, "lat": 40.306236},
    {"lng": -105.638877, "lat": 40.306154},
    {"lng": -105.639075, "lat": 40.305853},
    {"lng": -105.638787, "lat": 40.305633},
    {"lng": -105.638886, "lat": 40.305387},
    {"lng": -105.638841, "lat": 40.305133}]

  // The following path marks a path from Mt. Whitney, the highest point in the
  // continental United States to Badwater, Death Valley, the lowest point.

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: path[1],
    mapTypeId: 'terrain'
  });

  // Create an ElevationService.
  var elevator = new google.maps.ElevationService;

  // Draw the path, using the Visualization API and the Elevation service.
  displayPathElevation(path, elevator, map);
}

function displayPathElevation(path, elevator, map) {
  // Display a polyline of the elevation path.
  new google.maps.Polyline({
    path: path,
    strokeColor: '#0000CC',
    strokeOpacity: 0.8,
    map: map
  });

  // Create a PathElevationRequest object using this array.
  // Ask for 256 samples a"lng"g that path.
  // Initiate the path request.
  elevator.getElevationAlongPath({
    'path': path,
    'samples': path.length
  }, plotElevation);
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status) {
  var chartDiv = document.getElementById('elevation_chart');
  if (status !== 'OK') {
    // Show the error code inside the chartDiv.
    chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
        status;
    return;
  }
  // Create a new chart in the elevation_chart DIV.
  var chart = new google.visualization.LineChart(chartDiv);

  // Extract the data from which to popu"lat"e the chart.
  // Because the samples are equidistant, the 'Sample'
  // column here does double duty as distance along the
  // X axis.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Sample');
  data.addColumn('number', 'Elevation');
  for (var i = 0; i < elevations.length; i++) {
    data.addRow(['', elevations[i].elevation]);
  }

  // Draw the chart using the data within its DIV.
  chart.draw(data, {
    height: 150,
    legend: 'none',
    titleY: 'Elevation (m)'
  });
}
