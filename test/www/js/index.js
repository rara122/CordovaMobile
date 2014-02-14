/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var Map;
var app = {
    // Application Constructor
    initialize: function() {

		var map;
		var currentLocation;
		var OglesbyUnion = new google.maps.LatLng(30.44476, -84.29720);
		
		
		// function HomeControl(controlDiv, map) {
		  // controlDiv.style.padding = '5px';

		  // // Set CSS for the control border
		  // var controlUI = document.createElement('div');
		  // controlUI.style.backgroundColor = 'white';
		  // controlUI.style.borderStyle = 'solid';
		  // controlUI.style.borderWidth = '2px';
		  // controlUI.style.cursor = 'pointer';
		  // controlUI.style.textAlign = 'center';
		  // controlUI.title = 'Click to set the map to Home';
		  // controlDiv.appendChild(controlUI);

		  // // Set CSS for the control interior
		  // var controlText = document.createElement('div');
		  // controlText.style.fontFamily = 'Arial,sans-serif';
		  // controlText.style.fontSize = '12px';
		  // controlText.style.paddingLeft = '4px';
		  // controlText.style.paddingRight = '4px';
		  // controlText.innerHTML = '<b>Home</b>';
		  // controlUI.appendChild(controlText);

		  // // Setup the click event listeners: simply set the map to
		  // // Chicago
		  // google.maps.event.addDomListener(controlUI, 'click', function() {
			// map.setCenter(chicago)
		  // });
		// }
		

		function initialize() {
		  var mapOptions = {
			zoom: 18,
			center: OglesbyUnion
		  };
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		Map = map;
		}
/*
		//map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		var marker = new google.maps.Marker({
			position: currentLocation,
			map: map,
			title: 'Hello World!'
		});*/

		google.maps.event.addDomListener(window, 'load', initialize);
		
		
		
		
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
	//var watchID = null;	
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		var options = {timeout: 30000, enableHighAccuracy: true};
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		
			//GeoLocation Functions
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		var element = document.getElementById('geolocation');
		element.innerHTML = "Loading Your Geo-Location ...";
		
		
		function onSuccess(position)
		{
			// var element = document.getElementById('geolocation');
			// element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
					// 'Longitude: '          + position.coords.longitude             + '<br />' +
					// 'Altitude: '           + position.coords.altitude              + '<br />' +
					// 'Accuracy: '           + position.coords.accuracy              + '<br />' +
					// 'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
					// 'Heading: '            + position.coords.heading               + '<br />' +
					// 'Speed: '              + position.coords.speed                 + '<br />' +
					// 'Timestamp: '          + position.timestamp                    + '<br />';					
			
			currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var marker = new google.maps.Marker
			({
				position: currentLocation,
				title: "currLocation"
			});
			marker.setMap(Map);
		}
		function onError(error) {
			if(error.code == 2)
			{
				alert('GPS not detected:\nTurn GPS on for a more accurate location.');
			}
			else if(error.code == 3)
			{
				alert('GPS has not found a change in location in over a minute, your location may be inaccurate.');
			}
			else
				alert('code: '    + error.code    + '\n' +
					'message: ' + error.message + '\n' + 
					"OOPS ;D");
		}
				
	
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

