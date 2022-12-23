let htmlBody = document.getElementById('app');

// A square of the grid
class GridSquare{
    constructor(cordX, cordY){
        this.row = cordX;
        this.col = cordY;
        this.char = '';
        this.gridID = `${cordX}${cordY}`;
    }
}
const gameState = {
    gridSystem: [
        [],
        [],
        [],
    ],
    // True for X, False for O
    turnOrder: true,
    playerX: 'X',
    playerO: 'O',
    numTurns: 0,
    // Whether or not a victory has commenced
    victoryBool: false,
    victoryDimension: 3,
    gridDimensions: 3,
    playerXScore: 0,
    playerOScore: 0,
    aiOnOrOff: false,
    aiDifficulty: 'random',
    drawCount: 0,
    aiVersusBool: false,
    pastMoves: [],
    AIButtonDisabled: true,

}

// Initializes the page
function init(){
    createHeader();
    createGrid();
    createBtn();
    window.localStorage.getItem('player0') ? gameState.playerO = window.localStorage.getItem('playerO') : 0;
    window.localStorage.getItem('playerX') ? gameState.playerX = window.localStorage.getItem('playerX') : 0;
}
// Creates the top section of the app
function createHeader(){
    // AI buttons for functionality
    let aiBtn = document.createElement('input');
    aiBtn.type = 'button';
    aiBtn.id = 'aiBtn';
    aiBtn.value = "Skynet: Deactivated";
    aiBtn.addEventListener('click', turnAIOnOrOff);
    htmlBody.append(aiBtn);

    let aiDiffBtn = document.createElement('input');
    aiDiffBtn.type = 'button';
    aiDiffBtn.id = 'aiDiffBtn';
    aiDiffBtn.value = "Behavior: Deactivated";
    aiDiffBtn.addEventListener('click', changeDiffAI);
    htmlBody.append(aiDiffBtn);

    let aiVersus = document.createElement('input');
    aiVersus.type = 'button';
    aiVersus.id = 'aiVersus';
    aiVersus.value = "Skynet VS: Off";
    aiVersus.addEventListener('click', turnVSOnorOff);
    htmlBody.append(aiVersus);

    let startMove = document.createElement('button');
    startMove.type = 'button';
    startMove.id = 'startMove';
    startMove.textContent = "Start Move";
    startMove.addEventListener('click', aiMove);
    htmlBody.append(startMove);

    let header = document.createElement('h3');
    header.textContent = 'Zic Zac Zoe';
    header.className = 'text-center text-danger display-1';
    htmlBody.appendChild(header);
    
    let topRow = document.createElement('div');
    topRow.className = 'row d-flex justify-content-center text-align-center p-4';
    topRow.id = 'topRow';
    htmlBody.appendChild(topRow);

    createInputForms();
    let subHeader = document.createElement('p');
    subHeader.className = 'text-center text-info';
    subHeader.textContent = `It is the ${gameState.playerX} player's turn (X)`;
    subHeader.id = 'sub';
    topRow.appendChild(subHeader);
    createScoreBoard();
}
// Updates the scoreboard with the new score
function updateScoreBoard(){
    let scoreBoard = document.getElementById('scoreBoard');
    let subHeader = document.getElementById('sub');
    // Updates the turn order sub header to players turn
    if(gameState.turnOrder){
        subHeader.innerText = `It is the ${gameState.playerX} player's turn (X)`;
    } else {
        subHeader.innerText = `It is the ${gameState.playerO} player's turn (O)`;
    }
    scoreBoard.textContent = `The score is ${gameState.playerXScore} ${gameState.playerX} to ${gameState.playerOScore} ${gameState.playerO}! There are ${gameState.drawCount} draws`;
}
// Creates the scoreboard section of the page
function createScoreBoard(){
    let topRow = document.getElementById('topRow');
    let scoreBoard = document.createElement('card');
    scoreBoard.className = 'text-center border-dark text-warning display-6';
    scoreBoard.id = 'scoreBoard';
    topRow.appendChild(scoreBoard);
    // Gets the local storage
    let scoreX = window.localStorage.getItem('playerXScore');
    let scoreO = window.localStorage.getItem('playerOScore');
    let scoreDraw = window.localStorage.getItem('drawCount');
    // If local storage is null sets to 0 otherwise set gamestate to the local storage values
    gameState.drawCount = scoreDraw ? scoreDraw : 0;
    gameState.playerOScore = scoreO ? scoreO : 0;
    gameState.playerXScore = scoreX ? scoreX : 0; 
    updateScoreBoard();
}
// Create the input forms for play inpu names
function createInputForms(){
    let topRow = document.getElementById('topRow');
    const inputFormX = document.createElement('input');
    inputFormX.className = 'd-flex col-8 col-sm-4 justify-content-center text-center';
    inputFormX.placeholder = 'Player X';
    if(window.localStorage.getItem('playerXName') ){
        inputFormX.value = window.localStorage.getItem('playerXName');
        gameState.playerX = window.localStorage.getItem('playerXName');
    }
    inputFormX.id = 'playerXInput';
    inputFormX.addEventListener('keyup', debounce(inputName));
    topRow.appendChild(inputFormX); 

    const inputFormO = document.createElement('input');
    inputFormO.className = 'd-flex col-8 col-sm-4 justify-content-center text-center';
    inputFormO.placeholder = 'Player O';
    if(window.localStorage.getItem('playerOName') ){
        inputFormO.value = window.localStorage.getItem('playerOName');
        gameState.playerO = window.localStorage.getItem('playerOName');
    }
    inputFormO.id = 'playerOInput';
    inputFormO.addEventListener('keyup', debounce(inputName));
    topRow.appendChild(inputFormO);
}
// Copy and pasted from Josh's weather app
// After a .3 seconds calls the update the  player's name
const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) =>{
        clearTimeout(timer);
        timer = setTimeout(() => {func.apply(this, args); }, timeout);
    };
}
// Inputs the name into local
function inputName(){
    let doc = document.getElementById('playerXInput').value;
    doc ? gameState.playerX = doc.toUpperCase() : 0;
    doc = document.getElementById('playerOInput').value 
    doc ? gameState.playerO = doc.toUpperCase() : 0;
    window.localStorage.setItem('playerXName', gameState.playerX);
    window.localStorage.setItem('playerOName', gameState.playerO);
    updateScoreBoard();
}
// Creates the grid for tic tac toe
function createGrid(){
    let grid = document.createElement('div');
    grid.className = 'm-2 container-fluid border border-dark d-flex justify-content-center text-center row col-12';
    grid.id = 'gridSystem';
    htmlBody.appendChild(grid);
    createGridSquares()
    // Loops and adds the interactive grids for clicking
    for(let row = 0; row < gameState.gridDimensions; row++){
        for(let col = 0; col < gameState.gridDimensions; col++){
            let square = document.createElement('div');
            square.className = 'display-3 d-flex justify-content-center text-center border border-dark col-4 py-5 ';
            square.id = `${row}${col}`;
            square.textContent = gameState.gridSystem[row][col].char
            square.addEventListener('click', squareClick);
            square.classList.add('grid');
            grid.appendChild(square);
        }
    }
}
// If a grid gets clicked 
function squareClick(){
    let square = document.getElementById(this.id);
    squareMove(square)
    if(gameState.victoryBool){
        return;
    }
    if(!gameState.victoryBool && gameState.aiOnOrOff && gameState.numTurns != 9){
        aiMove();
    }
}
// Function for square change
function squareMove(square){
    let coordinates = square.id;
    let row = coordinates[0];
    let col = coordinates[1];
    let subHeader = document.getElementById('sub');
    gameState['lastClicked'] = gameState.gridSystem[row][col];
    gameState.pastMoves.push(gameState.gridSystem[row][col]);
    gameState.numTurns++;
    square.classList.remove('grid');
    square.removeEventListener('click', squareClick);
    square.classList.add('text-warning');
    // X true, O false
    if(gameState.turnOrder){
        gameState.gridSystem[row][col].char = 'X';
        square.innerText = 'X';
        square.classList.add('greenTeam');
        subHeader.innerText = `It is the ${gameState.playerO} player's turn (O)`;
    } else {
        gameState.gridSystem[row][col].char = 'O';
        square.innerText = 'O';
        square.classList.add('blueTeam');
        subHeader.innerText = `It is the ${gameState.playerX} player's turn (X)`;
    }
    checkVictory(gameState.gridSystem[row][col]);
    gameState.turnOrder = !gameState.turnOrder;
    // Draw happened
    if(gameState.numTurns === 9 && !gameState.victoryBool){
        drawBox();
        return;
    }
    return;
}
// function that calls the Victory condition functions
function checkVictory(square){
    checkRow(square);
    checkCol(square);
    if(!gameState.victoryBool){
        switch (square.gridID){
                case '00':
                case '22':{
                    checkTopLeftDiag(square);
                    break;
                }
                case '02':
                case '20':{
                    checkTopRightDiag(square);
                    break;
                }
                case '11':{
                    checkTopRightDiag(square)
                    checkTopLeftDiag(square);
                    break;
                }
        }
    }
}

// Checks for the same row that the character is on
function checkRow(square){
    let row = square.row;
    let mark = square.char;
    let isVictory = true;
    for(let i = 0; i < gameState.victoryDimension; i++){
        if(gameState.gridSystem[row][i].char != mark){
            isVictory = false;
        }
    }
    if(isVictory){
        declareVictory();
    }
}

//Starting at top left to bottom right diagonal
function checkTopLeftDiag(square){
    let mark = square.char;
    let isVictory = true;
    for(let i = 0; i < gameState.victoryDimension; i++){
        if(gameState.gridSystem[i][i].char != mark){
            isVictory = false;
        }
    }
    if(isVictory){
        declareVictory();
    }
}

//Starting bottom Left to top right diagonal
function checkTopRightDiag(square){
    let mark = square.char;
    let isVictory = true;
    for(let i = 0; i < gameState.victoryDimension; i++){
        if(gameState.gridSystem[i][(gameState.victoryDimension-(i+1))].char != mark){
            isVictory = false;
        }
    }
    if(isVictory){
        declareVictory();
    }
}

// Check the column of current square and checks for same characters
function checkCol(square){
    let col = square.col;
    let mark = square.char;
    let isVictory = true;
    for(let i = 0; i < gameState.victoryDimension; i++){
        if(gameState.gridSystem[i][col].char != mark){
            isVictory = false;
        }
    }
    if(isVictory){
        declareVictory();
    }
}

// Helper function that calls for victory
function declareVictory(){
    gameState.turnOrder ? gameState.playerXScore++ : gameState.playerOScore++;
    window.localStorage.setItem('playerXScore', gameState.playerXScore);
    window.localStorage.setItem('playerOScore', gameState.playerOScore);
    gameState.AIButtonDisabled = true;
    victoryBox();
    updateScoreBoard();
    for(let row = 0; row < gameState.gridDimensions; row++){
        for(let col = 0; col < gameState.gridDimensions; col++){
            let square = document.getElementById(`${row}${col}`)
            square.id = `${row}${col}`;
            square.removeEventListener('click', squareClick);
            square.classList.remove('grid');
        }
    }
    gameState.victoryBool = true;
}

// Dynamicaly creates the grid squares.
function createGridSquares(){
    for(let row = 0; row < gameState.gridDimensions; row++){
        for(let col = 0; col < gameState.gridDimensions; col++){    
            let square = new GridSquare(row, col, '')
            gameState.gridSystem[row][col]= square;
        }
    }
}

// Creates the reset button appends it to the page
function createBtn(){
    let btnDiv = document.createElement('div');
    btnDiv.className = 'd-flex justify-content-center';
    btnDiv.id = 'btnDiv';
    let btn = document.createElement('button');
    btn.id = 'reset';
    btn.className = 'text-center btn btn-outline-info mt-4';
    btn.innerText = 'Reset Game?';
    btn.addEventListener('click', resetBoard);
    htmlBody.appendChild(btnDiv);
    btnDiv.appendChild(btn);
}

// Deletes the board and remakes it, asks for confirmation first
function resetBoard(){
    if(gameState.victoryBool || confirm('Are you sure? Hit OK to reset')){

        deleteBot();
        createGrid();
        createBtn();
        updateScoreBoard();
        resetGameState();
    }
}

function resetGameState(){
    gameState.numTurns = 0;
    gameState.victoryBool = false;
    gameState.AIButtonDisabled = gameState.aiOnOrOff ? false : true;
    gameState.pastMoves = [];
}

// If the game ends in a draw
function drawBox(){
    gameState.drawCount++;
    window.localStorage.setItem('drawCount', gameState.drawCount);
    let cardBox = document.createElement('div');
    updateScoreBoard();
    cardBox.id = 'cardBox';
    cardBox.className = 'border text-center border-dark container-fluid bg-warning bg-gradient col-6 p-1 mt-3';
    cardBox.innerText = `AWW SHUCKS NO ONE WON! PLAY AGAIN?`
    htmlBody.appendChild(cardBox);
    gameState.victoryBool = true;
    gameState.AIButtonDisabled = true;
}

// Draws a victory box and delcares who wins
function victoryBox(){
    let cardBox = document.createElement('div');
    cardBox.id = 'cardBox';
    let XorO = gameState.turnOrder ? gameState.playerX : gameState.playerO;
    cardBox.className = 'border text-center border-dark container-fluid bg-warning bg-gradient col-6 p-1 mt-3';
    cardBox.innerText = `CONGRULATIONS THE ${XorO} PLAYER WON`
    htmlBody.appendChild(cardBox);
}

// Checks the div elements and deletes them. Everything below the header section
function deleteBot(){
    let element = document.getElementById('reset');
    element.remove();
    if(element != null){
        element.remove();
    }
    element = document.getElementById('gridSystem');
    if(element != null){
        element.remove();
    }
    // Was getting double boxes after a while so deleting twice to get rid of them
    element = document.getElementById('cardBox');
    if(element != null){
        element.remove();
    }
    element = document.getElementById('cardBox');
    if(element != null){
        element.remove();
    }
}

init(); 


//ALL of Skynet related functions down here.
// Turns Skynet on or off
function turnAIOnOrOff(){
    let aiBtn = document.getElementById('aiBtn');
    let diffBtn = document.getElementById('aiDiffBtn');
    let aiVersusBtn = document.getElementById('aiVersus');
    gameState.aiOnOrOff = !gameState.aiOnOrOff;
    if(gameState.aiOnOrOff){
        gameState.AIButtonDisabled = false;
        aiBtn.value = "Skynet: Activated";
        diffBtn.value = "Behavior: Random";
        gameState.aiDifficulty = 'random'
    } else {
        gameState.AIButtonDisabled = true;
        gameState.aiVersusBool = false;
        aiBtn.value = "Skynet: Off";
        diffBtn.value = "Skynet: Off";
        aiVersusBtn.value = 'Skynet VS: Off';
    }
}
// Sets the diffuculty of the AI
function changeDiffAI(){
    let diffBtn = document.getElementById('aiDiffBtn');
    if(gameState.aiOnOrOff){
        switch (diffBtn.value){
            case 'Behavior: Random':
                diffBtn.value = 'Behavior: Easy';
                gameState.aiDifficulty = 'easy'
                break;
            case 'Behavior: Easy':
                gameState.aiDifficulty = 'hard'
                diffBtn.value = 'Behavior: Hard';
                break;
            case 'Behavior: Hard':
                gameState.aiDifficulty = 'random'
                diffBtn.value = 'Behavior: Random';
                break;
        }
    }
}
// Calls the appropiate AI move
function aiMove(){
    if(!gameState.AIButtonDisabled){
        switch (gameState.aiDifficulty){
            case 'random':
                aiRandomMove();
                break;
            case 'easy':
                aiEasyMove();
                break;
            case 'hard':
                aiHardMove();
                break;
        }
    }
}
// Turns the Skynet VS on or off
function turnVSOnorOff(){
    gameState.aiVersusBool = !gameState.aiVersusBool;
    let aiVersusBtn = document.getElementById('aiVersus')
    // IF AI is on
    if(gameState.aiOnOrOff){
        switch(aiVersusBtn.value){
            case 'Skynet VS: Off':{
                aiVersusBtn.value = 'Skynet VS: On';
                break;
            }
            case 'Skynet VS: On':{
                aiVersusBtn.value = 'Skynet VS: Off';
                break;
            }
        }
    } else {
        aiVersusBtn.value = 'Skynet VS: Off';
        gameState.aiVersusBool = false;
    }
}


function aiEasyMove(){
    lastMove();
    moveManager();
}
// Makes a random move for the ai
function aiRandomMove(){
    if(gameState.turnOrder === 8){
        lastMove();
        return;
    }
    let row = Math.floor(Math.random() * gameState.gridDimensions);
    let col = Math.floor(Math.random() * gameState.gridDimensions);
    let square = document.getElementById(`${row}${col}`);
    while(!square.classList.contains('grid')){
        row = Math.floor(Math.random() * gameState.gridDimensions);
        col = Math.floor(Math.random() * gameState.gridDimensions);
        square = document.getElementById(`${row}${col}`);
    }
    squareMove(square);
    moveManager();
}
// Finds the first possible move and makes it. Misnomer.
function lastMove(){
    for(let row = 0; row < gameState.gridDimensions; row++){
        for(let col = 0; col < gameState.gridDimensions; col++){
            let square = document.getElementById(`${row}${col}`)
                if(square.classList.contains('grid')){
                    squareMove(square);
                    return;
            }
        }
    }
}
// Resets the board after a delay and without confirmation
function aiReset(){
    document.getElementById('reset').removeEventListener('click', resetBoard); // Caused errors if the event listener is still on.
    deleteBot();
    createGrid();
    createBtn();
    updateScoreBoard();
    resetGameState();
    moveManager();
}
// Manages the game for ai moves
function moveManager(){
    // If ai versus is on

    if(!gameState.aiVersusBool){
        return;
    }
    // If win condition
    if(gameState.victoryBool){
        setTimeout(() => {
            aiReset();
        }, 1500)
        return;
    }
    // If draw condition
    if(gameState.numTurns === 9 && !gameState.victoryBool){
        setTimeout(() => {
            aiReset();
        }, 1500);
        return;
    }
    // Next turn
    if(!gameState.victoryBool && gameState.aiOnOrOff){
        setTimeout(() => {
            aiMove();
        }, 500)
    }
}

// Will be made in the future
// Need to make a check for victory function and smart move function
function aiHardMove(){
    // Best first move is center grid
    if(gameState.numTurns === 0){
        squareMove(document.getElementById("00"));
    } // Second best is corner 
    else if(gameState.gridSystem[1][1].char === '' && gameState.numTurns === 1){
        squareMove(document.getElementById("11"));
    } else if(gameState.numTurns === 2 && checkCorners()){
    } else if(gameState.numTurns === 2){
        oppositeLastClicked();
    } 
    else {
        if(checkPossibleWinThenLoss()){
        } else{
            aiRandomMove();
        }
    }
    moveManager();
}
// Does the move opposite the lastClciked on the grid
function oppositeLastClicked(){
    let firstMove = gameState.pastMoves[0];
    let newRow, newCol;
    if(firstMove.row){
        newRow = 0;
    } else {
        newRow = 2;
    }
    if(firstMove.col){
        newCol = 0;
    } else {
        newCol = 2;
    }
    squareMove(document.getElementById(newRow + '' + newCol));
    return true;
}

// Checks the corners for inputs
// 00 02 20 22
function checkCorners(){
    switch (gameState.lastClicked.gridID) {
        case "00":{
                squareMove(document.getElementById("02"));
                return true;
        }
        case "22":{
            squareMove(document.getElementById("20"));
            return true;
        }
        case "02":{
            squareMove(document.getElementById("00"));
            return true;
        }
        case "20":{
            squareMove(document.getElementById("22"));
            return true;
        }
        default:{
            checkPossibleWinThenLoss();
            break;
        }
    }
    return false;
}

// X is true, O is false
function checkPossibleWinThenLoss(){
    let mark = gameState.turnOrder ? 'X' : 'O';
    if(checkPossibleWinDiag(mark)){
        return true;
    }
    if(checkPossibleWinCol(mark)){
        return true;
    }
    if(checkPossibleWinRow(mark)){
        return true;
    }
    mark = (mark === 'X') ? 'O' : 'X';
    if(checkPossibleWinDiag(mark)){
        return true;
    }
    if(checkPossibleWinCol(mark)){
        return true;
    }
    if(checkPossibleWinRow(mark)){
        return true;
    }
    return false;
}
function checkPossibleWinRow(mark){
    let markCount = 0;
    let placeholderSquare;
    for(let r = 0; r < gameState.gridDimensions; r++){
        for(let c = 0; c < gameState.gridDimensions; c++){
            if(gameState.gridSystem[r][c].char === mark){
                markCount++;
            }
            else {
                placeholderSquare = document.getElementById(r + "" + c);
            }
        }
        if(markCount === 2 && placeholderSquare.classList.contains('grid')){
            squareMove(placeholderSquare);
            return true;
        }
        markCount = 0;
    }
}

function checkPossibleWinCol(mark){
    let markCount = 0;
    let placeholderSquare;
    for(let c = 0; c < gameState.gridDimensions; c++){
        for(let r = 0; r < gameState.gridDimensions; r++){
            if(gameState.gridSystem[r][c].char === mark){
                markCount++;
            }
            else {
                placeholderSquare = document.getElementById(r + ""+ c);
            }
        }
        if(markCount === 2 && placeholderSquare.classList.contains('grid')){
            squareMove(placeholderSquare);
            return true;
        }
        markCount = 0;
    }
}
// Checks diagonals. 
function checkPossibleWinDiag(mark){
    let markCount = 0, markCountOtherWay = 0;
    let placeholderSquare, otherSquare;

    for(let diagonal = 0; diagonal < gameState.gridDimensions; diagonal++){
        // [0,0], [1,1], [2,2]
        if(gameState.gridSystem[diagonal][diagonal].char === mark){
            markCount++;
        }
        else {
            placeholderSquare = document.getElementById(diagonal + "" + diagonal);
        }
        //[2,0], [1,1], [0,2]
        if(gameState.gridSystem[(2 - diagonal)][diagonal].char === mark){
            markCountOtherWay++;
        }
        else{
            otherSquare = document.getElementById((2 - diagonal) + "" + diagonal);
        }
    }
    if(markCount === 2 && placeholderSquare.classList.contains('grid')){
        squareMove(placeholderSquare);
        return true;
    }
    if(markCountOtherWay === 2 && otherSquare.classList.contains('grid')){
        squareMove(otherSquare);
        return true;
    }
}

// Function that could be used for shorthanded grid checks.
function checkValidSquare(row, col){
    if(row < 0 || row >= gameState.gridDimensions){
        return false;
    }
    if(col < 0 || col >= gameState.gridDimensions){
        return false;
    }
    let square = document.getElementById(row + '' + col)
    if(!square.classList.contains('grid')){
        return false;
    }
    return true; 
}
