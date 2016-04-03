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
        moveRequest($http, params);        
      }



        // var vm = this;

    //     $scope.works = [];
      //
    //     $scope.animationsEnabled = true;
      //
        // $http.get('data.json').success(function(data){
        //   $scope.works = data;
        // });
      //
    //     $scope.open = function (work) {
      //
    //      var modalInstance = $uibModal.open({
    //        animation: $scope.animationsEnabled,
    //        templateUrl: 'myModalContent.html',
    //        controller: 'modalCtrl',
    //        size: 'lg',
    //        resolve: {
    //          item: function () {
    //            return work;
    //          }
    //        }
    //      });
      //
    //      modalInstance.result.then(function (selectedItem) {
    //        $scope.selected = selectedItem;
    //      }, function () {
    //        $log.info('Modal dismissed at: ' + new Date());
    //      });
    //   };
      //
    //   $scope.toggleAnimation = function () {
    //     $scope.animationsEnabled = !$scope.animationsEnabled;
    //   };

    }

})();

function loadDashboard($http, $scope) {
  $http.get('http://localhost:8080/cardgame-1.0/api/status')
       .success(function(data){ 
          $scope.data = data;
  });

  $http.get('http://localhost:8080/cardgame-1.0/api/online')
       .success(function(data){ 
          $scope.onlinePlayers = data;
  });
}


function moveRequest($http, params) {
  $http.post('http://localhost:8080/cardgame-1.0/api/move', params)
       .success(function(data, status) {            
          
  });
}
