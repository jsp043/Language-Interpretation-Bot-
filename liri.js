var keys = require('./keys.js');
var request = require('request');
// var twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');

function twitter(){
	var twitterKeys = require('./keys.js').twitterKeys;
	var Twitter = require('twitter');
	var assignKey = new Twitter ({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
  });
	var params = {screen_name: 'jennayblock'};
	console.log(params);
	assignKey.get('statuses/user_timeline', params, function(error, tweets) {
		    if (error) {
      console.log(error);
    }
    else {
      // for loop to run through the length of my account's tweets
      console.log("\nTweet\n");
      for(i=0; i< tweets.length; i++){
        // adds a number and dot before to show order
        console.log("@jennayblock: " + tweets[i].text + " Created At: " + date.substring(0, 19));
      }
    }
  });
}

function spotifySearch(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var spotifyData = data.tracks.items[i];
        //artist
        console.log("Artist: " + spotifyData.artists[0].name);
        //song name
        console.log("Song: " + spotifyData.name);
        //spotify link
        console.log("Preview URL: " + spotifyData.preview_url);
        //album name
        console.log("Album: " + spotifyData.album.name);
        console.log("----------------");
        
        //adds text to log.txt
        fs.appendFile('log.txt', spotifyData.artists[0].name);
        fs.appendFile('log.txt', spotifyData.name);
        fs.appendFile('log.txt', spotifyData.preview_url);
        fs.appendFile('log.txt', spotifyData.album.name);
        fs.appendFile('log.txt', "----------------");
      }
    } else{
      console.log('Error');
    }
  });
}

function chosenMovie(userMovieInput){
  request(`http://www.omdbapi.com/?t=${userMovieInput}&y=&i=&plot=short&tomatoes=true&r=json`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parseUserInput = JSON.parse(body)
        var movieOutput = "Movie Title: " + parseUserInput.Title + "\n" +
          "Year Release: " + parseUserInput.Year + "\n" +
          "Country Produced: " + parseUserInput.Country + "\n" +
          "Language: " + parseUserInput.Language + "\n" +
          "Plot: " + parseUserInput.Plot + "\n" +
          "Actors: " + parseUserInput.Actors + "\n" +
          "IMBD Rating: " + parseUserInput.imdbRating + "\n" +
          "Rotten Tomatoes Rating: " + parseUserInput.tomatoRating + "\n" +
          "Rotten Tomatoes URL: " + parseUserInput.tomatoURL + "\n";
        // console.log(movieOutput);
        logText(movieOutput);
    }
    // Reenable the start prompt until the user exits the app.
    start();
  });
}

//FS Node Package

function randomChoice(){
  fs.readFile("random.txt", 'utf8', function(error, data) {       
    // If the code experiences any errors it will log the error to the console. 
      if(error) {
          return console.log(error);
      }else{
        var dataArr = data.split(",");
        var userFirstInput = dataArr[0];
        var userSecondInput = dataArr[1];

        switch(userFirstInput){
          case "spotify-this-song":
            chosenSpotify(userSecondInput);
            break;
        }
      }
  });     
}

// Appends all the file to log.txt
function logText(data){
  console.log(data);
  fs.appendFile("./log.txt", data + "\n", function(err){
    if(err){
      console.log('Error occurred: ' + err);
    }
  });
}

function start(){
  inquirer.prompt([
    {
      type: "list",
      name: "selectOption",
      message: "Hello! I am Liri! Which option would you like to select?",
      choices: ["My Twitter", "Spotify", "Movies", "Done"] 
    }
  ]).then(function(user) {
    if (user.selectOption == "My Twitter"){
      myTweets();
    }else if (user.selectOption == "Spotify"){
      inquirer.prompt([
        {
          type: "input",
          name: "songChoice",
          message: "What song would you like to check out?",
        }
      ]).then(function(userSpotInput){
        if (userSpotifyInput.songChoice == ""){
          chosenSpotify("Lemonade")
        }else{
          chosenSpotify(userSpotifyInput.songChoice);  
        }
      })
    }else if (user.whatToPick == "Movies"){
      inquirer.prompt([
        {
          type: "input",
          name: "movieChoice",
          message: "Which movie should we search?",
        }
      ]).then(function(userMovieInput){
        if (userMovieInput.movieChoice == ""){
          chosenMovie("Mr. Nobody")
        }else{
          chosenMovie(userMovieInput.movieChoice);
        }

      })    
    }else if (user.whatToPick == "Random"){
      randomChoice();   
    }else if (user.whatToPick == "Done"){
      inquirer.prompt([
        {
          type: "confirm",
          name: "doneLiri",
          message: "Are you sure you are done?",
        }
      ]).then(function(leave){
        if (leave.doneLiri == true){
          console.log("Bye!");
        }else{
          start();
        }

      })  
    }
  })
}

start();