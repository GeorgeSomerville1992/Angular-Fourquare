
'use strict';

angular.module("myTestAppApp")
	.constant('FOURSQUARE', {
		"CLIENT_ID":"DNAX4J0OXW35BVM4HPFWBKENN2Y1KODBIYBAX4WYH4V0QOO4",
		"CLIENT_SECRET":"FOEJEEY51KIIOGR01YNTUCP5NDTPPAOL0FXKJL5A3IGQEJPL",
		"VERSION":"20130815"
	})
	.constant('FQRESULTS',{



	})
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
					attractionImageSuffix:""

				}
		]
		// $scope.submitRequest()
		// make request
	})					// name            // dependencies
	.controller("FoursquareCtrl",["$scope","$http","FOURSQUARE",function($scope,$http,FOURSQUARE){

		var foursquareUrl = "https://api.foursquare.com/v2/venues/explore?client_id="+FOURSQUARE.CLIENT_ID+"&client_secret="+FOURSQUARE.CLIENT_SECRET+"&v="+FOURSQUARE.VERSION
		console.log(foursquareUrl)	
		this.newSearch = {}
		$scope.location = ""
		$scope.attractions = ""
		$scope.submitRequest = function(){
			var query = {attractionType:$scope.attractionType,city:$scope.city}
			$scope.savedLocations.push(query)
			$scope.foursquare(query.attractionType,query.city)
		}	
		$scope.foursquare = function(attraction,city){
			console.log("query.atttraction",attraction)
			$http.get(foursquareUrl+"&near="+city+"&query="+attraction+"&venuePhotos=1").success(function(data){
				$scope.foursquareAttractions = data.response["groups"][0].items
				console.log($scope.foursquareAttractions);
				angular.forEach($scope.foursquareAttractions, function(value, key){
					console.log(value)
					var savedAttraction = {attractionName:value.venue.name,attractionImagePrefix:value.venue.photos.groups[0].items[0].prefix,attractionImageSuffix:value.venue.photos.groups[0].items[0].suffix}
					$scope.savedAttractions.push(savedAttraction);
					// return $scope.foursquareAttractions
				});
				// console.log(data.response["groups"][0].items)
				console.log($scope.savedAttractions)
				// use explore to get groups which includes photos
				// $scope.products = data
			})
		}
	}])
