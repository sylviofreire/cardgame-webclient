(function () {
    'use strict';

    angular.module('cgApp')
    .controller('joinController', JoinController);

    JoinController.$inject = ['$scope', '$http', '$location', '$rootScope'];
    function JoinController($scope, $http, $location, $rootScope) {

         $scope.login = function() {

            let params = {
              username: $scope.username
            }

            $http.post('http://cardgame-gcaraciolo.rhcloud.com/api/join', params)
                 .success(function(data, status) {
                   $rootScope.username = $scope.username
                   $location.path('/dashboard');
            });
        };
    }

})();
