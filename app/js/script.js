const letteraPattern = /[A-Za-z]/
let guessCount = 1;
let currentGuess = document.querySelector("#guess" + guessCount);
let currentLetters = currentGuess.dataset.letters;

// detect keypress (letter, backspace, others)
document.addEventListener('keydown', (e) => {

	let keyPress = e.key

	//letter
	if (keyPress.length == 1 && letteraPattern.test(e.key)) {
		updateLetters(keyPress);
	}
	 
	//backspace
	else if (keyPress == "Backspace"){
		deleteLetter();
	}
})

// update "letters"
const updateLetters = (letter) => {
	currentGuess.dataset.letters = currentGuess.dataset.letters + letter;
	let currentTile = currentGuess.dataset.letters.length;
	updateMarkup(currentTile, letter)
}

//update tiles based on "letters"
const updateMarkup = (tileNumber, letter) => {
	document.querySelector("#guessTile" + tileNumber).innerHTML = letter;
}

// delete last letter
const deleteLetter = () => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters.slice(0, -1);
	currentGuess.dataset.letters = newLetters;
	let currentTile = currentGuess.dataset.letters.length+1;
	deleteMarkup(currentTile);
}

//delete markup
const deleteMarkup = (tileNumber) => {
	document.querySelector("#guessTile" + tileNumber).innerHTML = null;
}