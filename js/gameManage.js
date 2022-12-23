// File contains the functions for game management.
// Clicking on a square, win/draw logic,

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
    console.log(square);
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
