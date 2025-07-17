// Initialize the map and set its view to Kraków's coordinates
var map = L.map('map').setView([50.0647, 19.9450], 13);

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker at Kraków's coordinates
var marker = L.marker([50.0647, 19.9450]).addTo(map);

// Add a popup to the marker
marker.bindPopup("<b>Cukiernia</b><br>Kuchenny zakątek").openPopup();
