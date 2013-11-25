angular.module('kii.system').controller('HeaderController', ['$scope', 'Global','kiiService','$window', function ($scope, Global,kiiService, $window) {
    $scope.global = Global;
    $scope.isCollapsed = false;
}]);