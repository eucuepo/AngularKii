angular.module('angularKiiApp').service('kiiService', function($q) {
    Kii.initializeWithSite("ef54b60a", "35defaf317a42e0e314716f6ed7b71b5", KiiSite.US);

    // insertUserWithEmailAddressAndUsername
    this.insertUserWithEmailAddressAndUsername = function (email, username, password) {
	  var output = {},
	      deferred = $q.defer();

		var user = KiiUser.userWithEmailAddressAndUsername(email,username, password);

		// Register the user, defining callbacks for when the process completes
		user.register({
		  // Called on successful registration
		  success: function(theUser) {
		  	deferred.resolve(theUser);
		  },
		  // Called on a failed registration
		  failure: function(theUser, errorString) {
			deferred.reject(errorString);
		  }
		});

		return deferred.promise;
	};

	this.authenticate = function (username, password) {
		var output = {},
	      deferred = $q.defer();
		// Authenticate the user
		KiiUser.authenticate(username, password, {
		  	// Called on successful auth
			success: function(theUser) {
		  		deferred.resolve(theUser);
		  	},
		  	// Called on a failed auth
			failure: function(theUser, errorString) {
				deferred.reject(errorString);
			}
		});
		return deferred.promise;
	};

	this.createObject = function (object) {
		var output = {},
	      deferred = $q.defer();

	    // create object
	    // Create an application scope bucket named "mydata"
		var appBucket = Kii.bucketWithName("default");

		// Create the object with key/value pairs
		var obj = appBucket.createObject();

		obj.set("title", object.title);
		obj.set("description", object.title);

		// Save the object
		obj.save({
		  success: function(theObject) {
		    deferred.resolve(theObject);
		  },
		  failure: function(theObject, errorString) {
		    deferred.reject(errorString);
		  }
		});

		return deferred.promise;

	};

});