'use strict';
angular.module('myTestAppApp')
	.controller("StoreCtrl",['$scope','$http',function($scope,$http){
				// $scope.products = gem;
				console.log($scope)
				$scope.products = []
				// we need to pass this in to http 
				// and get http back out of is.
				// now we can use http.get
				// concat api data in here. 
				$http.get("public/gemsApi.json").success(function(data){
					console.log(data)
					$scope.products = data
				})
	}])
	.controller("PanelCtrl",function($scope){
		// initalise 
		// config
		$scope.tab = 1;
		$scope.selectTab = function (setTab){
			$scope.tab = setTab;
		}
		$scope.isSelected = function(checkTab){
			return $scope.tab === checkTab
		}
	})
	.controller("ReviewCtrl", function($scope){
		this.review = {}

		$scope.addReview = function(product){
			console.log(product)
			console.log("hi")
			console.log($scope.review)
			product.reviews.push(this.review)
			console.log(product)
			this.review = {}
		}
	})

	//foursquare api controller. 
	// pass in credidentials
	// try credentials on foursqaure first.