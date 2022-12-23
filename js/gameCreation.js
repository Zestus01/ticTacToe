// Functions that deal with game creation logic, setting up the frontend

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
        gameState.numTurns = 0;
        gameState.victoryBool = false;
        gameState.AIButtonDisabled = gameState.aiOnOrOff ? false : true;
    }
}