let htmlBody = document.getElementById('app');
let state = {
    gridSystem: [[]],
    turnOrder: true,
    playerX: '',
    playerO: '',
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
    grid.textContent = 'It worked';
    htmlBody.appendChild(grid);
}

function createBtn(){
    let btn = document.createElement('button');
    btn.id = 'reset';
    btn.className = 'justify-content-center text-center btn btn-outline-success';
    btn.innerText = 'Reset Game?';
    btn.addEventListener('click', () => resetBoard());
    htmlBody.appendChild(btn);
}
function resetBoard(){
    ;
}
init(); 