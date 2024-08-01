import * as readline from 'readline';
import Game from './game';


let playAgain = true;

// Readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Wrapper for readline.question that returns a promise
 * @param question text to display to the user
 * @returns trimmed lowercase answer from the user
 */
const askYesNoQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim().toLowerCase());
        });
    });
};

let playerStarts = false;

/**
 * Game start/options
 */
const main = async () => {

    console.log('WELCOME TO TIC TAC TOE!\n');
    
    while (playAgain) {
        let validAnswer = false;

        // Prompt the user if they want to make the first move
        while (!validAnswer) {
            const answer = await askYesNoQuestion('Do you want to make the first move? (y/n): ');
            if (answer === 'y') {
                playerStarts = true;
                validAnswer = true;
            } else if (answer === 'n') {
                playerStarts = false;
                validAnswer = true;
            } else {
                // Repeat the question if the answer is invalid
                console.log('Invalid answer. Please answer with y or n.');
            }
        }
    
        // Begin the game
        const game = new Game(playerStarts, rl);
    
        // Wait for game to finish and present the winner
        const winner = await game.start();

        console.log(winner);

        // Propmt the user if they want to play again
        const answer = await askYesNoQuestion('Do you want to play again? (y/n): ');
        if (answer === 'y') {
            playAgain = true;
        } else {
            playAgain = false;
        }
    }
};

main().then(() => {
    console.log('Thanks for playing!');
    rl.close();
    process.exit(0);
});

