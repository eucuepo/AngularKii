'use strict';

angular.module('angularKiiApp')
  .controller('MainCtrl', function ($scope,kiiService) {

    $scope.insertUser = function(username,password){
		// Create the KiiUser object
		var user = kiiService.KiiUser.userWithUsername(username, password);
		console.log(user);

		// Register the user, defining callbacks for when the process completes
		user.register({
		  // Called on successful registration
		  success: function(theUser) {
		    // Print some info to the log
		    console.log("User registered!");
		    console.log(theUser);
		  },
		  // Called on a failed registration
		  failure: function(theUser, errorString) {
		    // Print some info to the log
		    console.log("Error registering: " + errorString);
		  }
		});
    };

  });
