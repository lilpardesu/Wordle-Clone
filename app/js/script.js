const letteraPattern = /[A-Za-z]/
let guessCount = 1;
let currentGuess = document.querySelector("#guess" + guessCount);
let currentLetters = currentGuess.dataset.letters;

// detect keypress (letter, backspace, others)
document.addEventListener('keydown', (e) => {console.log("Keypress: " + e.key)

	//letter
	let keyPress = e.key;

	if (keyPress.length == 1 && letteraPattern.test(e.key)) {
		updateLetters(keyPress);
	}
	 

	//backspace

	//other
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

// delete last letter (and call update tiles)