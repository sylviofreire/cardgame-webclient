'use strict';

(function() {
    angular.module('cgApp').controller('dashboardCtrl', DashBoardController);
    
    DashBoardController.$inject = ['$scope', '$http', '$uibModal', '$log'];
    function DashBoardController ($scope, $http, $uibModal, $log) {
      $http.defaults.useXDomain = true;      

      $scope.init = function () {
        loadDashboard($http, $scope);
      };

      $scope.move = function(username, indice) {        
        let params = {
          username: username,
          position: indice
        }
        moveRequest($http, $scope, params);        
      }


      var vm = this;

      $scope.works = [];
    
      $scope.animationsEnabled = true;
          
      $scope.open = function (work) {
    
       var modalInstance = $uibModal.open({
         animation: $scope.animationsEnabled,
         templateUrl: 'templates/cardQuestion.html',
         controller: 'modalCtrl',
         size: 'lg',
         resolve: {
           item: function () {
             return work;
           }
         }
        });
    
        modalInstance.result.then(function (selectedItem) {
         $scope.selected = selectedItem;
        }, function () {
         $log.info('Modal dismissed at: ' + new Date());
        });
      };
      
      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };

    }

})();

function loadDashboard($http, $scope) {
  $http.get('http://localhost:8080/cardgame-1.0/api/status')
       .success(function(data){ 
          reloadData($scope, data)
  });
}


function moveRequest($http, $scope, params) {
  $http.post('http://localhost:8080/cardgame-1.0/api/move', params)
       .success(function(data, status) {            
          reloadData($scope, data)
  });
}

function reloadData($scope, data) {
    $scope.player1 = data.player1;
    $scope.player2 = data.player2;
    $scope.onlinePlayers = data.audience;
}
