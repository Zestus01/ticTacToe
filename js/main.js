let htmlBody = document.getElementById('app');

let gameState = {
    gridSystem: [[]],
    turnOrder: true,
    playerX: '',
    playerO: '',
}

class Grid{
    constructor(coords, position){
        this.coords = coords;
        this.positon = position;
        this.clickable = true;
        this.char = '';
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
    htmlBody.appendChild(subHeader);
}

function createGrid(){
    let grid = document.createElement('div');
    grid.className = 'border-dark d-flex justify-content-center text-center';
    htmlBody.appendChild(grid);
}

function createBtn(){
    let btnDiv = document.createElement('div');
    btnDiv.className = 'd-flex justify-content-center';
    btnDiv.id = 'btnDiv';
    let btn = document.createElement('button');
    btn.id = 'reset';
    btn.className = 'text-center btn btn-outline-success';
    btn.innerText = 'Reset Game?';
    btn.addEventListener('click', () => resetBoard());
    htmlBody.appendChild(btnDiv);
    btnDiv.appendChild(btn);
}
function resetBoard(){
    if(confirm('Are you sure? Hit OK to reset')){
       // Reset board logic here.
    }
}

init(); 