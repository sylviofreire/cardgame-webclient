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
                  // console.log(data)
                  // console.log(status)
                   $rootScope.username = $scope.username
                   $location.path('/dashboard');
            })
                 .catch(function(err) {
                  console.log(err)
                 })
        };
    }

})();
