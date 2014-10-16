
var initialLocation;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var browserSupportFlag =  new Boolean();
var map;
var infowindow = new google.maps.InfoWindow();
var markersArray = [];
var latitude;
var longitude;
function initialize() {
  var myOptions = {
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);


  });


  // Try W3C Geolocation method (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	  latitude= position.coords.latitude;
	  longitude=position.coords.longitude;
      contentString = "<input type='hidden' name='latitude' value='" +latitude+ "'> "+"<input type='hidden' name='longitude' value='" + longitude+"'>"+"<input type='submit' value='Something is broke!'>";
      map.setCenter(initialLocation);
      infowindow.setContent(contentString);
      infowindow.setPosition(initialLocation);
      infowindow.open(map);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  } else if (google.gears) {
    // Try Google Gears Geolocation
    browserSupportFlag = true;
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
      contentString = "Location found using Google Gears";
      map.setCenter(initialLocation);
      infowindow.setContent(contentString);
      infowindow.setPosition(initialLocation);
      infowindow.open(map);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  } else {
    // Browser doesn't support Geolocation
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
    detectBrowser();
  }
      var constructionLayer = new google.maps.KmlLayer('http://data.cityofchicago.org/download/wv57-d8c5/application%252Fxml')
      constructionLayer.setMap(map);
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag == true) {
    initialLocation = newyork;
    contentString = "Error: The Geolocation service failed.";
  } else {
    initialLocation = siberia;
    contentString = "Error: Your browser doesn't support geolocation. Are you in Siberia?";
  }
  map.setCenter(initialLocation);
  infowindow.setContent(contentString);
  infowindow.setPosition(initialLocation);
  infowindow.open(map);
}
function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map_canvas");
    
  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}
function addMarker(location) {
  marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markersArray.push(marker);
}

// Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
  }
}

// Shows any overlays currently in the array
function showOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(map);
    }
  }
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
}

function calcRoute() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var waypts = [];
    var checkboxArray = document.getElementById("waypoints");
    for (var i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected == true) {
        waypts.push({
            location:checkboxArray[i].value,
            stopover:true});
      }
    }

    var request = {
        origin: start, 
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById("directions_panel");
        summaryPanel.innerHTML = "";
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += "<b>Route Segment: " + routeSegment + "</b><br />";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br />";
          summaryPanel.innerHTML += route.legs[i].distance.text + "<br /><br />";
        }
      }
    });
  }