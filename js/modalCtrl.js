'use strict';

(function() {

      angular.module('cgApp').controller('modalCtrl', ModalController);

      ModalController.$inject = ['$scope', '$uibModal', 'item'];

      function ModalController ($scope, $uibModalInstance, item){

        $scope.item = item;

        $scope.selected = {
          item: $scope.item
        };

        $scope.ok = function () {
          $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

      }

})();


