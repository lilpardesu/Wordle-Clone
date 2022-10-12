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
				revealTile(i,checkLetter(i));
			}, i * 200);
			checkLetter(i);
		}
	}
})

//check if it matches the solution word
const checkWin = () => {
	if (currentGuess.dataset.letters == solutionWord) {
		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				let tileNumber = i + 1;
				let tile = document.querySelector('#guess' + guessCount + 'Tile' + tileNumber);
				tile.classList.remove("flip-out");
				tile.classList.add("jump");
			}, i * 100);
		}
		console.log("game is won!")
	}
	else {
		guessCount = guessCount + 1;
		currentGuess = document.querySelector("#guess" + guessCount);
	}
}

// update "letters"
const updateLetters = (letter) => {
	currentGuess.dataset.letters = currentGuess.dataset.letters + letter;
	let currentTile = currentGuess.dataset.letters.length;
	updateMarkup(currentTile, letter)
}

// update tiles based on "letters"
const updateMarkup = (tileNumber, letter) => {
	document.querySelector("#guess" + guessCount + "Tile" + tileNumber).innerHTML = letter;
	let tile = document.querySelector('#guess' + guessCount + 'Tile' + tileNumber);

	tile.classList.add("has-letter");
	tile.classList.add("type-letter");
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
	document.querySelector("#guess" + guessCount + "Tile" + tileNumber).innerHTML = null;
	let tile = document.querySelector('#guess' + guessCount + 'Tile' + tileNumber);

	tile.classList.remove("has-letter")
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
	let tile =  document.querySelector('#guess' + guessCount + 'Tile' + tileNumber);

	tile.classList.add("flip-in");
	setTimeout(() => {
		tile.classList.add(status);
		tile.classList.remove("flip-in")
	}, 250);
	setTimeout(() => {
		tile.classList.add("flip-out")
	}, 250);

	if (i == 4) {
		setTimeout(() => {
			checkWin();
		}, 1000);
	}
}