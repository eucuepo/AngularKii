'use strict';

angular.module('angularKiiApp')
  .controller('AuthCtrl', function ($scope,kiiService, $window, Global, $location) {

  	$scope.global = Global;
  	// Legacy
    $scope.insertUserLegacy = function(user){
		// Create the KiiUser object
		var user = kiiService.KiiUser.userWithEmailAddressAndUsername(user.emailAddress,user.username, user.password);

		// Register the user, defining callbacks for when the process completes
		user.register({
		  // Called on successful registration
		  success: function(theUser) {
		  	$scope.$apply(function (){
		  		$scope.infoMessage = "User registered, please check your email to complete activation.";
		  	});
		  },
		  // Called on a failed registration
		  failure: function(theUser, errorString) {
		  	$scope.$apply(function (){
			    $scope.errorMessage = errorString;
		    });
		  }
		});
    };

    $scope.insertUser = function(user){
		// Create the KiiUser object
		kiiService.insertUserWithEmailAddressAndUsername(
			user.emailAddress,user.username, user.password)
			.then(
				function(insertedUser){
					// insert the user on AllUsers bucket
					var toInsert = {
						username: user.username,
						email: user.emailAddress,
						userid: insertedUser.objectURI()
					}
					kiiService.createObjectInBucket(toInsert,'AllUsers')
						.then(
							function(user){
								console.log(user);
								$scope.infoMessage = 'User registered, please check '+insertedUser.getEmailAddress()+' to complete activation.';
							}, function(error){
								console.log(error);
								$scope.errorMessage = error;
								//TODO delete user
							}
						);
				}, function(error){
					$scope.errorMessage = error;
				}
			); 
	};

	$scope.login = function(user){
		$scope.global = Global;
    	// Authenticate the user
		kiiService.authenticate(user.username, user.password)
			.then(
				function(user){
					console.log(user);
					Global.user = user;
					Global.authenticated = !! user;
					$location.path('welcome');
				}, function(error){
					console.log(error);
					$scope.errorMessage = error;
				}
			);
	};

	$scope.logout = function(){
    	// deauthenticate the user
		delete Global.user;
		delete Global.authenticate;
		delete $scope.global;
		$location.path('/');
	};

	$scope.selectTab = function (number){
    	Global.selectedTab = number;
    };
});