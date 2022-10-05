let htmlBody = document.getElementById('app');

const gameState = {
    gridSystem: [
        [],
        [],
        [],
    ],
    turnOrder: 'true',
    playerX: '',
    playerO: '',
    numTurns: 0,
    victoryBool: false,
}

class Grid{
    constructor(coordX, cordY, position, check){
        this.coordX = coordX;
        this.cordY = cordY;
        this.positon = position;
        this.clickable = true;
        this.char = '';
        this.check = check;
        this.gridID = `${coordX}${cordY}`;
    }
}

function init(){
    createHeader();
    createGrid();
    createBtn();
}

function createHeader(){
    let header = document.createElement('h3');
    header.textContent = 'Tic Tac Timmy';
    header.className = 'text-center';
    htmlBody.appendChild(header);
    
    let subHeader = document.createElement('p');
    subHeader.className = 'text-center text-muted';
    subHeader.textContent = 'It is the X players turn';
    subHeader.id = 'sub';
    htmlBody.appendChild(subHeader);
}

function createGrid(){
    let grid = document.createElement('div');
    grid.className = 'm-2 container-fluid border border-dark d-flex justify-content-center text-center row col-12';
    grid.id = 'gridSystem';
    htmlBody.appendChild(grid);
    createTopRow();
    createMidRow();
    createBotRow();
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            let gridSquare = document.createElement('div');
            gridSquare.className = 'display-3 d-flex justify-content-center text-center grid border border-dark col-4 p-5';
            gridSquare.id = `${row}${col}`;
            gridSquare.addEventListener('click', squareClick);
            grid.appendChild(gridSquare);
        }
    }
}

function squareClick(){
    let gridSquare = document.getElementById(event.target.id);
    let coords = event.target.id;
    let row = coords[0];
    let col = coords[1];
    let subHeader = document.getElementById('sub');
    gridSquare.classList.remove('grid');;
    gridSquare.removeEventListener('click', squareClick);
    if(gameState.turnOrder){
        gameState.gridSystem[row][col].char = 'X';
        gridSquare.innerText = 'X';
        subHeader.innerText = 'It is the O players turn';
    } else {
        gameState.gridSystem[row][col].char = 'O';
        gridSquare.innerText = 'O';
        subHeader.innerText = 'It is the X players turn';
    }
    checkVictory(gameState.gridSystem[row][col]);
    gameState.turnOrder = !gameState.turnOrder;
}

function checkVictory(gridSquare){
    switch (gridSquare.position){
            case 'edge':{
                if(checkRow(gridSquare)){
                    return;
                }
                checkCol(gridSquare);
                break;
            }
            case 'corner':
                if(checkRow(gridSquare)){
                    return;
                }
                if(checkCol(gridSquare)){
                    return;
                }
                checkDiag(gridSquare);
                break;
            case 'mid':
                if(checkRow(gridSquare)){
                    return;
                }
                if(checkCol(gridSquare)){
                    return;
                }
                checkMidDiag(gridSquare);
    }
}

function checkRow(gridSquare){
    let row = gridSquare.row;
    let mark = gridSquare.char;
    if(gameState.gridSystem[row][0].char === mark && gameState.gridSystem[row][1].char === mark && gameState.gridSystem[row][2].char === mark){
        deleteBot();
        createBtn();
        victoryBox();
    }
}
function createTopRow(){
    let grid00 = new Grid(0, 0, 'topLeft', 'corner');
    gameState.gridSystem[0][0] = grid00;
    let grid01 = new Grid(0, 1, 'topMid', 'edge');
    gameState.gridSystem[0][1] = grid01;
    let grid02 = new Grid(0, 2, 'topRight', 'corner');
    gameState.gridSystem[0][2] = grid02;
}

function createMidRow(){
    let grid10 = new Grid(1, 0, 'midLeft', 'edge');
    gameState.gridSystem[1][0] = grid10;
    let grid11 = new Grid(1, 1, 'midMid', 'mid');
    gameState.gridSystem[1][1] = grid11;
    let grid12 = new Grid(1, 2, 'midRight', 'edge');
    gameState.gridSystem[1][2] = grid12;
}

function createBotRow(){
    let grid20 = new Grid(2, 0, 'botLeft', 'corner');
    gameState.gridSystem[2][0] = grid20;
    let grid21 = new Grid(2, 1, 'botMid', 'edge');
    gameState.gridSystem[2][1] = grid21;
    let grid22 = new Grid(2, 2, 'botRight', 'corner');
    gameState.gridSystem[2][2] = grid22;
}

function createBtn(){
    let btnDiv = document.createElement('div');
    btnDiv.className = 'd-flex justify-content-center';
    btnDiv.id = 'btnDiv';
    let btn = document.createElement('button');
    btn.id = 'reset';
    btn.className = 'text-center btn btn-outline-success mt-4';
    btn.innerText = 'Reset Game?';
    btn.addEventListener('click', resetBoard);
    htmlBody.appendChild(btnDiv);
    btnDiv.appendChild(btn);
}
function resetBoard(){
    if(confirm('Are you sure? Hit OK to reset')){
        document.getElementById('reset').removeEventListener('click', resetBoard);
        deleteBot();
        createGrid();
        createBtn();
    }
}

function victoryBox(){
    let cardBox = document.createElement('div');
    cardBox.id = 'cardBox';
    let XorO = turnOrder ? 'X' : 'O';
    cardBox.className = 'border border-dark container-fluid bg-gradient col-6 p-1 display-2 mt-3';
    cardBox.innerText = `CONGRULATIONS THE ${XorO} PLAYER WON`
    cardBox.textContent = text;
    htmlBody.appendChild(cardBox);
}

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