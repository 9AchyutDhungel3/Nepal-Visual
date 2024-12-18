// Function to fetch and load GeoJSON data based on map type
function loadMap(mapType) {
  const url = `/map/${mapType}`; // Dynamic URL to fetch the correct GeoJSON file

  // Fetch GeoJSON data from the server
  fetch(url)
    .then(response => response.json())
    .then(data => {
      renderMap(data);  // Call renderMap function to visualize the data
    })
    .catch(error => console.error('Error loading map data:', error));
}

// Function to render the map using D3.js
function renderMap(geojson) {
  const width = 800; // Width of the map container
  const height = 600; // Height of the map container

  // Remove any previous map (to ensure only one map is displayed)
  d3.select("#map").html("");

  // Create an SVG element inside the #map div
  const svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Set up a projection and path generator for GeoJSON visualization
  const projection = d3.geoMercator()
    .fitSize([width, height], geojson); // Adjust to fit the map within the container

  const path = d3.geoPath().projection(projection);

  // Draw the map polygons
  svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "lightblue")
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .on("mouseover", function() {
      d3.select(this).attr("fill", "red");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "lightblue");
    });
}
