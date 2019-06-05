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
        
        // if (num < 1 || num > 100 || typeof num !== 'number') {
        if (num < 1 || num > 1000 || typeof num !== 'number') {
            throw 'That is an invalid guess.';
        } else {
            this.playersGuess = num;
            this.checkGuess();
        }
        


    }

    checkGuess() {
        let feedbackText,
            displayBox,
            previousGuess;

        if (this.playersGuess === this.winningNumber) {
            feedbackText = `You Win! Looking for ${this.winningNumber}.`;
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            feedbackText = 'You have already guessed that number.';
        } else {
            this.pastGuesses.push(this.playersGuess);

            // if (this.count >= 5) return 'You Lose.';
            this.count++;

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

            switch (true) {
                case this.difference() <= 5:
                    feedbackText = "So close. (within 5)";
                    break;
                case this.difference() <= 10:
                    feedbackText = "Red Hot. (within 10)";
                    break;
                case this.difference() <= 15:
                    feedbackText = "Getting Hot. (within 15)";
                    break;
                case this.difference() <= 25:
                    feedbackText = "Great guess. (within 25)";
                    break;
                case this.difference() <= 50:
                    feedbackText = "Getting warmer. (within 50)";
                    break;
                case this.difference() <= 75:
                    feedbackText = "Getting warm. (within 75)";
                    break;
                case this.difference() <= 100:
                    feedbackText = "You're in the Ballpark. (within 100)";
                    break;
                case this.difference() <= 200:
                    feedbackText = "You're a bit chilly. (within 200)";
                    break;
                case this.difference() > 200:
                    feedbackText = "You're ice cold! (off by over 200)";
            }

            previousGuess = document.getElementById(`guess${this.count}`);
            previousGuess.innerHTML = this.playersGuess;
        }

        if (this.count === 10) {
            feedbackText = `Sorry, you Lose.  Looking for ${this.winningNumber}.`;
        }

        if (this.count <= 10) {
            displayBox = document.getElementById("finalMessage");
            displayBox.innerHTML = feedbackText;
        }  
    }

    // provideHint() {
    //     let nums = [this.winningNumber];

    //     nums.push(generateWinningNumber());
    //     nums.push(generateWinningNumber());

    //     return shuffle(nums);
    // }

    provideHint() {
        if (!document.getElementById("finalMessage").innerHTML.includes('Looking for')) {
            if (this.isLower()) return "Guess Higher";
            else return "Guess Lower";
        } else return '';
    }
}

function newGame() {
    return new Game();  
}

function playGame() {
    let game = newGame();

    const button = document.getElementById("submitButton");
    const input = document.getElementById("getGuess");

    const hintButton = document.getElementById("hintButton");
    const secondMessage = document.getElementById("hintMessage")

    const restart = document.getElementById("restart")

    button.addEventListener('click', function () {
        //PLUS CONVERTS A STRING TO A NUMBER
        //IT SAYS TO MAKE SOMETHING POSITIVE
        //SO IT HAS TO CONVERT IT INTO A NUMBER
        //MINUS SIGN WILL ALSO CONVERT TO A NUMBER AND MAKE NEGATIVE
        const guess = +input.value;

        input.value = '';
        secondMessage.innerHTML = '';

        if (!document.getElementById("finalMessage").innerHTML.includes('You Win!')) {
            game.playersGuessSubmission(guess);

            // alert(guess);
            // alert(game.count);
            // alert(game.winningNumber);
        }
    })

    hintButton.addEventListener('click', function() {
        secondMessage.innerHTML = game.provideHint();
    })

    restart.addEventListener('click', function() {
        game = newGame();
    })
}

playGame();




