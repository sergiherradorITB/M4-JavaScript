const targetNumber = generateRandomNumber();
let attempts = 6;
let previousGuesses = [];

function generateRandomNumber() {
    return Math.floor(Math.random() * 100000);
}

function checkGuess() {
    const guessInput = document.getElementById("guess");
    const resultMessage = document.getElementById("result-message");
    const attemptsSpan = document.getElementById("attempts");
    const guessesContainer = document.getElementById("guesses-container");

    const guess = guessInput.value;

    if (guess.length !== 5 || isNaN(guess)) {
        resultMessage.textContent = "Ingresa un número válido de 5 dígitos.";
    } else if (guess === targetNumber) {
        resultMessage.textContent = "¡Felicidades! Has adivinado el número.";
        guessInput.disabled = true;
    } else {
        attempts--;
        attemptsSpan.textContent = attempts;

        if (attempts === 0) {
            resultMessage.textContent = `¡Agotaste tus intentos! El número correcto era ${targetNumber}.`;
            guessInput.disabled = true;
        } else {
            resultMessage.textContent = "Intenta de nuevo.";
            previousGuesses.push(guess);
            displayGuesses(guessesContainer);
        }
    }
    guessInput.value = '';
}

function displayGuesses(container) {
    const guessDivs = container.querySelectorAll(".guess");
    const lastGuessDiv = guessDivs[previousGuesses.length - 1];
    const guessValues = previousGuesses[previousGuesses.length - 1].split('');

    const digitDivs = lastGuessDiv.querySelectorAll(".initial");

    guessValues.forEach((value, index) => {
        if (value === targetNumber[index]) {
            digitDivs[index].classList.remove("initial");
            digitDivs[index].classList.add("correct-position");
        } else if (targetNumber.includes(value)) {
            digitDivs[index].classList.remove("initial");
            digitDivs[index].classList.add("incorrect-position");
        }
        digitDivs[index].textContent = value;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const guessButton = document.querySelector("button");
    guessButton.addEventListener("click", checkGuess);
});
