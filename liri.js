require("dotenv").config(); // declaration of dotenv module.

var keys = require("./keys.js"); // calling keys of spotify, ombd anb bandsintown

var axios = require("axios"); // declaration of axios

var moment = require('moment'); // declaration of moment.js

var fs = require("fs");

var Spotify = require('node-spotify-api'); // decleration of node-spotify
 
var spotify = new Spotify(keys.spotify); // telling keys to spotify
 
var value=process.argv;

function spotifyThisSong(value){ // this function using node-spotify-api, search song from your keyworld and show results.
    spotify.search({ type: 'track', query: value[3] }, function(err, data) { // simple request type
        if (err) { // if error happend
            return console.log('Error occurred: ' + err);
        }
        for(var i = 0; i<5;i++){ // can scan till data.tracks.items.length but i don't want to show 60 result 
            console.log(""); // for good looking. I can change this with \n but this style looks more clear
            console.log("");
            //console.log(data.tracks);
            //console.log(data.tracks.items[0]);
            console.log("Artist : " + data.tracks.items[i].artists[0].name); // artist name
            console.log("Song Album Name : " + data.tracks.items[i].album.name); // album name
            console.log("Song Name : " + data.tracks.items[i].name); // sing name
            console.log("Link of the Song : " + data.tracks.items[i].external_urls.spotify); // spotify open link
        }
    });
}

function movieThis(value){ // this function using axios and getting datas from omdb. 
    if(value[3]==undefined) value[3]="Mr. Nobody"; // if user don't put value for search, code automaticly will search Mr. Nobody
    var searchTerm=""; // 37 to 46 is collecting multi words search datas. Merge the search value and make it ready to send axios.
    if(value.length>4){
        for(var i=3;i<value.length;i++){
            if(i==3)searchTerm +=value[i]; // if the first word is first, dont put and space before it.
            else searchTerm +=" " + value[i]; // if the word is not first word, put space.
            //console.log(searchTerm);
        }
    }else{
        searchTerm=value[3]; // if there is only one word search data, take it.
        //console.log(searchTerm);
    };
    axios.get("http://www.omdbapi.com/?t="+ searchTerm +"&y=&plot=short&apikey=trilogy").then( // standart axios get operation
        function(response) {
            if(response.data.Title){ // this means if there is a title, there is a movie. if there is no title, show error.
                var rottenTomatoesRating; // some movies don't have any rotten tomatoes rating. I checked it.
                console.log("Title of your movie : " + response.data.Title); // Movie title
                console.log("Year the movie came out : " + response.data.Year); // Movie year
                console.log("IMDB rating of your movie: " + response.data.imdbRating); // Movie IMDB rating
                for(let i=0;i<response.data.Ratings.length;i++){
                    if(response.data.Ratings[i].Source==="Rotten Tomatoes"){
                        rottenTomatoesRating=response.data.Ratings[i].Value; // taking rotten tomatoes value
                    }
                }
                if(rottenTomatoesRating) console.log("Rotten Tomatoes rating of your movie : " + rottenTomatoesRating); // showing rotten tomatoes rating
                else console.log("Rotten Tomatoes didn't Rate your movie."); // telling no result.
                
                console.log("Your movie produced in : " + response.data.Country); // Produced country
                console.log("Movie's language is : " + response.data.Language); // Language
                console.log("");
                console.log(response.data.Plot); // Short plot
                console.log("");
                console.log("these actors play in your Movie : " + response.data.Actors); // actors
                console.log("");
            }else console.log("There is no movie result with your research.") // error
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

function concerThis(value){ // this function using axios and getting datas from bandsintown.
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
            console.log("Your Artist is : " + searchTerm); // showing artist name
            console.log("");
            if(response.data.length!=0) { // if there is a concert, it shows how many concert are comming.
                console.log("There are " + response.data.length + " concert coming.");
            }else {
                console.log("There is no concert of your artist's near soon.");
            }
            console.log("");

            if(response.data.length>=10) { // showing 10 nearest concert.
                console.log("Here! Nearest 10 concerts of " + searchTerm);
                for(var i=0; i<10 ; i++){
                    console.log("");
                    console.log("Concert Will demonstraded at : " + response.data[i].venue.name);// showing vanue name
                    console.log("Concert venue latitude: " +response.data[i].venue.latitude + " and longitude: "+response.data[0].venue.longitude )// showing location name
                    console.log("Date : " + moment(response.data[i].datetime).format('MM/DD/YYYY')); // showing concert time with using moment js
                }
            }else if(response.data.length!=0) { // if there are less than 10 concerts,it shows nearest concerts
                console.log("Here! Nearest concert of "  + searchTerm)
                for(var i=0; i<response.data.length ; i++){
                    console.log("");
                    console.log("Concert Will demonstraded at : " + response.data[i].venue.name); // showing vanue name
                    console.log("Concert venue latitude: " +response.data[i].venue.latitude + " and longitude: "+response.data[0].venue.longitude )// showing location name
                    console.log("Date : " + moment(response.data[i].datetime).format('MM/DD/YYYY')) // showing concert time with using moment js
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

function logRecord(value){ // this function using fs module and record all activity with time. 
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
    "Using " + value[2] + " command\n" + "Search " + searchTerm + " data\n\n" , function(err) { // appending every activity in log.txt

        if (err) {
          return console.log(err);
        }
    });
}

logRecord(value);
if(value[2] && value[2]==="spotify-this-song" && value[3]){ //if command is spotify-this-song and there is search value, calling spotifyThisSong function
    spotifyThisSong(value);
}else if(value[2]==="-help"){// if the command is -help it will show avaible search commands. 
    console.log ("")
    console.log ("Search Song from song name: \nnode liri.js spotify-this-song '<song name here>' ")
    console.log ("")
    console.log ("Search Concert from artist and band name : \nnode liri.js concert-this '<artist/band name here>'")
    console.log ("")
    console.log ("Search Movie : \nnode liri.js movie-this '<movie name here>'")
    console.log ("")
    console.log ("Taking value from random.txt and search liri command : \nnode liri.js do-what-it-says")
}else if(value[2] && value[2]==="movie-this"){ // if command is movie-this, calling movieThis function
    movieThis(value);
}else if(value[2] && value[2]==="concert-this" && value[3]){ //if command is concert-this and there is search value, calling concerThis function
    concerThis(value);
}else if(value[2] && value[2]==="do-what-it-says"){ //if command is do-what-it-says, taking datas from random.txt and apply to node-spotify.
    fs.readFile("random.txt","utf8",function(error,data){ // taking data with fs module. from random.txt.
        if (error) {
            return console.log(error);
        }
        var splitArr = data.split(",");
        //console.log(data);
        //console.log(dataArr);
        //console.log(splitArr);
        var dataArr=[" "," "]; 
        //console.log(dataArr);
        splitArr.forEach(function(element) { // adjusting dataArr format like process.argv to easy to apply spotifyThisSong function.
            dataArr.push(element);
          });
        //console.log(dataArr[2]);
        spotifyThisSong(dataArr);
    })

}else { // if u don't put and command or search value, it will show that "there is help command do u want us to help you".
    console.log("Enter Acceptable value.")
    console.log("For Help : \nnode liri.js -help")
}