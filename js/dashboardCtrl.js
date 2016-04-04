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

      $scope.open = function (player, card) {

       var modalInstance = $uibModal.open({
         animation: $scope.animationsEnabled,
         templateUrl: 'templates/cardQuestion.html',
         controller: 'modalCtrl',
         size: 'lg',
         resolve: {
           data: function () {
              let d = { player: player, card: card };

              return d
           }
         }
        })

        modalInstance.result.then(function (selectedItem) {

        }, function () {

        })
      }

      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      }

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

function playRequest($http, $scope, params) {
  $http.post('http://localhost:8080/cardgame-1.0/api/play', params)
       .success(function(data, status) {
          reloadData($scope, data)
  });
}

function reloadData($scope, data) {
    $scope.player1 = data.player1;
    $scope.player2 = data.player2;
    $scope.onlinePlayers = data.audience;
}


angular.module('cgApp').controller('modalCtrl', ModalController);

ModalController.$inject = ['$scope', '$http', '$uibModal', 'data'];

function ModalController ($scope, $http, $uibModalInstance, data){

  $scope.cardQuestionText = data.card.subject.question.text
  $scope.cardPossibleAnswers = data.card.subject.question.possibleAnswers

  // $scope.ok = function () {
  //   $uibModalInstance.close($scope.selected.item);
  // };
  let id;

  $scope.confirmar = function (answer) {
    let params = {
      username: data.player.username,
      answerID: $scope.answer
    }

    playRequest($http, $scope, params)
  }
}
