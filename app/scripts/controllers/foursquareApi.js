
'use strict';

angular.module("myTestAppApp")
	.constant('FOURSQUARE', {
		"CLIENT_ID":"DNAX4J0OXW35BVM4HPFWBKENN2Y1KODBIYBAX4WYH4V0QOO4",
		"CLIENT_SECRET":"FOEJEEY51KIIOGR01YNTUCP5NDTPPAOL0FXKJL5A3IGQEJPL",
		"VERSION":"20130815"
	})
	.constant('GOOGLEGEOCODE',{
		"APIKEY":"AIzaSyBDi56DVodoH92MNTpQfcPtloDx0y8CgY8",
		"URL":"https://maps.googleapis.com/maps/geocode/output?parameters",
		location:document.getElementById("geocodeCity")
	})
	// .constant('MAPOPTIONS',{
	// 	zoom: 12,  // hostel based on what user has typed in we need to get corrdinated of what user as typed in
	// 						// or find away where google will just geocode the city
	// 						// because in my project I gecoded the cidy the user typed into latpoints.
 //    // center: new google.maps.LatLng(),
 //    mapTypeId: google.maps.MapTypeId.ROADMAP,
 //    map_container:document.getElementById('map-canvas')
	// })
	.controller("attractionCtrl",function($scope){
		$scope.savedLocations = [
						{
							attractionType: "bar",
							city:"london"
						},
						{
							attractionType:"bath",
							city:"rome"
						}

		]
		$scope.savedAttractions = [

				// this will have data pushed through
				{
					attractionName:"",
					attractionImagePrefix:"",
					attractionImageSuffix:"",
					attractionOpeningTimes:""

				}
		]
		// $scope.submitRequest()
		// make request
	})					// name            // dependencies
	.controller("googleMapsCtrl",["$scope","$http","MAPOPTIONS"],function($scope,$http,MAPOPTIONS){
		  $scope.createMap = function(){
	      if(MAPOPTIONS.map_container != undefined){
	        window.map = new google.maps.Map(MAPOPTIONS.map_container, MAPOPTIONS) 
	        console.log(window.map)
	      }
	    }

	})


	.controller("FoursquareCtrl",["$scope","$http","FOURSQUARE","GOOGLEGEOCODE",function($scope,$http,FOURSQUARE,GOOGLEGEOCODE){

		var foursquareUrl = "https://api.foursquare.com/v2/venues/explore?client_id="+FOURSQUARE.CLIENT_ID+"&client_secret="+FOURSQUARE.CLIENT_SECRET+"&v="+FOURSQUARE.VERSION
		console.log("geocode location")
		this.newSearch = {}
		$scope.location = ""
		$scope.attractions = ""
		// put maps in here for now then see how we can try create a seperate controller. 
		$scope.createMap = function(cityInput){
			console.log("CITYINPUT:",cityInput )
			$http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+cityInput+"&sensor=false&key="+GOOGLEGEOCODE.APIKEY).success(function(data){
				// how does it know which one to GEOCODE??
				// resolve by putting in cpuntry format in another inputbox as well.
				// then move on gecoding users position. 
				console.log("https://maps.googleapis.com/maps/api/geocode/json?address="+cityInput+"&sensor=false&key="+GOOGLEGEOCODE.APIKEY)
				console.log(data)
			})

      // if(MAPOPTIONS.map_container != undefined){
      //   window.map = new google.maps.Map(MAPOPTIONS.map_container, MAPOPTIONS) 
      //   console.log(window.map)
      // }
	  }
		$scope.submitRequest = function(){
			console.log("geocode location after request")
			console.log($scope.city);
			var query = {attractionType:$scope.attractionType,city:$scope.city}
			$scope.createMap($scope.city);
			$scope.savedLocations.push(query)
			$scope.foursquare(query.attractionType,query.city)
		}	
		$scope.foursquare = function(attraction,city){
			console.log("query.atttraction",attraction)
			$http.get(foursquareUrl+"&near="+city+"&query="+attraction+"&venuePhotos=1").success(function(data){
				console.log("FOURSQUARE ATTRACTIONS",$scope.foursquareAttractions)
				$scope.foursquareAttractions = data.response["groups"][0].items
				// $scope.createMap(); // NEED TO PASS IN LAT POINTS ENTERED FROM USER.
				console.log($scope.foursquareAttractions);
				angular.forEach($scope.foursquareAttractions, function(value, key){
					var venue = value.venue;

					var savedAttraction = {attractionName:venue.name,attractionImagePrefix:venue.photos.groups[0].items[0].prefix
																	,attractionImageSuffix:value.venue.photos.groups[0].items[0].suffix,attractionOpeningTimes:venue.hours?value.venue.hours.status:"not available"}
					$scope.savedAttractions.push(savedAttraction);
					// $scope.createMap(savedAttraction);
				});
				// console.log(data.response["groups"][0].items)
				console.log($scope.savedAttractions)
				// use explore to get groups which includes photos
				// $scope.products = data
			})
		}
	}])
