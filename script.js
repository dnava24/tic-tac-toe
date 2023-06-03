const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')
const startCells = [
    '','','','','','','','',''
]
let go = 'circle'
infoDisplay.textContent = "Circle goes first"

function createBoard(){
    startCells.forEach((cell, index)=>{
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.classList.add('square')
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
    //added
    showRestartButton();
    //end
}
createBoard()

function addGo(e){
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === 'circle' ? 'cross': 'circle'
    infoDisplay.textContent = "it is now " + go + "'s go."
    e.target.removeEventListener('click', addGo)
    e.target.removeEventListener("touchstart", addGo);
    checkScore()
}

function checkScore(){
    const allSquare = document.querySelectorAll('.square')
    console.log(allSquare);
    const winningCombos = [
    [0,1,2],[3,4,5], [6,7,8],
    [0,3,6],[1,4,7], [2,5,8],
    [0,4,8], [2,4,6]]

//added
let circleWon = false;
let crossWon = false;
//end
   
    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            allSquare[cell].firstChild?.classList.contains('circle'))
            if (circleWins){
                
                circleWon = true;

            infoDisplay.textContent = "Circle Wins!"
            // allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
            }
    })
    
    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>
            allSquare[cell].firstChild?.classList.contains("cross"))
        if (crossWins) {

            crossWon = true;
            
            infoDisplay.textContent = "Cross Wins!";
            // allSquare.forEach(square => square.replaceWith(square.cloneNode(true)));
            return}
    })

     if (circleWon || crossWon) {
				showRestartButton();
			}
}

function showRestartButton() {
	const restartButton = document.querySelector("#restart");
	if (!restartButton) {
		const newRestartButton = document.createElement("button");
		newRestartButton.textContent = "Restart";
		newRestartButton.setAttribute("id", "restart");
		newRestartButton.addEventListener("click", restartGame);
		gameBoard.parentNode.insertBefore(newRestartButton, gameBoard.nextSibling);
	}
}

function restartGame() {
	const allSquare = document.querySelectorAll(".square");
	allSquare.forEach((square) => {
		square.innerHTML = ""; // Clear the content of each square
		square.addEventListener("click", addGo); // Re-add the event listener for each square
		// Add touch event listener for mobile devices
		square.addEventListener("touchstart", addGo);
	});
	infoDisplay.textContent = "Circle goes first";
}