$(document).ready(function(){
  $('.main').fadeIn(5000);
});
//Initializing the app
var app = angular.module('bowlsToTheWall', []);
var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');
// setting up a controller
app.controller("bowlingController", ['$scope', function($scope) {
//anything with $scope can be accessed in the HTML page. This is the purpose of SCOPE
  $scope.showLoginPage=true;
  $scope.showSignUpPage=false;
  $scope.showDashboard=false;
  $scope.createNewBowlerPage=false;
  $scope.viewAllBowlersPage=false;
  $scope.viewAllLeaguesPage=false;
  $scope.loginEmail="";
  $scope.loginPassword="";
  $scope.signUpEmail="";
  $scope.signUpPassword="";
  $scope.createNewBowlerName="";
  // access to these variables inside the $scope function. I can access the API in this function
  $scope.loginSubmit = function() {
    client.loginUser({
      email: $scope.loginEmail,
      password: $scope.loginPassword,
      success: function(user) {
        //when they login successfully with the right credentials they get a dashboard page
        console.log(user);
        $scope.showSignUpPage=false;
        $scope.showLoginPage=false;
        $scope.showDashboard=true;
        $scope.createNewBowlerPage=true;
      },
      error: function(xhr)  {
        console.log(JSON.parse(xhr.responseText));
      }
    });
  };
  $scope.signUpSubmit = function() {
    client.createUser({
      email: $scope.signUpEmail,
      password: $scope.signUpPassword,
      success: function(user) {
        console.log(user);
      },
      error: function(xhr)  {
        console.log(JSON.parse(xhr.responseText));
      }
    });
  };
  $scope.createNewBowler = function() {
    client.createBowler ({
      name: $scope.createNewBowlerName,
      success: function(bowler) {
        console.log(bowler);
      },
      error: function(xhr)  {
        console.log(JSON.parse(xhr.responseText));
      }
    });
  };
  $scope.viewAllBowlers = function() {
    client.getBowlers({
      success: function(bowlers) {
        console.log(bowlers);
        $scope.showDashboard=false;
        $scope.viewAllBowlersPage=true;
        $scope.bowlers=bowlers;
      },
      error: function(xhr) {
        console.log(JSON.parse(xhr.responseText));
      }
    });
  };
  $scope.createNewLeague = function() {
    client.createLeague({
  name: $scope.createNewLeagueName,
  success: function(league) {
    console.log(league);
  },
  error: function(xhr)  {
    console.log(JSON.parse(xhr.responseText));
  }
});
  }
  $scope.viewAllLeagues = function() {
    client.getLeagues({
  success: function(leagues) {
    console.log(leagues);
    $scope.showDashboard=false;
    $scope.viewAllBowlersPage=false;
    $scope.viewAllLeaguesPage=true;
    $scope.leagues=leagues;
  },
  error: function(xhr)  {
    console.log(JSON.parse(xhr.responseText));
  }
});
  };
  $scope.createAccount = function() {
  $scope.showSignUpPage=true;
  $scope.showLoginPage=false;
  };
  $scope.hasAccount = function() {
    $scope.showLoginPage=true;
    $scope.showSignUpPage=false;
  };
}]);
