

var markers = L.layerGroup();
L.marker([52.88675, 11.50507]).bindPopup('Hier ist unser Konfi-Camp').addTo(markers);

var sleepRooms = L.layerGroup();
var importantPlaces = L.layerGroup();

// Loop through the info data
for (var i = 0; i < info.places.length; i++) {
    var place = info.places[i];

    //Add building to different layer depending on the type
    switch (place.color) {
        case "red":
            // Create and save a reference to each marker
            L.polygon(place.latLng, {
                color: place.color,
                headline: place.headline,
                description: place.description,
                img: place.img,
                konfis: place.konfis,
                ma: place.ma
            }).bindTooltip(place.headline,).on('click', onClickObject.bind(null, i)).addTo(importantPlaces);
            break;
        case "yellow":
            // Create and save a reference to each marker
            L.polygon(place.latLng, {
                color: place.color,
                headline: place.headline,
                description: place.description,
                img: place.img,
                konfis: place.konfis,
                ma: place.ma
            }).bindTooltip(place.headline,).on('click', onClickObject.bind(null, i)).addTo(sleepRooms);
            break;
        case "blue":
            // Create and save a reference to each marker
            L.polygon(place.latLng, {
                color: place.color,
                headline: place.headline,
                description: place.description,
                img: place.img,
                konfis: place.konfis,
                ma: place.ma
            }).bindTooltip(place.headline,).on('click', onClickObject.bind(null, i)).addTo(sleepRooms);
            break;
        default:
            // Create and save a reference to each marker
            L.polygon(place.latLng, {
                color: place.color,
                headline: place.headline,
                description: place.description,
                img: place.img,
                konfis: place.konfis,
                ma: place.ma
            }).bindTooltip(place.headline,).on('click', onClickObject.bind(null, i)).addTo(importantPlaces);
            break;
    }
}


/*
L.polygon([
    [52.8870311, 11.5051091],
    [52.8869614, 11.5055441],
    [52.8865275, 11.5053531],
    [52.8865972, 11.5049182]
], {
    color: 'red',
    headline: "YOoooo",
    description: "Yeeah",
}).bindTooltip("Mac-Attack Hauptspielfeld",).on('click', onClickObject.bind(null, 2)).addTo(importantPlaces);
*/

var mbAttr = 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
    mbUrl = 'https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey={apiKey}';

var base = L.tileLayer(mbUrl, { id: 'osm-bright', attribution: mbAttr, apiKey: '6ee3255db0ed4481bc33aa9f92d1c4d7' });

var map = L.map('map', {
    center: [52.88675, 11.50507],
    zoom: 18,
    layers: [base, sleepRooms, importantPlaces]
});
var overlays = {
    "Unterbringungen": sleepRooms,
    "Wichtige Orte": importantPlaces
};

L.control.layers(null, overlays).addTo(map);


/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Legende</h4>";
    div.innerHTML += '<i style="background: yellow"></i><span>Unterkünfte</span><br>';
    div.innerHTML += '<i style="background: red"></i><span>Gruppenräume</span><br>';
    div.innerHTML += '<i style="background: blue"></i><span>Sanitäranlagen</span><br>';
    div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
    div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';

    return div;
};

legend.addTo(map);


map.on('zoomend', function () {
    var zoomlevel = map.getZoom();
    if (zoomlevel < 15) {
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
    } else {
        if (!map.hasLayer(sleepRooms)) {
            map.addLayer(sleepRooms);
        }
        if (!map.hasLayer(importantPlaces)) {
            map.addLayer(importantPlaces);
        }
        if (map.hasLayer(markers)) {
            map.removeLayer(markers);
        }
        legend.addTo(map)
    }
});


//Add Legend to Map
L.control.scale({ position: "bottomright", imperial: false }).addTo(map);

function activatePopup() {
    document.getElementById("map").style.display = "none";
    document.getElementById("popup").style.display = "flex";
}

function deactivatePopup() {
    document.getElementById("map").style.display = "block";
    document.getElementById("popup").style.display = "none";
}

function onClickObject(id, e) {
    currObj = info.places[id];

    document.getElementById("popupHeadline").innerHTML = currObj.headline;
    let newHtml = "";

    newHtml += `<h3>${currObj.description}</h3>`

    if (currObj.konfis != null) {
        newHtml += `<h3>Konfis: ${currObj.konfis}</h3>`
    }

    if (currObj.ma != null) {
        newHtml += `<h3>Mitarbeitende: ${currObj.ma}</h3>`
    }

    for (let i = 0; i < currObj.img.length; i++) {
        newHtml += `<img src="${currObj.img[i]}" class="imgPopup">`
    }




    document.getElementById("popupImages").innerHTML = newHtml;
    //document.getElementsByClassName("mySlides")[0].style.display = "block";

    activatePopup();
}
