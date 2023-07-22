// Creating the map object
let myMap = L.map("map", {
  center: [18.806706,-66.459624],
  zoom: 8
});
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data - ALL earthquakes in the last week
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// The function that will determine the color of a neighborhood based on the borough that it belongs to
function chooseColor(depth) {
  if (depth < 10) return "#ffffd4";
  else if (depth < 30) return "#fed98e";
  else if (depth < 50) return "#fe9929";
  else if (depth < 70) return "#d95f0e";
  else return "#993404";
}

d3.json(link).then(function(response) {

  //console.log(response);
  features = response.features;

  //console.log(features);

  for (let i = 0; i < features.length; i++) {

    if(features[i]){
      L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: "black",
        weight: "1",
        fillColor: chooseColor(features[i].geometry.coordinates[2]),
        radius: ((features[i].properties.mag ** 3) * 500)
      }).bindPopup("<h2>Location: " + features[i].properties.place + "</h2> <hr> <h2>Magnitude: " + features[i].properties.mag + "</h2>").addTo(myMap);
    }
  
  }

});



