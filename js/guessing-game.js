/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
    const num = Math.random() * 100;

    return Math.ceil(num);
}

//Fisher–Yates shuffle
function shuffle(array) {
    let m = array.length,
        t,
        i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

class Game {
    constructor() {
        this.count = 0;
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        const difference = this.playersGuess - this.winningNumber;

        return Math.abs(difference);
    }

    isLower() {
        return this.playersGuess < this.winningNumber;
    }

    playersGuessSubmission(num) {
        this.playersGuess = num;

        if (num < 1 || num > 100 || typeof num !== 'number') {
            throw 'That is an invalid guess.';
        } else {
            return this.checkGuess();
        }
    }

    checkGuess() {
        if (this.playersGuess === this.winningNumber) {
            return 'You Win!';
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.';
        } else {
            this.pastGuesses.push(this.playersGuess);
            this.count++;

            if (this.count >= 5) return 'You Lose.';
        }

        switch(true) {
            case this.difference() < 10:
                return "You're burning up!";
            case this.difference() < 25:
                return "You're lukewarm.";
            case this.difference() < 50:
                return "You're a bit chilly.";
            case this.difference() < 100:
                return "You're ice cold!";
        }
    }
}
