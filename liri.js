// 9. Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//     * `spotify-this-song`

//     * `movie-this`

//     * `do-what-it-says`



require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var userChoice = process.argv[2];
var userInputs = process.argv[3];

function showInfo (userChoice, userInputs){
switch (userchoice) {
    case "concert-this":
        showConcertInfo(userInputs);
        break;
    case  "spotify-this-song":
        showSpotifyInfo(userInputs);
        break;
    case "movie-this":
        showMovieInfo(userInputs);
        break;
    case "do-what-it-says":
        showwhatitsays(userInputs);
        break;

}}

showInfo(userChoice, userInputs);

// var artist = userInputs;
// var bandsqueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


// axios.get(bandsqueryUrl).then(
//     function(response) {
//         if (err) {
//             console.log("error");
//             return;
//         }
//         console.log(response.data);
//         console.log("Venue name: " + response.data.venue.name);
//         console.log("Venue location: " + response.data.venue.city);
//         console.log("Date of Event: " + response.data.venue.datetime);
//     })




// // `node liri.js spotify-this-song '<song name here>'`

// spotify.search({type: "track", query: ""}, function (err, data) {
//     if (err) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
//     console.log(data);
// })




// We then run the request with axios module on a URL with a JSON  (axios.get returns a promise)
var userInputs = process.argv.slice(2).join("+");
var queryUrl = "http://www.omdbapi.com/?t=" + userInputs + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
    function (response) {
        if (err) {
            console.log("error");
            return;
        }
        // Then we print out the imdbRating
        console.log("Title: " + response.data.Title);
        console.log("The movie's rating is: " + response.data.imdbRating);
        console.log("Year released: " + response.data.Year);
        console.log("Produced in: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    }
);

    