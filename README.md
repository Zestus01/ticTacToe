# ticTacToe
##### Pseudocode

### About
##### &emsp; Create an interactive board that is responsive.
##### &emsp; Make each square interactive and either display a 'X' or and 'O' 
##### &emsp; Check for victory after 5 moves (minimum number of moves needed for victory)
###### &emsp;
### HTML (Front End)
##### &emsp; Will be a single div id='app' in the body
##### &emsp; Use javascript to append the header(name of app)
##### &emsp; Make the grid 3x3
##### &emsp; To make the grid borders use the bootstrap class border-dark
##### &emsp; Make the button (Restart) and Undo(takes one turn back)
##### &emsp; Will have a turn indicator under the header to show which turn.
##### &emsp;
### Javascript
####  Grid square
##### &emsp; Will be 9 of them in a 2D array
##### &emsp; Maybe an object or class.
##### Properties
##### &emsp; Position: a two positon string IE TopMid, MidMid, BotRight, TopRight
##### &emsp; Coords: Will be the postion in the 2D array
##### &emsp; state: Is the value in the square IE 'X' 'O' or ''. Helps display the insides of the square
##### &emsp; clickable: A boolean determinng if a player can place a character
