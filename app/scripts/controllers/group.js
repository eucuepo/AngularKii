'use strict';

angular.module('angularKiiApp')
  .controller('GroupCtrl',  function ($scope,kiiService, $location, Global) {

  	$scope.groups = [];
  	$scope.memberEnabled = false;

    $scope.createGroup = function(group){
		// Create the Project object
		kiiService.createGroup(group)
			.then(
				function(group){
					$scope.groups.push(group);
				}, function(error){
					$scope.errorMessage = error;
				}
			);
	};

	$scope.listGroups = function(){
    	// list all projects
    	kiiService.getGroups(Global.user)
    		.then(
				function(groups){
					$scope.groups = groups;
					$scope.getUsers();
				}, function(error){
					$scope.errorMessage = error;
				}
			);
    };

    $scope.deleteGroup = function(group,index){
    	kiiService.deleteGroup(group)
    		.then(
				function(group){
					//remove from projects array
					$scope.groups.splice(index,1);
				}, function(error){
					$scope.errorMessage = error;
				}
			);
    };

    $scope.getMembers = function(index){
	    $scope.groups[index].getMemberList({
		  success: function(theGroup, theMembers) {
		    $scope.$apply(function (){
		  		$scope.members = theMembers;
		  	});
		  },
		  failure: function(theGroup, errorString) {
		    console.log("Error retrieving group members: " + errorString);
		  }
		});
	};

    $scope.getUsers = function(){
		kiiService.getAllUsers()
			.then(
				function(users){
					$scope.users = users; 
				}, function(error){
					$scope.errorMessage = error;
				}
			); 
	};

    $scope.addMember = function(member){
		$scope.groups[$scope.selectedGroup].addUser(member);
		group.save({
		  success: function(theGroup) {
		    console.log("Group saved!");
		    console.log(theGroup);
		  },
		  failure: function(theGroup, errorString) {
		    console.log("Error saving group: " + errorString);
		  }
		});
    };

    $scope.deleteMember = function(member){
		$scope.groups[i].removeUser(member);
		$scope.groups[i].save({
		  success: function(theGroup) {
		    console.log("Group saved!");
		    console.log(theGroup);
		  },
		  failure: function(theGroup, errorString) {
		    console.log("Error saving group: " + errorString);
		  }
		});
    };

    $scope.toggleMember = function(index){
    	$scope.memberEnabled = !$scope.memberEnabled;
    	$scope.selectedGroup = index;
    }

    $scope.listGroups();
    

  }); 
