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

      $scope.deleteIssue = function(index, issue){
	  kiiService.deleteObject(issue)
			.then(
				function(successMessage){
					$scope.successMessage = successMessage;
				        console.log(successMessage);
				}, function(error){
					$scope.errorMessage = error;
				}
			);

	  $scope.issues.splice(index, 1);
      };

    $scope.createIssue = function(){
		var issue = {
			title : $scope.issue.title,
			description : $scope.issue.description,
		        point: $scope.issue.point,
		        status: 0,
		        dueDate: $scope.issue.dueDate,
		        assign: $scope.issue.assign
		}

	console.log("saving issue");
	console.log(issue);

		// Create the Issue object
		kiiService.createObject(issue)
			.then(
				function(user){
					$scope.successMessage = 'Issue created';
					delete $scope.errorMessage;
				}, function(error){
					$scope.errorMessage = error;
				}
			); 

	};

	//get users for the typeahead
	$scope.getUsers = function(){
		// Create the Issue object
		kiiService.getAllObjectsFromBucket("AllUsers")
			.then(
				function(users){
					$scope.users = users; 
				}, function(error){
					$scope.errorMessage = error;
				}
			); 
	};

	$scope.getUsers();


	// datepicker stuff
	$scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.showWeeks = true;
	  $scope.toggleWeeks = function () {
	    $scope.showWeeks = ! $scope.showWeeks;
	  };

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = ( $scope.minDate ) ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function() {
	    $timeout(function() {
	      $scope.opened = true;
	    });
	  };

	  $scope.dateOptions = {
	    'year-format': "'yy'",
	    'starting-day': 1
	  };

	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
	  $scope.format = $scope.formats[0];

  });
