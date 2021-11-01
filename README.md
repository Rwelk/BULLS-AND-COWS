# Bulls-and-Cows
This is a personal project I created that creates a web interface for the game Bulls and Cows.

**Background:**
Information on how to play the game can be found here:
https://en.wikipedia.org/wiki/Bulls_and_Cows

This project is meant to serve as a final challenge for a version of the Amazing Race that my college's Computer Science Department hosted.
Over the course of the race, teams would perform tasks and collect small colored tokens.
On these tokens would be written a website domain, and once all the tokens were collected they could visit the site this project is hosted at.


**How the game Works:**
In the normal version of Bulls and Cows, players have to guess what colors the code had, as well as what position they should be in.
In an effort to simplify the game and add narrative cohesion to the Race, this version of Bulls and Cows has been pared down to just guessing what position the colors were in.
To elicit critical thinking rather than blindly submiting guesses, a timer is put on the submit button as a penalty for guessing incorrectly.

The race had five challenges, and therefore five tokens and five colors.
In the original game, the code would only be composed of four colors.
In testing, I found that having the additional color made the game significantly harder.
So while ideally the order should be randomly generated, due to the timer on the submit button the game would take too long.
The functionality to have random guesses is still built in however, in case anybody wants to try it with that enabled.
