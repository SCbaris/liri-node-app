require("dotenv").config(); // declaration of dotenv module.

var keys = require("./keys.js"); // calling keys of spotify, ombd anb bandsintown

var axios = require("axios"); // declaration of axios

var moment = require('moment'); // declaration of moment.js

var fs = require("fs");

var Spotify = require('node-spotify-api'); // decleration of node-spotify
 
var spotify = new Spotify(keys.spotify); // telling keys to spotify
 
var value=process.argv;

function spotifyThisSong(value){
    spotify.search({ type: 'track', query: value[3] }, function(err, data) { // simple request type
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for(var i = 0; i<5;i++){ // can scan till data.tracks.items.length but i don't want to show 60 result 
            console.log("");
            console.log("");
            //console.log(data.tracks);
            //console.log(data.tracks.items[0]);
            console.log("Artist : " + data.tracks.items[i].artists[0].name);
            console.log("Song Album Name : " + data.tracks.items[i].album.name);
            console.log("Song Name : " + data.tracks.items[i].name);
            console.log("Link of the Song : " + data.tracks.items[i].external_urls.spotify);
        }
    });
}

function movieThis(value){
    if(value[3]==undefined) value[3]="Mr. Nobody";
    var searchTerm="";
    if(value.length>4){
        for(var i=3;i<value.length;i++){
            if(i==3)searchTerm +=value[i];
            else searchTerm +=" " + value[i];
            //console.log(searchTerm);
        }
    }else{
        searchTerm=value[3];
        //console.log(searchTerm);
    };
    axios.get("http://www.omdbapi.com/?t="+ searchTerm +"&y=&plot=short&apikey=trilogy").then(
        function(response) {
            if(response.data.Title){
                var rottenTomatoesRating;
                console.log("Title of your movie : " + response.data.Title);
                console.log("Year the movie came out : " + response.data.Year);
                console.log("IMDB rating of your movie: " + response.data.imdbRating);
                for(let i=0;i<response.data.Ratings.length;i++){
                    if(response.data.Ratings[i].Source==="Rotten Tomatoes"){
                        rottenTomatoesRating=response.data.Ratings[i].Value;
                    }
                }
                if(rottenTomatoesRating) console.log("Rotten Tomatoes rating of your movie : " + rottenTomatoesRating);
                else console.log("Rotten Tomatoes didn't Rate your movie.");
                
                console.log("Your movie produced in : " + response.data.Country);
                console.log("Movie's language is : " + response.data.Language);
                console.log("");
                console.log(response.data.Plot);
                console.log("");
                console.log("these actors play in your Movie : " + response.data.Actors);
                console.log("");
            }else console.log("There is no movie result with your research.")
        }
    ).catch(function(error) {
        if(error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        }else if(error.request) {
            console.log(error.request);
        }else{
            console.log("Error", error.message);
        }
            console.log(error.config);
    });


}

function concerThis(value){
    var searchTerm="";
    if(value.length>4){
        for(var i=3;i<value.length;i++){
            if(i==3)searchTerm +=value[i];
            else searchTerm +=" " + value[i];
            //console.log(searchTerm);
        }
    }else{
        searchTerm=value[3];
        //console.log(searchTerm);
    };
    axios.get("https://rest.bandsintown.com/artists/"+ searchTerm + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log("");
            console.log("Your Artist is : " + searchTerm);
            console.log("");
            if(response.data.length!=0) {
                console.log("There are " + response.data.length + " concert coming.");
            }else {
                console.log("There is no concert of your artist's near soon.");
            }
            console.log("");

            if(response.data.length>=10) {
                console.log("Here! Nearest 10 concerts of " + searchTerm);
                for(var i=0; i<10 ; i++){
                    console.log("");
                    console.log("Concert Will demonstraded at : " + response.data[i].venue.name);
                    console.log("Concert venue latitude: " +response.data[i].venue.latitude + " and longitude: "+response.data[0].venue.longitude )
                    console.log("Date : " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                }
            }else if(response.data.length!=0) {
                console.log("Here! Nearest concert of "  + searchTerm)
                for(var i=0; i<response.data.length ; i++){
                    console.log("");
                    console.log("Concert Will demonstraded at : " + response.data[i].venue.name);
                    console.log("Concert venue latitude: " +response.data[i].venue.latitude + " and longitude: "+response.data[0].venue.longitude )
                    console.log("Date : " + moment(response.data[i].datetime).format('MM/DD/YYYY'))
                }
            }
            
        }
    ).catch(function(error) {
        if(error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        }else if(error.request) {
            console.log(error.request);
        }else{
            console.log("Error", error.message);
        }
            console.log(error.config);
    });




}

function logRecord(value){
    var searchTerm="";
    if(value.length>4){
        for(var i=3;i<value.length;i++){
            if(i==3)searchTerm +=value[i];
            else searchTerm +=" " + value[i];
            //console.log(searchTerm);
        }
    }else{
        searchTerm=value[3];
        //console.log(searchTerm);
    };
    fs.appendFile("log.txt" , "User log inn at " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " \n" +
    "Using " + value[2] + " command\n" + "Search " + searchTerm + " data\n\n" , function(err) {

        if (err) {
          return console.log(err);
        }
    });
}

logRecord(value);
if(value[2] && value[2]==="spotify-this-song" && value[3]){
    spotifyThisSong(value);
}else if(value[2]==="-help"){
    console.log ("")
    console.log ("Search Song from song name: \nnode liri.js spotify-this-song '<song name here>' ")
    console.log ("")
    console.log ("Search Concert from artist and band name : \nnode liri.js concert-this '<artist/band name here>'")
    console.log ("")
    console.log ("Search Movie : \nnode liri.js movie-this '<movie name here>'")
    console.log ("")
    console.log ("Taking value from random.txt and search liri command : \nnode liri.js do-what-it-says")
}else if(value[2] && value[2]==="movie-this"){
    movieThis(value);
}else if(value[2] && value[2]==="concert-this" && value[3]){
    concerThis(value);
}else if(value[2] && value[2]==="do-what-it-says"){
    fs.readFile("random.txt","utf8",function(error,data){
        if (error) {
            return console.log(error);
        }
        var splitArr = data.split(",");
        // We will then print the contents of data
        //console.log(data);
        //console.log(dataArr);
        console.log(splitArr);
        var dataArr=[" "," "];
        console.log(dataArr);
        splitArr.forEach(function(element) {
            dataArr.push(element);
          });
        console.log(dataArr[2]);
        spotifyThisSong(dataArr);
    })

}else {
    console.log("Enter Acceptable value.")
    console.log("For Help : \nnode liri.js -help")
}