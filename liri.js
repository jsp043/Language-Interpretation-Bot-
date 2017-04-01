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