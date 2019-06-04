/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
    // const num = Math.random() * 100;
    const num = Math.random() * 1000;

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

            // if (this.count >= 5) return 'You Lose.';
            if (this.count >= 10) return 'You Lose.';
        }

        // switch(true) {
        //     case this.difference() < 10:
        //         return "You're burning up!";
        //     case this.difference() < 25:
        //         return "You're lukewarm.";
        //     case this.difference() < 50:
        //         return "You're a bit chilly.";
        //     case this.difference() < 100:
        //         return "You're ice cold!";
        // }

        switch(true) {
            case this.difference() <= 5:
                return "So close. (within 5)";
            case this.difference() <= 10:
                return "Red Hot. (within 10)";
            case this.difference() <= 15:
                return "Getting Hot. (within 15)";
            case this.difference() <= 25:
                return "Great guess. (within 25)";
            case this.difference() <= 50:
                return "Getting warmer. (within 50)";
            case this.difference() <= 75:
                return "Getting warm. (within 75)";
            case this.difference() <= 100:
                return "You're in the Ballpark. (within 100)";
            case this.difference() > 150:
                return "You're a bit chilly. (off by over 150)";
            case this.difference() > 200:
                return "You're ice cold! (off by over 200)";
        }
    }

    // provideHint() {
    //     let nums = [this.winningNumber];

    //     nums.push(generateWinningNumber());
    //     nums.push(generateWinningNumber());

    //     return shuffle(nums);
    // }

    provideHint() {
        if (this.isLower()) return "Guess Higher";
        else return "Guess Lower";
    }
}

function newGame() {
    return new Game();
}




