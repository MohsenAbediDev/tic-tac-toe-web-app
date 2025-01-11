"use strict";
let player1Turn = true;
let player2Turn = false;
let player1Selection = [];
let player2Selection = [];
const gamecells = document.querySelectorAll('.gamecell');
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
const appendIconToCell = (imgElem, cell, icon) => {
    imgElem.src = `./public/icons/${icon}.svg`;
    cell.appendChild(imgElem);
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
            changePlayersTurn();
        }
        else {
            appendIconToCell(imgElem, cell, 'circle');
            player2Selection.push(playerDataPosition);
            changePlayersTurn();
        }
    });
});
