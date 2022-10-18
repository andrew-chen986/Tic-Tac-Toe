const gameBoard = (() => {
    let board = new Array(3);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(3).fill('');
    }
    function isFull() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (!board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    function markBoard(player, index) {
        const i = Math.floor(index / 3);
        const j = index - 3*i;
        if (board[i][j] === '') {
            board[i][j] = player.marker;
            return true;
        }
        alert("Click an empty square!");
        return false;
    }
    return {board, isFull, markBoard}
})();

const Player = (marker) => {
    return {marker}
};

const displayController = (() => {
    function updateDisplay(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const squareIndex = 3*i + j;
                const targetID = `box-${squareIndex+1}`;
                const square = document.getElementById(targetID);
                square.textContent = board[i][j];
            }
        }
    }
    return {updateDisplay}
})();

function playGame(gameBoard, displayController) {
    const board = gameBoard.board;
    const player1 = Player('X');
    const player2 = Player('O');
    let currPlayer = player1;
    const numSquares = board.length * board[0].length;
    const currPlayerMessage = document.createElement('div');
    currPlayerMessage.textContent = `Current Player: ${currPlayer.marker}`;
    const body = document.querySelector('body');
    body.appendChild(currPlayerMessage);
    boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        const boxID = box.id;
        const boxIndex = parseInt(boxID.slice(boxID.length - 1, boxID.length)) - 1;
        box.addEventListener('click', () => {
            gameBoard.markBoard(currPlayer, boxIndex);
            displayController.updateDisplay(board);
            currPlayer = currPlayer === player1 ? player2 : player1;
            currPlayerMessage.textContent = `Current Player: ${currPlayer.marker}`;
        });
    });
}

playGame(gameBoard, displayController);