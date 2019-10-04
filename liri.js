

require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");

var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format("MMM Do YY");
var spotify = new Spotify(keys.spotify);



var command = process.argv[2];
var userInputs = process.argv.slice(3).join("+");


//switch commands 
function userChoice(command, userInputs) {
    switch (command) {
        case "concert-this":
            showConcertInfo(userInputs);
            break;
        case "spotify-this-song":
            showSpotifyInfo(userInputs);
            break;
        case "movie-this":
            showMovieInfo(userInputs);
            break;
        case "do-what-it-says":
            showWhatItSays();
            break;
        default:
            console.log("Please choose a concert, song, or movie")

    }
}
userChoice(command, userInputs);


//  Bands in town function
function showConcertInfo(userInputs) {

    var bandsqueryUrl = "https://rest.bandsintown.com/artists/" + userInputs + "/events?app_id=codingbootcamp";
    //axios call to bands in town API
    axios.get(bandsqueryUrl).then(function (response) {
        // print specific info to the console
         
        console.log("Venue name: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city);
        var time = moment(response.data[0].datetime).format("MMM Do YY, h:mm:ss a");
        console.log("Date of Event: " + time);
        
    })
        .catch(
            function (err) {
                console.log("Error occurred: " + err);
            }
        )
};




// node liri.js spotify-this-song '<song name here>'`

function showSpotifyInfo(userInputs) {
    //  If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (userInputs === "") {
        userInputs = "The Sign Ace of Base"
    }

    //search spotify-node API for artist/music input
    spotify.search({ type: "track", query: userInputs }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // console.log(data.tracks.items[0]); to gather data
        //printing spotify info to the console
        console.log(
            "Artist: " + data.tracks.items[0].album.artists[0].name + "\n",
            "Song: " + data.tracks.items[0].name + "\n",
            "Preview: " + data.tracks.items[0].album.external_urls.spotify + "\n",
            "Album: " + data.tracks.items[0].album.name + "\n",
        )
    })
}



// `node liri.js movie-this '<movie name here>'`


function showMovieInfo(userInputs) {
    //if no userinput given for movie info, defaults to movie Mr. Nobody 
    if (userInputs === "") {
        userInputs = "Mr. Nobody"
    };
    console.log(userInputs);
    var queryUrl = "http://www.omdbapi.com/?t=" + userInputs + "&y=&plot=short&apikey=trilogy";
    //axios call to OMDB for movie info
    axios.get(queryUrl).then(
        function (response, err) {
            if (err) {
                console.log("error");
                return;
            }

            // console.log(response);
            // Prints out movie info
            console.log("Title: " + response.data.Title);
            console.log("The movie's rating is: " + response.data.imdbRating);
            console.log("Year released: " + response.data.Year);
            console.log("Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
};


// do-what-it-says


function showWhatItSays() {
// * Using the`fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log("Error occurred" + err);
        }
        //split the array at ","
        var dataArr = data.split(",");
        console.log("dataArr", dataArr);
        //
        if (dataArr.length === 2) {
            console.log("this one is running")
            userChoice(dataArr[0], dataArr[1]);

        }
        else if (dataArr.length === 1) {
            userChoice(dataArr[0]);
        }

    });
}








    

   




