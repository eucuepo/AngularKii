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

    $scope.dropSuccessHandler = function($event,index,array){
		//array.splice(index,1);
		console.log($event+' '+index+' '+array);
	};
	$scope.onDrop = function($event,$data,array){
		//array.push($data);
		console.log($event+' '+$data+' '+array);
	};

      //$scope.fetchIssues();

      $scope.issues = [
      	{
      		title: 'Issue 1',
      		status: 0,
      		point: 14,
      		description: 'issue description',
      		assign: 'URI',
      		dueDate: 412341234123412
      	},
      	{
      		title: 'Issue 2',
      		status: 1,
      		point: 17,
      		description: 'issue description',
      		assign: 'URI',
      		dueDate: 412341234123412
      	},
      	{
      		title: 'Issue 3',
      		status: 0,
      		point: 34,
      		description: 'issue description',
      		assign: 'URI',
      		dueDate: 412341234123412
      	},
      	{
      		title: 'Issue 4',
      		status: 0,
      		point: 22,
      		description: 'issue description',
      		assign: 'URI',
      		dueDate: 412341234123412
      	},
      	{
      		title: 'Issue 5',
      		status: 2,
      		point: 22,
      		description: 'issue description',
      		assign: 'URI',
      		dueDate: 412341234123412
      	}
      ]

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
