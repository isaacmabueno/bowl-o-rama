$(document).ready(function(){
  $('.main').fadeIn(5000);
});
//Initializing the app
var app = angular.module('bowlsToTheWall', []);
// setting up a controller
app.controller("bowlingController", function($scope) {
  $scope.x="balls to the wallzzzzzz"
});
