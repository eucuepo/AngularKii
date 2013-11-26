'use strict';

angular.module('angularKiiApp')
  .controller('AddCtrl', function ($scope,kiiService, $timeout) {

    $scope.createIssue = function(){
		var issue = {
			title : $scope.issue.title,
			description : $scope.issue.description
		}

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
