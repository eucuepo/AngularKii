angular.module('angularKiiApp').service('kiiService', function($q) {
    Kii.initializeWithSite("cc97cf6b", "a3d27fa02cf0e01e3baf4bda913c1705", KiiSite.JP);

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

		// iterate object properties

		obj.set("title", object.title);
		obj.set("description", object.description);

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

	this.deleteObject = function (object) {
	      deferred = $q.defer();


		object.delete({
		  success: function(successMessage) {
		    deferred.resolve(successMessage);
		  },
		  failure: function(errorString) {
		    deferred.reject(errorString);
		  }
		});

		return deferred.promise;

	};


	this.createObjectInBucket = function (object,bucket) {
		var output = {},
	      deferred = $q.defer();

	    // create object
	    // Create an application scope bucket
		var appBucket = Kii.bucketWithName(bucket);

		// Create the object with key/value pairs
		var obj = appBucket.createObject();

		// iterate object properties
		obj.set("object", object);

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

	this.deleteObjectFromBucket = function (object) {
		var output = {},
	      deferred = $q.defer();

		var object = KiiObject.objectWithURI(object.objectURI());

		// Delete the Object
		object.delete({
		  success: function(theDeletedObject) {
		    deferred.resolve(theDeletedObject);
		  },
		  failure: function(theDeletedObject, errorString) {
		    deferred.reject(errorString);
		  }
		});

		return deferred.promise;

	};

	this.updateObject = function (object) {
		var output = {},
	      deferred = $q.defer();

		object.saveAllFields({
		  success: function(theObject) {
		    deferred.resolve(theObject);
		  },
		  failure: function(theObject, errorString) {
		    deferred.reject(errorString);
		  }
		});

		return deferred.promise;

	};

	this.getAllObjectsFromBucket = function (bucket) {

	    deferred = $q.defer();

	    // Prepare the target bucket to be queried
	    var bucket = Kii.bucketWithName(bucket);

	    // Build "all" query
	    var all_query = KiiQuery.queryWithClause();

	    // Define the callbacks
	    var queryCallbacks = {
			success: function(queryPerformed, resultSet, nextQuery) {
			    deferred.resolve(resultSet);
			},
			failure: function(queryPerformed, anErrorString) {
			    // do something with the error response
			    deferred.reject(errorString);
			}
	    }

	    // Execute the query
	    bucket.executeQuery(all_query, queryCallbacks);
	    // alternatively, you can also do:
	    // bucket.executeQuery(null, queryCallbacks);



	    return deferred.promise;

	};

	this.fetchObjects = function () {

	    deferred = $q.defer();

	    // Prepare the target bucket to be queried
	    var bucket = Kii.bucketWithName("default");

	    // Build "all" query
	    var all_query = KiiQuery.queryWithClause();

	    // Define the callbacks
	    var queryCallbacks = {
			success: function(queryPerformed, resultSet, nextQuery) {
			    deferred.resolve(resultSet);
			},
			failure: function(queryPerformed, anErrorString) {
			    // do something with the error response
			    deferred.reject(errorString);
			}
	    }

	    // Execute the query
	    bucket.executeQuery(all_query, queryCallbacks);
	    // alternatively, you can also do:
	    // bucket.executeQuery(null, queryCallbacks);



	    return deferred.promise;

	};


	this.fetchObject = function (uuid) {

	    deferred = $q.defer();

	    // Prepare the target bucket to be queried
	    var bucket = Kii.bucketWithName("default");

	    var clause = KiiClause.equals("uuid", uuid);

	    // Build query
	    var query = KiiQuery.queryWithClause(clause);

	    // Define the callbacks
	    var queryCallbacks = {
		success: function(queryPerformed, resultSet, nextQuery) {
		    deferred.resolve(resultSet);
		},
		failure: function(queryPerformed, anErrorString) {
		    // do something with the error response
		    deferred.reject(errorString);
		}
	    }

	    // Execute the query
	    bucket.executeQuery(query, queryCallbacks);
	    // alternatively, you can also do:
	    // bucket.executeQuery(null, queryCallbacks);



	    return deferred.promise;

	};

});
