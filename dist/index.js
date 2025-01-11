"use strict";
let player1Turn = true;
let player2Turn = false;
let player1Selection = [];
let player2Selection = [];
const gamecells = document.querySelectorAll('.gamecell');
const playerTurnStatus = document.querySelector('.player-turn-status'); // prettier-ignore
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const changePlayersTurn = () => {
    player1Turn = !player1Turn;
    player2Turn = !player2Turn;
};
const setPlayerTurnStatus = () => {
    if (player1Turn) {
        playerTurnStatus.src = './public/icons/cross.svg';
    }
    else {
        playerTurnStatus.src = './public/icons/circle.svg';
    }
};
const appendIconToCell = (imgElem, cell, icon) => {
    imgElem.src = `./public/icons/${icon}.svg`;
    cell.appendChild(imgElem);
};
const checkWinner = (playerSelection) => {
    const selectedPositions = playerSelection.map(Number);
    for (const combination of winningCombinations) {
        if (combination.every((pos) => selectedPositions.includes(pos))) {
            return true;
        }
    }
    return false;
};
gamecells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        const imgElem = document.createElement('img');
        const playerDataPosition = cell.getAttribute('data-position');
        // Prevent clicking on filled cell
        if (cell.hasChildNodes())
            return;
        if (player1Turn) {
            appendIconToCell(imgElem, cell, 'cross');
            player1Selection.push(playerDataPosition);
            if (checkWinner(player1Selection)) {
                alert('Player 1 Wins!');
                return;
            }
            changePlayersTurn();
        }
        else {
            appendIconToCell(imgElem, cell, 'circle');
            player2Selection.push(playerDataPosition);
            if (checkWinner(player2Selection)) {
                alert('Player 2 Wins!');
                return;
            }
            changePlayersTurn();
        }
        setPlayerTurnStatus();
    });
});
