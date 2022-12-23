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
    gameState.numTurns = 0;
    gameState.victoryBool = false;
    gameState.AIButtonDisabled = false;
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
            console.log('checkCorners');
    } else if(gameState.numTurns === 2){
        console.log('turn 3 oppo')
        oppositeLastClicked();
    } 
    else {
        if(checkPossibleWinThenLoss()){
            console.log('possible win then loss')
        } else{
            console.log('random thought');
            aiRandomMove();
        }
    }
    moveManager();
}
// Does the move opposite the lastClciked on the grid
function oppositeLastClicked(){
    let firstMove = gameState.pastMoves[0];
    let newRow, newCol;
    console.log(firstMove);
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
    console.log("Mark: ",  mark);
    if(checkPossibleWinDiag(mark)){
        console.log('winDig: ', mark)
        return true;
    }
    if(checkPossibleWinCol(mark)){
        console.log('winCol: ', mark)
        return true;
    }
    if(checkPossibleWinRow(mark)){
        console.log('winRow: ', mark)
        return true;
    }
    mark = (mark === 'X') ? 'O' : 'X';
    console.log("Mark2: ", mark);
    if(checkPossibleWinDiag(mark)){
        console.log('winDiag: ', mark)
        return true;
    }
    if(checkPossibleWinCol(mark)){
        console.log('winCol: ', mark)
        return true;
    }
    if(checkPossibleWinRow(mark)){
        console.log('winRow: ', mark)
        return true;
    }
    console.log('nothing');
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
            console.log('winRow: ', placeholderSquare);
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
            console.log('winCol: ', placeholderSquare);
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
        console.log('winDig: ', placeholderSquare);
        squareMove(placeholderSquare);
        return true;
    }
    if(markCountOtherWay === 2 && otherSquare.classList.contains('grid')){
        console.log('otherDiag: ', otherSquare);
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
