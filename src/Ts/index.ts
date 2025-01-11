let player1Turn: boolean = true
let player2Turn: boolean = false

let player1Selection: (string | null)[] = []
let player2Selection: (string | null)[] = []

let player1Score: number = 0
let player2Score: number = 0

// Dom element's
const gamecells = document.querySelectorAll<HTMLDivElement>('.gamecell')
const playerTurnStatus = document.querySelector('.player-turn-status') as HTMLImageElement // prettier-ignore
const winnerModal = document.querySelector('.winner-modal') as HTMLDivElement
const closeModalIcon = document.querySelector('.close-modal-icon') as HTMLImageElement // prettier-ignore
const modalDesc = document.querySelector('.winner-modal-desc') as HTMLDivElement // prettier-ignore
const drawModal = document.querySelector('.draw-modal') as HTMLDivElement // prettier-ignore

// winningCombinations
const winningCombinations: number[][] = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

// Function's
const changePlayersTurn = () => {
	player1Turn = !player1Turn
	player2Turn = !player2Turn
}

const setPlayerTurnStatus = () => {
	if (player1Turn) {
		playerTurnStatus.src = './public/icons/cross.svg'
	} else {
		playerTurnStatus.src = './public/icons/circle.svg'
	}
}

const showWinnerModal = (icon: string) => {
	const winnerIcon = document.querySelector('.winner-icon') as HTMLImageElement

	winnerIcon.src = `./public/icons/${icon}.svg`

	modalDesc.classList.remove('hide')
	drawModal.classList.add('hide')
	
	winnerModal.classList.add('show-modal')
	winnerModal.classList.remove('close-modal')

	resetGame()
}

const closeWinnerModal = () => {
	winnerModal.classList.add('close-modal')
}

const appendIconToCell = (
	imgElem: HTMLImageElement,
	cell: HTMLDivElement,
	icon: string
) => {
	imgElem.src = `./public/icons/${icon}.svg`
	cell.appendChild(imgElem)
}

const checkWinner = (playerSelection: (string | null)[]) => {
	const selectedPositions = playerSelection.map(Number)

	for (const combination of winningCombinations) {
		if (combination.every((pos) => selectedPositions.includes(pos))) {
			return true
		}
	}

	return false
}

const isBoardFull = (): boolean => {
	return Array.from(gamecells).every((cell) => cell.hasChildNodes())
}

const handleTieGame = () => {
	drawModal.classList.remove('hide')
	modalDesc.classList.add('hide')

	winnerModal.classList.add('show-modal')
	winnerModal.classList.remove('close-modal')

	resetGame()
}

const resetPlayersSelections = () => {
	player1Selection = []
	player2Selection = []
}

const setPlayerScore = (player: number) => {
	const player1ScoreElem = document.querySelector('.player1-score') as HTMLSpanElement // prettier-ignore
	const player2ScoreElem = document.querySelector('.player2-score') as HTMLSpanElement // prettier-ignore

	if (player === 1) {
		player1ScoreElem.innerHTML = String((player1Score += 1))
	} else {
		player2ScoreElem.innerHTML = String((player2Score += 1))
	}
}

const resetCells = () => {
	gamecells.forEach((cell) => {
		cell.innerHTML = ''
	})
}

const resetGame = () => {
	resetCells()
	resetPlayersSelections()
	player1Turn = true
	player2Turn = false
	setPlayerTurnStatus()
}

// Event's
gamecells.forEach((cell) => {
	cell.addEventListener('click', (e) => {
		const imgElem = document.createElement('img')
		const playerDataPosition = cell.getAttribute('data-position')

		// Prevent clicking on filled cell
		if (cell.hasChildNodes()) return

		if (player1Turn) {
			appendIconToCell(imgElem, cell, 'cross')

			player1Selection.push(playerDataPosition)

			if (checkWinner(player1Selection)) {
				showWinnerModal('cross')
				setPlayerScore(1)
				return
			}

			changePlayersTurn()
		} else {
			appendIconToCell(imgElem, cell, 'circle')

			player2Selection.push(playerDataPosition)

			if (checkWinner(player2Selection)) {
				showWinnerModal('circle')
				setPlayerScore(2)
				return
			}

			changePlayersTurn()
		}

		if (isBoardFull()) {
			handleTieGame()
			return
		}
		setPlayerTurnStatus()
	})
})

closeModalIcon.addEventListener('click', closeWinnerModal)
