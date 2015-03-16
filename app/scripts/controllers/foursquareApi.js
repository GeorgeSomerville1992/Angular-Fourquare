
'use strict';

angular.module("myTestAppApp")
	.constant('FOURSQUARE', {
		"CLIENT_ID":"DNAX4J0OXW35BVM4HPFWBKENN2Y1KODBIYBAX4WYH4V0QOO4",
		"CLIENT_SECRET":"FOEJEEY51KIIOGR01YNTUCP5NDTPPAOL0FXKJL5A3IGQEJPL",
		"VERSION":"20130815"
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
		// $scope.submitRequest()
		// make request
	})
	.controller("FoursquareCtrl",["$scope","$http","FOURSQUARE",function($scope,$http,FOURSQUARE){

		var foursquareUrl = "https://api.foursquare.com/v2/venues/search?client_id="+FOURSQUARE.CLIENT_ID+"&client_secret="+FOURSQUARE.CLIENT_SECRET+"&v="+FOURSQUARE.VERSION
		console.log(foursquareUrl)	
		this.newSearch = {}
		$scope.location = ""
		$scope.attractionType = ""
		$scope.submitRequest = function(){
			var query = {attractionType:$scope.attractionType,city:$scope.city}
			$scope.savedLocations.push(query)


			$scope.foursquare(query.attractionType,query.city)
		}	
		$scope.foursquare = function(attraction,city){
			console.log("query.atttraction",attraction)
			$http.get(foursquareUrl+"&near="+city+"&query="+attraction).success(function(data){
				console.log(data)

				// use explore to get groups which includes photos
				// $scope.products = data
			})
		}
	}])
