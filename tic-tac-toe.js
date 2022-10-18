const gameBoard = (() => {
    let board = new Array(3).fill(new Array(3).fill('X'));
    return {board}
})();

const Player = (marker) => {
    return {marker}
};