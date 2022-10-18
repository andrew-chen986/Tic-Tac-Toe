const gameBoard = (() => {
    let board = new Array(3);
    let gameOver = false;
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(3).fill('');
    }
    function isFull() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
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
    function victory() {
        // check horizontals
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                gameOver = true;
                return gameOver;
            }
        }
        
        // check verticals
        for (let j = 0; j < board[0].length; j++) {
            if (board[0][j] === board[1][j] === board[2][j]) {
                gameOver = true;
                return gameOver;
            }
        }

        // check diagonals
        if (board[0][0] === board[1][1] === board[2][2]) {
            gameOver = true;
            return gameOver;
        }
        if (board[0][2] === board[1][1] === board[2][0]) {
            gameOver = true;
            return gameOver;
        }
        return gameOver;
        
    }
    return {board, isFull, markBoard, victory, gameOver}
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
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        const boxID = box.id;
        const boxIndex = parseInt(boxID.slice(boxID.length - 1, boxID.length)) - 1;
        box.addEventListener('click', () => {
            gameBoard.markBoard(currPlayer, boxIndex);
            displayController.updateDisplay(board);
            currPlayer = currPlayer === player1 ? player2 : player1;
            currPlayerMessage.textContent = `Current Player: ${currPlayer.marker}`;
            if (gameBoard.victory()) {
                // remove event listeners 
                    boxes = document.querySelectorAll('.box');
                    boxes.forEach((box) => {
                        box.removeEventListener('click', () => {

                        });
                    });

                // build victory modal to display
                const victoryModal = document.getElementById('modal');
                const modalBody = document.querySelector('.modal-body');
                modalBody.textContent = `${currPlayer.marker} wins!`;
                victoryModal.style.display = "block";
                const closeButton = document.getElementsByClassName('btn-close')[0];
                closeButton.onclick = () => {
                    victoryModal.style.display = "none";
                };
                window.onclick = (event) => {
                    if (event.target === victoryModal) {
                        victoryModal.style.display = "none";
                    }
                };
            }
        });
    });
}

if (!gameBoard.gameOver) {
    playGame(gameBoard, displayController);
}