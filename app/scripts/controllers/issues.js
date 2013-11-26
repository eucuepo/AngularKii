'use strict';

angular.module('angularKiiApp')
  .controller('IssuesCtrl', function ($scope,kiiService) {

    $scope.fetchIssues = function(uuid){
		kiiService.fetchObjects()
			.then(
				function(resultSet){
					$scope.successMessage = 'Issues fetched :';
				        console.log(resultSet);
					delete $scope.errorMessage;
				        $scope.issues = resultSet;
				}, function(error){
					$scope.errorMessage = error;
				}
			); 
    };

      $scope.fetchIssues();

      $scope.deleteIssue = function(issue){
	  issue.delete();
	  $scope.fetchIssues();
      };


  });
