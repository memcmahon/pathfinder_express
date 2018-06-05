// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['linechart']});

function initMap(path) {

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
    data.addRow(['', elevations[i].elevation*3.28084]);
  }

  // Draw the chart using the data within its DIV.
  chart.draw(data, {
    height: 150,
    legend: 'none',
    titleY: 'Elevation (ft)'
  });
}
