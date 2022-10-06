const letteraPattern = /[A-Za-z]/
let guessCount = 1;
let currentGuess = document.querySelector("#guess" + guessCount);
let currentLetters = currentGuess.dataset.letters;
const words = ['apple', 'baker', 'bread', 'hello', 'floor'];
let solutionWord = "";

// choose a random word from array
const chooseWord = (array) => {
	let randomNumber = Math.floor(Math.random() * 10^array.length.toString.length);

	if (randomNumber < array.length){
		solutionWord = array[randomNumber];
	}
	else {
		chooseWord(array);
	}
}
chooseWord(words);
console.log(solutionWord)

// detect keypress (letter, backspace, enter, others)
document.addEventListener('keydown', (e) => {

	let keyPress = e.key

	// letter
	if (keyPress.length == 1 && letteraPattern.test(e.key) && currentGuess.dataset.letters.length < 5) {
		updateLetters(keyPress);
	}
	 
	// backspace
	else if (keyPress == "Backspace" && currentLetters != null){
		deleteLetter();
	}

	// enter
	else if (keyPress == "Enter" && currentGuess.dataset.letters.length == 5) {
		for (let i = 0; i<5; i++) {
			setTimeout(() => {
				revealTile(i,checkLetter(i))
			}, i * 200);
			checkLetter(i);
		}
	}
})

// update "letters"
const updateLetters = (letter) => {
	currentGuess.dataset.letters = currentGuess.dataset.letters + letter;
	let currentTile = currentGuess.dataset.letters.length;
	updateMarkup(currentTile, letter)
}

// update tiles based on "letters"
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

// delete markup
const deleteMarkup = (tileNumber) => {
	document.querySelector("#guessTile" + tileNumber).innerHTML = null;
}

// check letter to solution 
const checkLetter = (position) => {
	let guessedLetter = currentGuess.dataset.letters.charAt(position);
	let solutionLetter = solutionWord.charAt(position);

	// if match
	if (guessedLetter == solutionLetter) {
		return "match";
	}

	// if present
	else if (solutionWord.includes(guessedLetter)) {
		return "present";
	}

	// if does not exist
	else {
		return "absent";
	}
}

const revealTile = (i, status) => {
	console.log(i);
	console.log(status);
	let tileNumber = i + 1;
	let tile = document.querySelector('#guessTile' + tileNumber);

	tile.classList.add("flip-in");
	setTimeout(() => {
		tile.classList.add(status);
	}, 250);
	setTimeout(() => {
		tile.classList.add("flip-out")
	}, 250);

}