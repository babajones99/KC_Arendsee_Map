/*var custom = L.layerGroup();

L.circle([52.88666, 11.50623], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).bindPopup("I am a circle.").addTo(custom);


osmBright = L.tileLayer('https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey={apiKey}', {
    attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
    maxZoom: 20,
    id: 'osm-bright',
    apiKey: '6ee3255db0ed4481bc33aa9f92d1c4d7'
});


var mymap = L.map('map').setView([52.88675, 11.50507], 17);
/*var mymap = L.map('map', {
    center: [52.88675, 11.50507],
    zoom: 17,
    layers: [osmBright, cities]
});*/

/*
var overlays = {
    "Custom": custom
};

mymap.on('zoomend', function () {
    var zoomlevel = map.getZoom();
    if (zoomlevel < 10) {
        if (map.hasLayer(points)) {
            map.removeLayer(points);
        } else {
            console.log("no point layer active");
        }
    }
    if (zoomlevel >= 10) {
        if (map.hasLayer(points)) {
            console.log("layer already added");
        } else {
            map.addLayer(points);
        }
    }
    console.log("Current Zoom Level =" + zoomlevel)
});


/*
L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am a circle.");

L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap).bindPopup("I am a polygon.");


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);*/




var sleepRooms = L.layerGroup();
L.circle([52.88666, 11.50623], 5, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).bindPopup("I am a circle.").addTo(sleepRooms);

var markers = L.layerGroup();
L.marker([52.88675, 11.50507]).bindPopup('Hier ist unser Konfi-Camp').addTo(markers);

var importantPlaces = L.layerGroup();
L.polygon([
    [52.8870311, 11.5051091],
    [52.8869614, 11.5055441],
    [52.8865275, 11.5053531],
    [52.8865972, 11.5049182]
], {color: 'red'}).bindTooltip("Mac-Attack Hauptspielfeld",).on('click', onClickMacAttackMain).addTo(importantPlaces);


var mbAttr = 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
    mbUrl = 'https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey={apiKey}';

var base  = L.tileLayer(mbUrl, {id: 'osm-bright', attribution: mbAttr, apiKey: '6ee3255db0ed4481bc33aa9f92d1c4d7'});

var map = L.map('map', {
    center: [52.88675, 11.50507],
    zoom: 17,
    layers: [base, sleepRooms, importantPlaces]
});
var overlays = {
    "Unterbringungen": sleepRooms,
    "Wichtige Orte": importantPlaces
};

L.control.layers(null, overlays).addTo(map);


/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Legende</h4>";
  div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
  div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
  div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
  div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
  
  return div;
};

legend.addTo(map);




map.on('zoomend', function() {
    var zoomlevel = map.getZoom();
        if (zoomlevel  <15){
            if (map.hasLayer(sleepRooms)) {
                map.removeLayer(sleepRooms);
            }
            if (map.hasLayer(importantPlaces)) {
                map.removeLayer(importantPlaces);
            }
            if (!map.hasLayer(markers)) {
                map.addLayer(markers);
            }
            legend.remove();
        }else{
            if (!map.hasLayer(sleepRooms)){
                map.addLayer(sleepRooms);
            }
            if (!map.hasLayer(importantPlaces)){
                map.addLayer(importantPlaces);
            }
            if (map.hasLayer(markers)){
                map.removeLayer(markers);
            }
            legend.addTo(map)
        }
    console.log("Current Zoom Level =" + zoomlevel)
    });


//Add Legend to Map
L.control.scale({position: "bottomright", imperial: false}).addTo(map);

function activatePopup(){
    document.getElementById("map").style.display = "none";
    document.getElementById("popup").style.display = "block";

}

function onClickMacAttackMain(){
    activatePopup();
}