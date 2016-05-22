'use strict';

(function() {
    angular.module('cgApp').controller('dashboardCtrl', DashBoardController);
    DashBoardController.$inject = ['$scope', '$http', '$uibModal', '$log', '$interval', '$rootScope', '$location', '$localStorage', 'dataService'];
    let interval
    let loop
    var token
    function DashBoardController ($scope, $http, $uibModal, $log, $interval, $rootScope, $location, $localStorage, dataService) {
      token = dataService.getData();
      if(token == '' || typeof token == 'undefined' ){
        $location.path('/join');
        return;
      }

      $localStorage.token = token
      var vm = this
      $http.defaults.useXDomain = true
      $scope.works = []
      $scope.animationsEnabled = true

      interval = $interval
      $http.defaults.headers.post.Authorization = "Bearer " + token;
      $scope.init = function () {
        reloadData($http, $scope, $rootScope.username);
        loop = $interval(function() {
            reloadData($http, $scope, $rootScope.username);
        }, 1000)

      };

      $scope.move = function(username, indice) {
        let params = {
          username: username,
          position: indice
        }
        if($scope.player1.timeToPlay && $scope.player1.username === username) {
            moveRequest($http, $scope, params);
        }
      }
      $scope.open = function (player1, card) {
       var modalInstance = $uibModal.open({
         animation: $scope.animationsEnabled,
         templateUrl: 'templates/cardQuestion.html',
         controller: 'modalCtrl',
         size: 'lg',
         resolve: {
           data: function () {
              return {
                player1: player1,
                card: card,
                play: function($scope, params) {
                  playRequest($http, $scope, params)
                },
                reload: function($scope, username) {
                  reloadData($http, $scope, username)
                }
              }
           }
         }
        })
      }
      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      }

    }
    angular.module('cgApp').controller('modalCtrl', ModalController);
    ModalController.$inject = ['$scope', '$uibModalInstance', 'data'];
    function ModalController ($scope, $uibModalInstance, data){
      $scope.cardQuestionText = data.card.subject.question.text
      $scope.cardPossibleAnswers = data.card.subject.question.possibleAnswers
      $scope.button = "confirmar";

      $scope.confirmar = function (answer) {
        let params = {
          username: data.player1.username,
          answerID: $scope.answer
        }
        data.play($scope, params)
      }

      $scope.atacar = function () {
        data.reload($scope, data.player1.username)
        $uibModalInstance.dismiss('cancel');
      }
    }



  function moveRequest($http, $scope, params) {
    $http.post('http://cardgame-gcaraciolo.rhcloud.com/api/move', params)
         .success(function(data, status) {
           reloadData($http, $scope, params.username)
    });
  }

  function playRequest($http, $scope, params) {
    $http.post('http://cardgame-gcaraciolo.rhcloud.com/api/play', params)
     .success(function(data, status) {
        $scope.response = data.msg;
        $scope.button = "atacar";
    });
  }

  function leaveGame($http, $scope, params) {
    $http.post('http://cardgame-gcaraciolo.rhcloud.com/api/leave', params)
     .success(function(data, status) {
        console.log('saiu')
    });
  }

  function reloadData($http, $scope, username) {
    let params = {
      username: username
    }
    $http.post('http://cardgame-gcaraciolo.rhcloud.com/api/status', params)
      .success(function(data, status) {
         console.log(data);
         $scope.player1 = data.msg.player1;
         $scope.player2 = data.msg.player2;
         $scope.onlinePlayers = data.msg.audience;
    })

  }

})();
