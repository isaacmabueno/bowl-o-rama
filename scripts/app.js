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
  $scope.getSpecificBowler = function() {

  }
  
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
  //placing league in this function passes the league id back because I threw it in the paramaters in the HTML file
  $scope.getSpecificLeague = function(leagueId) {
    client.getLeague({
  leagueId: leagueId,
  success: function(league) {
    console.log(league);
    $scope.showDashboard=false;
    $scope.viewAllBowlersPage=false;
    $scope.viewAllLeaguesPage=false;
    $scope.getSpecificLeaguePage=true;
    $scope.league=league;
    // $scope.listofbowlers = getAllBowlersInLeague()
  },
  error: function(xhr)  {
    console.log(JSON.parse(xhr.responseText));
  }
});
  };

  $scope.joinLeague = function(bowlerId, leagueId) {
    client.joinLeague({
    bowlerId: bowlerId,
    leagueId: leagueId,
    success: function(bowlers) {
      console.log(bowlers);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
};
//make sure the NG models and clicks are in HTML and syncing that up with my APP.JS
// figure out when youre going to call this function
  function getAllBowlersInLeague(leagueId) {
  client.getBowlers({
    leagueId: leagueId,
    success: function(bowlers) {
      console.log(bowlers);
      return bowlers;
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
