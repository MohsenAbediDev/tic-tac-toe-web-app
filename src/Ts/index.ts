let player1Turn: boolean = true
let player2Turn: boolean = false

let player1Selection: (string | null)[] = []
let player2Selection: (string | null)[] = []

const gamecells = document.querySelectorAll<HTMLDivElement>('.gamecell')

const winningCombinations: Number[][] = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

const changePlayersTurn = () => {
	player1Turn = !player1Turn
	player2Turn = !player2Turn
}

gamecells.forEach((cell) => {
	cell.addEventListener('click', (e) => {
		const imgElem = document.createElement('img')
		const playerDataPosition = cell.getAttribute('data-position')

		// Prevent clicking on filled cell
		if (cell.hasChildNodes()) return

		if (player1Turn) {
			imgElem.src = './public/icons/cross.svg'
			cell.appendChild(imgElem)

			player1Selection.push(playerDataPosition)

			changePlayersTurn()
		} else {
			imgElem.src = './public/icons/circle.svg'
			cell.appendChild(imgElem)

			player2Selection.push(playerDataPosition)

			changePlayersTurn()
		}
	})
})
