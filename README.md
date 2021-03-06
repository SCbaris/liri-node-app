# LIRI-node-app

**LIRI** is like iPhone's **SIRI**. However, while **SIRI** is a Speecg Interpretatiot and Recognition Interface, **LIRI** is a Language Interpretation and Recognation Interface. 

**LIRI** is command line node app that takes in command and parameter and gives you back data.

In **LIRI** I used :
 - **Axios** module
 
    - For getting response from spesific URL.

    ![Image of Axios](./HomeWorkPictures/axios.jpg)
 - **FS** module

    - For reading and writing informations on external txt file.

    ![Image of FS](./HomeWorkPictures/fsModule.jpg)
 - **Spotify-Node** module

    - For searching spesific responce from spotify

    ![Image of Spotify-Node](./HomeWorkPictures/spotify.jpg)
 - **Moment Js** module

    - For formating date values.

    ![Image of Moment Js](./HomeWorkPictures/MomentJS.jpeg)

 - **dotenv** module

    - For hiding keys, passwords and client IDs.

    ![Image of dotenv](./HomeWorkPictures/donenv.jpg)

In **LIRI** there are simple 5 command: 

## **-Help**

This command is classic help command. The command show the user that what commands is avaible on LIRI bot.

![Image of -help](./HomeWorkPictures/-helpresponse.png)

If user write unsensable command, LIRI offer them to using -help.

![Image of -help](./HomeWorkPictures/gibirishCommand.png)

Also while user searching something without a paramater or gibirish paramater LIRI offer help again.

![Image of -help](./HomeWorkPictures/concert-this-no-second-value.png)

## **Spotify-this-song**

This command helps the user to find music information from spotify. If user want to listen a music and know only 2-3 word from lyrics, LIRI can help them!.

This command accept 1 or more search term. for exp umbrella or black eyed peas or taylor swift or Billie Eilish.

![Image of Spotify-this-song](./HomeWorkPictures/spotify-this-song-good-value.png)

This command gives Artist name, song album name, song name and spotify play link to user. If user want to listen this song, they can just copy paste and listen. That's simple right!

If user forget the right command or write gibirish something, LIRI offer help.

![Image of Spotify-this-song](./HomeWorkPictures/spotify-this-song-no-value.png)

## **Concert-this**

While you are listening a song, you recognize someting that is boring listening music with your phone or computer. And you want to go out with you GF or BF. You want to listen music in perfect ambiance with real beats. CONCERT! Good idea! LIRI can help you. 

This command helps you to find your favorite artist's concerts. Where and when. 

This command accept 1 or more search term. for exp rihanna or black eyed peas or taylor swift or Billie Eilish.

![Image of Concert-this](./HomeWorkPictures/concert-this-good-second-value.png)

If you are lucky, your artist is in tour and you can see many result. And LIRI can show you nearest 10 events.

Maybe your artist is on vacation and there is no concert plan of her. LIRI can show you.

![Image of Concert-this](./HomeWorkPictures/concert-this-second-value.png)

If your favorite artist plan only one concert,

![Image of Concert-this](./HomeWorkPictures/concert-this-result-second-value.png)

If you are so exited and your fingers shaking while writing name of your favorite artist,

![Image of Concert-this](./HomeWorkPictures/concert-this-bad-value.png)

## **Movie-this**

Maybe you are bored and watch a movie. You heard a movie from one of your friend. But you want to sure this movie good or not. LIRI can help you!.

This command will take movie name and show you movie out year, movie imdb score, rotten tomatoes score(if rotten tomato rated), short plot and artists.

![Image of Movie-this](./HomeWorkPictures/movie-this-good-value-rotten-tomato-results.png)

If the rotten tomatoes didn't rate this movie,

![Image of Movie-this](./HomeWorkPictures/movie-this-bad-value-without-rotten-tomato-results.png)

if user write wrong, 

![Image of Movie-this](./HomeWorkPictures/movie-this-gibirish-bad-value.png)

if user forget to write search value, LIRI search Mr. Nobody.

![Image of Movie-this](./HomeWorkPictures/movie-this-no-value-turn-to-mr-nobody.png)

I used axios module and omdb API. 


## **Do-what-it-says**

This command take command and search value from random.txt file and call the spotify function. Show the result of what inside of the random.txt. 

There is one search value for "I Want it That Way". 

![Image of Movie-this](./HomeWorkPictures/do-what-it-says.png)


--------------

Don't forget to watch video! 

[![Liri Bot](http://img.youtube.com/vi/uUgG9cvsJk4/0.jpg)](https://www.youtube.com/watch?v=uUgG9cvsJk4 "Liri Bot")


SCB write the code. I hope you enjoy. 
