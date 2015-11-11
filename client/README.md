# bowling-api-client

Integrates into the [progressive lottery programming challenge API](https://github.com/BLC/bowling-api) using jquery.

## Installation

The easiest way to use this library in your project is to include it as a git submodule and load jQuery and the library in your `index.html`:

```bash
  git submodule add git@github.com:BLC/bowling-api-client.git ./client
```

```html
  <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  <script src='client/lib/client.js'></script>
```

## Usage

Create an instance of `BowlingApiClient`:

```javascript
  var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');
```

Then use it:

### Users

*Create a new user*

Note that this will create a default league with some bowlers automatically.

Also note that this is a very simple example API with zero expectation of security.

```javascript
  client.createUser({
    email: 'test1@example.com',
    password: 'password',
    success: function(user) {
      console.log(user);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Log in*

```javascript
  client.loginUser({
    email: 'test1@example.com',
    password: 'password',
    success: function(user) {
      console.log(user);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

### Bowlers

*Create a new bowler*

```javascript
  client.createBowler ({
    name: 'Billy Bowler',
    success: function(bowler) {
      console.log(bowler);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Get all bowlers*

```javascript
  client.getBowlers({
    success: function(bowlers) {
      console.log(bowlers);
    },
    error: function(xhr) {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Get a specific bowler*

```javascript
  client.getBowler({
    bowlerId: 1,
    success: function(bowler) {
      console.log(bowler);
    },
    error: function(xhr) {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

### Leagues

*Create a new league*

```javascript
  client.createLeague({
    name: 'The Cats',
    success: function(league) {
      console.log(league);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Get all leagues*

```javascript
  client.getLeagues({
    success: function(leagues) {
      console.log(leagues);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Get a specific league*

```javascript
  client.getLeague({
    leagueId: 1,
    success: function(league) {
      console.log(league);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Add a bowler to a league*

```javascript
  client.joinLeague({
    bowlerId: 1,
    leagueId: 1,
    success: function(bowlers) {
      console.log(bowlers);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Get all bowlers in a league*

```javascript
  client.getBowlers({
    leagueId: 1,
    success: function(bowlers) {
      console.log(bowlers);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

### Lotteries

*Get all lotteries for a league*

```javascript
  client.getLotteries({
    leagueId: 1,
    success: function(lotteries) {
      console.log(lotteries);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Get a specific lottery*

```javascript
  client.getLottery({
    leagueId: 1,
    lotteryId: 1,
    success: function(lotteries) {
      console.log(lotteries);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Purchase a ticket for a bowler for a lottery*

```javascript
  client.purchaseTicket({
    bowlerId: 1,
    leagueId: 1,
    lotteryId: 1,
    success: function(ticket) {
      console.log(ticket);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Get all tickets for a lottery*

```javascript
  client.getTickets({
    leagueId: 1,
    lotteryId: 1,
    success: function(lotteries) {
      console.log(lotteries);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Draw a winner for a lottery*

```javascript
  client.drawWinner({
    leagueId: 1,
    lotteryId: 1,
    success: function(roll) {
      console.log(roll);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```

*Record the winning bowler's roll*

```javascript
  client.updateRoll({
    leagueId: 1,
    lotteryId: 1,
    pinCount: 7,
    success: function(roll) {
      console.log(roll);
    },
    error: function(xhr)  {
      console.log(JSON.parse(xhr.responseText));
    }
  });
```
