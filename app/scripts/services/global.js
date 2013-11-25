angular.module('angularKiiApp').factory("Global", [function() {
    var _this = this;
    _this._data = {
        user: window.user,
        authenticated: !! window.user,
        selectedTab: 1
    };

    return _this._data;
}]);