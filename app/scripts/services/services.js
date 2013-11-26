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
		obj.set("point", object.point);
		obj.set("project", object.project);
		obj.set("status", object.status);
		obj.set("assign", object.assign);
		obj.set("dueDate", Date.parse(object.dueDate));
		obj.set("dueDateParsed", (new Date(object.dueDate)).toLocaleDateString());


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

	this.createUserObject = function (user) {
		var output = {},
	      deferred = $q.defer();

	    // create object
	    // Create an application scope bucket
		var appBucket = Kii.bucketWithName("AllUsers");

		// Create the object with key/value pairs
		var obj = appBucket.createObject();

		// iterate object properties
		obj.set("username", user.username);
		obj.set("email", user.email);
		obj.set("userid", user.userid);

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

	this.createGroup = function (groupName) {
		var output = {},
	      deferred = $q.defer();

		var group = KiiGroup.groupWithName(groupName);
		group.save({
		  success: function(savedGroup) {
		    // Get the reference URI.
		    deferred.resolve(savedGroup);
		  },
		  failure: function(theGroup, errorString) {
		     deferred.reject(errorString);
		  }
		});

		return deferred.promise;

	};

	this.deleteGroup = function (group) {
		var output = {},
	      deferred = $q.defer();

		group.delete({
		  success: function(deletedGroup) {
		    // Get the reference URI.
		    deferred.resolve(deletedGroup);
		  },
		  failure: function(theGroup, errorString) {
		     deferred.reject(errorString);
		  }
		});

		return deferred.promise;

	};

	this.getGroups = function (user) {
		var output = {},
	      deferred = $q.defer();

		// Get a list of groups in which the current user is a member
		user.memberOfGroups({
		  success: function(theUser, groupList) {
		  	deferred.resolve(groupList);
		  },
		  failure: function(theUser, anErrorString) {
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
			    deferred.reject(anErrorString);
			}
	    }

	    // Execute the query
	    bucket.executeQuery(all_query, queryCallbacks);
	    // alternatively, you can also do:
	    // bucket.executeQuery(null, queryCallbacks);



	    return deferred.promise;

	};

	this.getAllUsers = function () {

	    deferred = $q.defer();

	    // Prepare the target bucket to be queried
	    var bucket = Kii.bucketWithName("AllUsers");

	    // Build "all" query
	    var all_query = KiiQuery.queryWithClause();

	    // Define the callbacks
	    var queryCallbacks = {
			success: function(queryPerformed, resultSet, nextQuery) {
				var users = [];
				for(var i=0;i<resultSet.length;i++){
					users.push({
						username: resultSet[i].get('username'),
						email: resultSet[i].get('email'),
						userid: resultSet[i].get('userid')
					});
				}
			    deferred.resolve(users);
			},
			failure: function(queryPerformed, anErrorString) {
			    // do something with the error response
			    deferred.reject(errorString);
			}
	    }

	    // Execute the query
	    bucket.executeQuery(all_query, queryCallbacks);

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

	this.fetchProjectObjects = function (project) {

	    deferred = $q.defer();

	    // Prepare the target bucket to be queried
	    var bucket = Kii.bucketWithName("default");

	    var clause = KiiClause.equals("project", project);

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
