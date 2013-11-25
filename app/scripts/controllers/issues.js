'use strict';

angular.module('angularKiiApp')
  .controller('IssuesCtrl', function ($scope,kiiService) {

      console.log("fetch list");

		// Create the Issue object
		kiiService.fetchObjects()
			.then(
				function(resultSet){
					$scope.successMessage = 'Issues fetched :';
				        console.log($scope.successMessage);
				        console.log(resultSet);
					delete $scope.errorMessage;
				        $scope.issues = resultSet;
				}, function(error){
					$scope.errorMessage = error;
				}
			); 

  });
