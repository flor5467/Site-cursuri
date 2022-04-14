
var map_obj = {};

function generate_map() {

// incarcam elementul care va fi folosit pentru incarcarea hartii

var map_el = document.getElementById('harta');

// ne creem un object de options, object pe care il putem folosi pentru a activa/dezactiva anumite elemente vizuale din harta

// in acest object setam doar valorile mandatory de zoom default si coordonatele de centrare a hartii

var options = {};

options['center'] = new google.maps.LatLng(44.434171, 26.03372);
options['zoom'] = 10;

// desenam harta in elementul si cu optiunile definite mai sus, initializand un object de tip google.maps.Map

map_obj = new google.maps.Map(map_el, options);

// markerul nu este desenat pe harta automat asadar, ne definim si un object de options pentru elemente

// in acest object setam valorile de position, pe care o preluam din objectul de options de mai sus, de map, unde trebuie sa furnizam object-ul de harta pe care va fi desenat markerul si un eventual titlu, care va fi afisat onhover

var marker_options = {};
marker_options['position'] = options.center;
marker_options['map'] = map_obj;
marker_options['title'] = 'BitAcademy';

// apoi, desenam markerul initializand un object de tip google.maps.Marker

var marker_obj = new google.maps.Marker(marker_options);

// daca dorim sa afisam, on click, un popup informativ, avem la dispozitie objectul InfoWindow

var infowindow = new google.maps.InfoWindow({
content: '<p>Niste continut de test</p>'
});
// odata initializat acest object, il atasam de eventul de click aferent objectului de marker care ne intereseaza

// a se observa faptul ca folosim o metoda nativa google maps denumita addListner

marker_obj.addListener('click', function() {
infowindow.open(map_obj, marker_obj);
});

}

// functia trebuie si executata automat pentru a se realiza acea prima desenare a hartii

generate_map();



document.getElementById('mapsearch').onkeypress = function(event) {

if (event.keyCode == 13 || event.key == 'Enter') {
event.preventDefault();
search_map();
}

}




function search_map() {

// preluam valoarea din campul de search

var search_str = document.getElementById('mapsearch').value;

// verificam daca este de tip latitudine, longitudine

var search_arr = search_str.split(',');
var is_lat_long = (search_arr.length == 2 && !isNaN(search_arr[0].trim()) && !isNaN(search_arr[1].trim()));

// daca is_lat_long este false, initializam objectul de Geocoder pentru a obtine latitudinea si longitudinea pentru adresa respectiva

if (!is_lat_long) {

// initializam objectul Geocoder

var geocoder = new google.maps.Geocoder();


// il folosim impreuna cu adresa cautata de user si capturam, intr-o functie anonima, rezultatele primite de la API

geocoder.geocode({address: search_str.trim()}, function(results, status) {

if (!results || status == 'ZERO_RESULTS') {

// daca nu avem rezultate, afisam un alert de eroare

alert('Nu s-a gasit niciun rezultat !');

} else {

// daca avem rezultate, preluam latitudinea, longitudinea si adresa formatata de API din array-ul de results (putem avea mai multe rezultate, il preluam doar pe primul din array)

var clat = results[0].geometry.location.lat();
var clng = results[0].geometry.location.lng();
var cdescription = results[0].formatted_address;
var coords = {lat: Number(clat), lng: Number(clng)};

// trimitem aceste rezultate catre functia de center_map pentru a re-centra harta si a desena noul marker

center_map(coords, cdescription);

}

});

} else {

// preluam coordonatele direct din cautarea utilizatorului

var clat = search_arr[0].trim();
var clng = search_arr[1].trim();

// construim un description care va fi folosit in infowindow-ul markerului

var cdescription = 'Coordonate: latitudine ' + clat + ', longitudine ' + clng;

var coords = {lat: Number(clat), lng: Number(clng)};

// trimitem aceste rezultate catre functia de center_map pentru a re-centra harta si a desena noul marker

center_map(coords, cdescription);

}

}


function center_map(coords, description) {

// executam pe object-ul de harta metoda setCenter pentru a re-centra harta

map_obj.setCenter(coords);

// desenam noul marker

var marker_options = {};
marker_options['position'] = coords;
marker_options['map'] = map_obj;
var marker_obj = new google.maps.Marker(marker_options);

// atasam de acest marker un infowindow care va contine fie adresa formatata primita de la API prin geolocatie, fie textul construit de noi din coordonatele introduse direct de utilizator

var infowindow = new google.maps.InfoWindow({
content: description
});

marker_obj.addListener('click', function() {
infowindow.open(map_obj, marker_obj);
});

}