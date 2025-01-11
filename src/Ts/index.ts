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

const appendIconToCell = (imgElem: HTMLImageElement, cell: HTMLDivElement, icon: string) => {
	imgElem.src = `./public/icons/${icon}.svg`
	cell.appendChild(imgElem)
}

gamecells.forEach((cell) => {
	cell.addEventListener('click', (e) => {
		const imgElem = document.createElement('img')
		const playerDataPosition = cell.getAttribute('data-position')

		// Prevent clicking on filled cell
		if (cell.hasChildNodes()) return

		if (player1Turn) {
			appendIconToCell(imgElem, cell, 'cross')

			player1Selection.push(playerDataPosition)

			changePlayersTurn()
		} else {
			appendIconToCell(imgElem, cell, 'circle')

			player2Selection.push(playerDataPosition)

			changePlayersTurn()
		}
	})
})
