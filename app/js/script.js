const letteraPattern = /[A-Za-z]/
let guessCount = 1;
let currentGuess = document.querySelector("#guess" + guessCount);
let currentLetters = currentGuess.dataset.letter;

// detect keypress (letter, backspace, others)
document.addEventListener('keydown', (e) => {console.log("Keypress: " + e.key)

	//letter
	let keyPress = e.key;

	if (keyPress.length == 1 && letteraPattern.test(e.key)) {
	    console.log(isLetter);
	}
	 

	//backspace

	//other
})

// updste "letters"
const updateLetters = (letter) => {
	console.log("guessCount: " + guessCount)
	console.log("currentLetters: " + currentLetters)

	currentLetters = currentLetters + letter
}

//update tiles based on "letters"

// delete last letter (and call update tiles)