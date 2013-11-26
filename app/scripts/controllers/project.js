'use strict';

angular.module('angularKiiApp')
  .controller('ProjectCtrl', function ($scope,kiiService) {

    $scope.createProject = function(project){
    	var toInsert = angular.copy(project);
		// Create the Project object
		kiiService.createObjectInBucket(toInsert,"projects")
			.then(
				function(project){
					$scope.projects.push(project);
				}, function(error){
					$scope.errorMessage = error;
				}
			);
	};

	$scope.listProjects = function(){
    	// list all projects
    	kiiService.getAllObjectsFromBucket("projects")
    		.then(
				function(projects){
					$scope.projects = projects;
				}, function(error){
					$scope.errorMessage = error;
				}
			);
    };

    $scope.deleteProject = function(project,index){
    	kiiService.deleteObjectFromBucket(project,"projects")
    		.then(
				function(projects){
					//remove from projects array
					$scope.projects.splice(index,1);
				}, function(error){
					$scope.errorMessage = error;
				}
			);
    };

    $scope.updateProject = function(project,index){
    	//manual property set
    	
    	kiiService.updateObject(project)
    		.then(
				function(project){
					delete $scope.selectedProject;
					delete $scope.editProject;
				}, function(error){
					$scope.errorMessage = error;
				}
			);
    };

    $scope.setEditProject = function(project,index){
    	$scope.selectedProject = project;
    	$scope.editProject = index;
    }

    $scope.listProjects();


  });