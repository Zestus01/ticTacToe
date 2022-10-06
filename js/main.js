let htmlBody = document.getElementById('app');

const gameState = {
    gridSystem: [
        [],
        [],
        [],
    ],
    turnOrder: 'true',
    playerX: 'X',
    playerO: 'O',
    numTurns: 0,
    victoryBool: false,
    victoryDimension: 3,
    gridDimensions: 3,
    playerXScore: 0,
    playerOScore: 0,
}

class GridSquare{
    constructor(cordX, cordY){
        this.row = cordX;
        this.col = cordY;
        this.char = '';
        this.gridID = `${cordX}${cordY}`;
    }
}

function init(){
    createHeader();
    createGrid();
    createBtn();
    window.localStorage.getItem('player0') ? gameState.playerO = window.localStorage.getItem('playerO') : 0;
    window.localStorage.getItem('playerX') ? gameState.playerX = window.localStorage.getItem('playerX') : 0;
}

function createHeader(){
    let header = document.createElement('h3');
    header.textContent = 'Zic Zac Zoe';
    header.className = 'text-center text-danger display-3';
    htmlBody.appendChild(header);

    let topRow = document.createElement('div');
    topRow.className = 'row d-flex justify-content-center text-align-center p-4';
    topRow.id = 'topRow';
    htmlBody.appendChild(topRow);

    createInputForms();
    createScoreBoard();
    let subHeader = document.createElement('p');
    subHeader.className = 'text-center text-info';
    subHeader.textContent = `It is the ${gameState.playerX} player's turn (X)`;
    subHeader.id = 'sub';
    topRow.appendChild(subHeader);
}

function updateScoreBoard(){
    let scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.textContent = `The score is ${gameState.playerXScore} X to ${gameState.playerOScore} O!`;
}

function createScoreBoard(){
    let topRow = document.getElementById('topRow');
    let scoreBoard = document.createElement('card');
    scoreBoard.className = 'text-center border-dark text-warning display-5';
    scoreBoard.id = 'scoreBoard';
    topRow.appendChild(scoreBoard);
    let scoreX = window.localStorage.getItem('playerXScore');
    let scoreO = window.localStorage.getItem('playerOScore');
    gameState.playerOScore = scoreO ? scoreO : 0;
    gameState.playerXScore = scoreX ? scoreX : 0; 
    scoreBoard.textContent = `The score is ${gameState.playerXScore} X to ${gameState.playerOScore} O!`;
}

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
    topRow.appendChild(inputFormX); 

    const inputFormO = document.createElement('input');
    inputFormO.className = 'd-flex col-8 col-sm-4 justify-content-center text-center';
    inputFormO.placeholder = 'Player O';
    if(window.localStorage.getItem('playerOName') ){
        inputFormO.value = window.localStorage.getItem('playerOName');
        gameState.playerO = window.localStorage.getItem('playerOName');
    }
    inputFormO.id = 'playerOInput';
    topRow.appendChild(inputFormO);
}

function createGrid(){
    let grid = document.createElement('div');
    grid.className = 'm-2 container-fluid border border-dark d-flex justify-content-center text-center row col-12';
    grid.id = 'gridSystem';
    htmlBody.appendChild(grid);
    createGridSquares()
    for(let row = 0; row < gameState.gridDimensions; row++){
        for(let col = 0; col < gameState.gridDimensions; col++){
            let square = document.createElement('div');
            square.className = 'display-3 d-flex justify-content-center text-center border border-dark col-4 p-5';
            square.id = `${row}${col}`;
            square.textContent = gameState.gridSystem[row][col].char
            square.addEventListener('click', squareClick);
            square.classList.add('grid');
            grid.appendChild(square);
        }
    }
}

function squareClick(){
    let doc = document.getElementById('playerXInput').value;
    doc ? gameState.playerX = doc.toUpperCase() : 0;
    doc = document.getElementById('playerOInput').value 
    doc ? gameState.playerO = doc.toUpperCase() : 0;
    window.localStorage.setItem('playerXName', gameState.playerX);
    window.localStorage.setItem('playerOName', gameState.playerO);
    let square = document.getElementById(this.id);
    let cords = this.id;
    let row = cords[0];
    let col = cords[1];
    let subHeader = document.getElementById('sub');
    gameState.numTurns++;
    square.classList.remove('grid');;
    square.removeEventListener('click', squareClick);
    square.classList.add('text-warning');
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
    }
}

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
    if(confirm('Are you sure? Hit OK to reset')){
        document.getElementById('reset').removeEventListener('click', resetBoard);
        window.localStorage.removeItem('gridSystem');
        deleteBot();
        createGrid();
        createBtn();
        gameState.numTurns = 0;
        gameState.victoryBool = false;
    }
}

// If the game ends in a draw
function drawBox(){
    let cardBox = document.createElement('div');
    cardBox.id = 'cardBox';
    cardBox.className = 'border text-center border-dark container-fluid bg-gradient col-6 p-1 mt-3';
    cardBox.innerText = `AWW SHUCKS NO ONE WON! PLAY AGAIN?`
    htmlBody.appendChild(cardBox);
}

// Draws a victory box and delcares who wins
function victoryBox(){
    let cardBox = document.createElement('div');
    cardBox.id = 'cardBox';
    let XorO = gameState.turnOrder ? gameState.playerX : gameState.playerO;
    cardBox.className = 'border text-center border-dark container-fluid bg-gradient col-6 p-1 mt-3';
    cardBox.innerText = `CONGRULATIONS THE ${XorO} PLAYER WON`
    htmlBody.appendChild(cardBox);
}

// Checks the div elements and deletes them. Everything below the header section
function deleteBot(){
    let element = document.getElementById('reset');
    element.remove();
    element = document.getElementById('gridSystem');
    if(element != null){
        element.remove();
    }
    element = document.getElementById('cardBox');
    if(element != null){
        element.remove();
    }
}

init(); 
