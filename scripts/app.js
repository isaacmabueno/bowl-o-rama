$(document).ready(function(){
  $('.main').fadeIn(5000);
});
//Initializing the app
var app = angular.module('bowlsToTheWall', []);
var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');
// setting up a controller
app.controller("bowlingController", ['$scope', '$timeout', function($scope, $timeout) {
//anything with $scope can be accessed in the HTML page. This is the purpose of SCOPE
  $scope.showLoginPage=true;
  $scope.showSignUpPage=false;
  $scope.showDashboard=false;
  $scope.createNewBowlerPage=false;
  $scope.viewAllBowlersPage=false;
  $scope.viewAllLeaguesPage=false;
  $scope.getSpecificLeaguePage=false;
  $scope.getSpecificBowlerPage=false;
  // $scope.winningBowlerDrawn = false;
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

        $timeout(function() {
          $scope.showSignUpPage=false;
          $scope.showLoginPage=false;
          $scope.showDashboard=true;
          $scope.createNewBowlerPage=true;
        }, 100)
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

        $timeout(function() {
          $scope.showDashboard=false;
          $scope.viewAllBowlersPage=true;
          $scope.bowlers=bowlers;
        }, 100)
      },
      error: function(xhr) {
        console.log(JSON.parse(xhr.responseText));
      }
    });
  };
  $scope.getSpecificBowler = function(bowlerId) {
    client.getBowler({
      bowlerId: bowlerId,
      success: function(bowler) {
        console.log(bowler);

        $timeout(function() {
          $scope.showDashboard=false;
          $scope.viewAllBowlersPage=false;
          $scope.viewAllLeaguesPage=false;
          $scope.getSpecificLeaguePage=true;
          $scope.bowler=bowler;
        }, 100)
      },
      error: function(xhr) {
        console.log(JSON.parse(xhr.responseText));
      }
    });
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

    $timeout(function() {
      $scope.showDashboard=false;
      $scope.viewAllBowlersPage=false;
      $scope.viewAllLeaguesPage=true;
      $scope.leagues=leagues;
    }, 100)
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
  // callback function or success function-- this is gaurenteed to run sycronously (in order)
  success: function(league) {
    console.log(league);
    $timeout(function() {
      $scope.league=league;
      $scope.showDashboard=false;
      $scope.viewAllBowlersPage=false;
      $scope.viewAllLeaguesPage=false;
      $scope.getSpecificLeaguePage=true;
      getAllBowlersInLeague(leagueId);
      getAllLotteriesInLeague(leagueId);
    }, 100)
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
// dont need a return, just set the scope variable inside of this function
        $timeout(function() {
          $scope.listOfBowlers = bowlers;
        }, 100)
        console.log($scope.listOfBowlers);
      },
      error: function(xhr)  {
        console.log(JSON.parse(xhr.responseText));
      }
    });
};
  function getAllLotteriesInLeague(leagueId) {
    client.getLotteries({
      leagueId: leagueId,
      success: function(lotteries) {
        console.log(lotteries);
        $timeout(function() {
          $scope.listOfLotteries = lotteries;
          $scope.latestLottery = $scope.listOfLotteries[$scope.listOfLotteries.length - 1];
        }, 100)
      },
      error: function(xhr)  {
        console.log(JSON.parse(xhr.responseText));
      }
    });
  };
  $scope.drawingTheWinner = function(leagueId, lotteryId) {
  client.drawWinner({
    leagueId: leagueId,
    lotteryId: lotteryId,
    success: function(roll) {
      $timeout(function() {
        $scope.listOfLotteries = lotteries;
        if ($scope.jackpotHistory) {
          $scope.jackpotHistory=false;
        }
        else {
          $scope.jackpotHistory=true;
        }
      }, 100)
      getWinningBowlerName(roll.bowler_id);
      console.log(roll);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
};

function getWinningBowlerName(bowlerId) {
  client.getBowler({
    bowlerId: bowlerId,
    success: function(bowler) {
      console.log(bowler);
      $timeout(function() {
        $scope.winningBowler = bowler;
        $scope.winningBowlerDrawn = true;
      }, 1000)
    },
    error: function(xhr) {
      console.log(JSON.parse(xhr.responseText));
    }
  });
};

  $scope.addToLottery = function(bowlerId,lotteryId, leagueId) {
    client.purchaseTicket({
      bowlerId: bowlerId,
      leagueId: leagueId,
      lotteryId: lotteryId,
      success: function(ticket) {
        console.log(ticket);
        $timeout(function() {
          $scope.latestLottery.balance += parseInt(ticket.price);
        }, 1000)
      },
      error: function(xhr)  {
        console.log(JSON.parse(xhr.responseText));
      }
    });
  };
  $scope.recordRoll = function(result, leagueId, lotteryId) {
    client.updateRoll({
    leagueId: leagueId,
    lotteryId: lotteryId,
    pinCount: result,
    success: function(roll) {
      console.log(roll);
      $timeout(function() {
        $scope.latestLottery.balance = $scope.latestLottery.balance - parseInt(roll.payout);
      }, 1000)
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
  };
  $scope.viewHistory = function(leagueId) {
    client.getLotteries({
      leagueId: leagueId,
      success: function(lotteries) {
        console.log(lotteries);
        $timeout(function() {
          $scope.listOfLotteries = lotteries;
          if ($scope.jackpotHistory) {
            $scope.jackpotHistory=false;
          }
          else {
            $scope.jackpotHistory=true;
          }
        }, 100)
      },
      error: function(xhr)  {
        console.log(JSON.parse(xhr.responseText));
      }
    });
  }
  $scope.createAccount = function() {
  $scope.showSignUpPage=true;
  $scope.showLoginPage=false;
  };
  $scope.hasAccount = function() {
    $scope.showLoginPage=true;
    $scope.showSignUpPage=false;
  };
}]);
