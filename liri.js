

require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");

var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var spotify = new Spotify(keys.spotify);

var fs = require("fs");

var command = process.argv[2];
var userInputs = process.argv[3];


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
            showwhatitsays(userInputs);
            break;
        default:
            console.log("Please choose a concert, song, or movie")

    }
}
userChoice(command, userInputs);


//  Bands in town
function showConcertInfo(userInputs) {
var bandsqueryUrl = "https://rest.bandsintown.com/artists/" + userInputs + "/events?app_id=codingbootcamp";

axios.get(bandsqueryUrl).then(
    function (response) {
        // if (err) {
        //     console.log("error");
        //     return;
        // }
        console.log(response.data);
        // console.log("Venue name: " + response.data.venue.name);
        // console.log("Venue location: " + response.data.venue.city);
        // console.log("Date of Event: " + response.data.datetime);
        // datatime = moment().format();
    })
}




// node liri.js spotify-this-song '<song name here>'`

function showSpotifyInfo (userInputs) {
    var userInputs = process.argv.slice(3).join("+");
    //  If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (userInputs === undefined) {
        userInputs = "The Sign by Ace of Base"
    }


    spotify.search({ type: "track", query: userInputs }, function (err, data) {
        // if (err) {
        //     console.log('Error occurred: ' + err);
        //     return;
        // }
        console.log(data.track);
        console.log(
            "Artist: " + data.track + "\n",
            "Song: " + data.track + "\n",
            "Preview: " + data.track + "\n",
            "Album: " + data.track + "\n",
        )
    })
}



    // `node liri.js movie-this '<movie name here>'`

var userInputs = process.argv.slice(2).join("+");
function showMovieInfo(userInputs) {
    if (userInputs === undefined || null) {
        userInputs = "Mr. Nobody"
    };

    var userInputs = process.argv.slice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + userInputs + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // if (err) {
            //     console.log("error");
            //     return;
            // }
            
            // console.log(response.data);
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

// node liri.js do -what - it - says`
function showwhatitsays(userInputs)
// fs.readFile("random.txt", "utf-8", function (err, data) {
//     if (err) {

//     }
// })




    // * Using the`fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    //     * It should run`spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

    //  * Edit the text in random.txt to test out the feature for movie - this and concert - this.




// why is  error undefined
// how do i log concert data?  "undefined"
// movie-this princess bride shows  bandsintown data
// movie-this does not default to mr nobody, "this is  loaded"
// do what is says....
// output the data to a.txt file called`log.txt`.
