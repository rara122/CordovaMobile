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

var app = {
    // Application Constructor
    initialize: function() {

		var map;
		var marker;
		var currentLocation;
		var OglesbyLat = 30.44476;
		var OglesbyLong = -84.29720;
		
		function initialize() {
		  var mapOptions = {
			zoom: 18,
			center: new google.maps.LatLng(OglesbyLat, OglesbyLong)
		  };
		  map = new google.maps.Map(document.getElementById('map-canvas'),
			  mapOptions);
		}

		google.maps.event.addDomListener(window, 'load', initialize);
		
		function addMarker(){
			marker = new google.maps.Marker({
				position: currentLocation,
				map: map,
				title: 'Hello World!'
			});
		}
		
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
			//GeoLocation Functions
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		var element = document.getElementById('geolocation');
		element.innerHTML = "Loading Your Geo-Location ...";
		
		
		function onSuccess(position)
		{
			var element = document.getElementById('geolocation');
			element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
					'Longitude: '          + position.coords.longitude             + '<br />' +
					'Altitude: '           + position.coords.altitude              + '<br />' +
					'Accuracy: '           + position.coords.accuracy              + '<br />' +
					'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
					'Heading: '            + position.coords.heading               + '<br />' +
					'Speed: '              + position.coords.speed                 + '<br />' +
					'Timestamp: '          + position.timestamp                    + '<br />';

					
			
			currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			function addMarker(){
				marker = new google.maps.Marker({
					position: currentLocation,
					map: map,
					title: 'Hello World!'
				});
			}
		}
		function onError(error) {
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

