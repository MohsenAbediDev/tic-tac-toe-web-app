"use strict";
let player1Turn = true;
let player2Turn = false;
let player1Selection = [];
let player2Selection = [];
let player1Score = 0;
let player2Score = 0;
const gamecells = document.querySelectorAll('.gamecell');
const playerTurnStatus = document.querySelector('.player-turn-status'); // prettier-ignore
const winnerModal = document.querySelector('.winner-modal');
const closeModalIcon = document.querySelector('.close-modal-icon');
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
// Function's
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
const showWinnerModal = (icon) => {
    const winnerIcon = document.querySelector('.winner-icon');
    winnerIcon.src = `./public/icons/${icon}.svg`;
    winnerModal.classList.add('show-modal');
    winnerModal.classList.remove('close-modal');
    resetGame();
};
const closeWinnerModal = () => {
    winnerModal.classList.add('close-modal');
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
const resetPlayersSelections = () => {
    player1Selection = [];
    player2Selection = [];
};
const setPlayerScore = (player) => {
    const player1ScoreElem = document.querySelector('.player1-score'); // prettier-ignore
    const player2ScoreElem = document.querySelector('.player2-score'); // prettier-ignore
    if (player === 1) {
        player1ScoreElem.innerHTML = String((player1Score += 1));
    }
    else {
        player2ScoreElem.innerHTML = String((player2Score += 1));
    }
};
const resetCells = () => {
    gamecells.forEach((cell) => {
        cell.innerHTML = '';
    });
};
const resetGame = () => {
    resetCells();
    resetPlayersSelections();
    player1Turn = true;
    player2Turn = false;
    setPlayerTurnStatus();
};
// Event's
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
                showWinnerModal('cross');
                setPlayerScore(1);
                return;
            }
            changePlayersTurn();
        }
        else {
            appendIconToCell(imgElem, cell, 'circle');
            player2Selection.push(playerDataPosition);
            if (checkWinner(player2Selection)) {
                showWinnerModal('circle');
                setPlayerScore(2);
                return;
            }
            changePlayersTurn();
        }
        setPlayerTurnStatus();
    });
});
closeModalIcon.addEventListener('click', closeWinnerModal);
