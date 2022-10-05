# ticTacToe
##### Pseudocode

## About
##### &emsp; Create an interactive board that is responsive.
##### &emsp; Make each square interactive and either display a 'X' or and 'O' 
##### &emsp; Check for victory after 5 moves (minimum number of moves needed for victory)
###### &emsp;
## HTML (Front End)
##### &emsp; Will be a single div id='app' in the body
##### &emsp; Use javascript to append the header(name of app)
##### &emsp; Make the grid 3x3
##### &emsp; To make the grid borders use the bootstrap class border-dark
##### &emsp; Make the button (Restart) and Undo(takes one turn back)
##### &emsp; Will have a turn indicator under the header to show which turn.
##### &emsp; STRECH: Buttons to change the game to Ultimate or Connect Four
## Javascript
### State objects
#### numMoves
##### &emsp; Starts at 0 and increases by one after every move
####  Grid square
##### &emsp; Will be 9 of them in a 2D array
##### &emsp; Maybe an object or class.
##### Properties
##### &emsp; Position: three diferent positons: Edge, cornor, mid
##### &emsp; Coords: Will be the postion in the 2D array
##### &emsp; char: Is the value in the square IE 'X' 'O' or ''. Helps display the insides of the square
##### &emsp; clickable: A boolean determinng if a player can place a character, starts true changes to false
##### &emsp; 
#### Grid System
##### &emsp; Is a 2D array that holds the grid squares
##### &emsp; Holds the ID of the divs on the front end to help interactivity
##### &emsp; gridSystem.last: is the last square clicked
#### Turn
##### &emsp; Will be a true/false  X for true, O for False
##### &emsp; Displays under the header
##### Properties
##### &emsp; changeTurn(): changes state.Turn and updates the turn signal on top
### Functions
#### checkVictory()
##### &emsp; Will be called after turn 5, returns a true for victory or false
##### &emsp; If no victory after 9 turns calls gameDraw();
##### &emsp; checks the last square moved and calls the neccassry helper funtions
##### &emsp; Corner calls each helper function checkDiag(), checkRow(), checkTop()
##### &emsp; Edge calls checkRow, checkTop
##### &emsp; Mid checks each
#### &emsp; checkDiag()
##### &emsp; Gets the X,Y coords of the last square
##### &emsp; Steps through the grid in a diagonal using a switch
##### &emsp; Checks the char against each grid it checks 
##### &emsp; returns true if all the same, false otherwise
#### &emsp; checkRow()
##### &emsp; Gets X,Y coords
##### &emsp; Steps through the grid on the same row for char
#### &emsp; checkTop()
##### &emsp; gets X,Y coords
##### &emsp; Steps through the array vertically
#### NOTE the mid square will have the same functions but checkMidDiag(), checkMidRow(), checkMidTop()
##### &emsp; Same logic but just different squares it checks 
### Init()
##### &emsp; Contructs the grid
##### &emsp; Resets the value of the board converting the state back to default values
##### &emsp; Calls constructGrid(), constructHead(), constructBtn();
### construcGrid()
##### &emsp; Create the div that will hold the squares for the game and appends it.
##### &emsp; Each grid will have the ID ranging from 00 - 22, matches the value in the 2D array
##### &emsp; Class will be grid border-dark. Grid will have a css hover effect to help players chose the right square
##### &emsp; appends the grid to the gridSystem

