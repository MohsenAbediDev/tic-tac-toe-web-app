"use strict";
let player1Turn = true;
let player2Turn = false;
const gamecells = document.querySelectorAll('.gamecell');
const changePlayersTurn = () => {
    player1Turn = !player1Turn;
    player2Turn = !player2Turn;
};
gamecells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        const imgElem = document.createElement('img');
        // Prevent clicking on filled cell
        if (cell.hasChildNodes())
            return;
        if (player1Turn) {
            imgElem.src = './public/icons/cross.svg';
            cell.appendChild(imgElem);
            changePlayersTurn();
        }
        else {
            imgElem.src = './public/icons/circle.svg';
            cell.appendChild(imgElem);
            changePlayersTurn();
        }
    });
});
