import * as readline from 'readline';
import Board from './board';

const USER = 'X';
const COMPUTER = 'O';

export default class Game {

    private board: Board = new Board();

    constructor(private playerStarts: boolean, private rl: readline.Interface) { }

    /**
     * Wrapper for different game loops
     * @returns the winner of the game
     */
    public async start() {
        this.board.printBoardNumbers();
        console.log("Press 'p' at any time to print the board numbers again.")
        if (this.playerStarts) {
            // User is the first player
            return this.loop(this.promptPlayer.bind(this), USER, 'You win!', this.promptComputer.bind(this), COMPUTER, 'Computer wins!');
        } else {
            // Computer is the first player
            return this.loop(this.promptComputer.bind(this), COMPUTER, 'Computer wins!', this.promptPlayer.bind(this), USER, 'You win!');
        }
    }

    /**
     * Main game loop
     * 
     * @param player1Move 
     * @param player1Symbol 
     * @param player1Victory 
     * @param player2Move 
     * @param player2Symbol 
     * @param player2Victory 
     * @returns 
     */
    public async loop(player1Move: () => Promise<number>, 
        player1Symbol: string, 
        player1Victory: string, 
        player2Move: () => Promise<number>, 
        player2Symbol: string, 
        player2Victory: string) {
        
        while (true) {
            // Check for a full board before prompting the next player
            if (this.board.isFull()) {
                return 'It\'s a tie!';
            }

            // Prompt first player
            let move = await player1Move();
            if (this.executeMove(player1Symbol, move)) {
                return player1Victory;
            }

            if (this.board.isFull()) {
                return 'It\'s a tie!';
            }

            // Prompt second player
            move = await player2Move();
            if (this.executeMove(player2Symbol, move)) {
                return player2Victory;
            }
        }
    }

    /**
     * Wrapper for readline.question that returns a promise
     * @param question text to display to the user
     * @returns answer from user
     */
    private askQuestion(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    };

    /**
     * Prompt for player move input
     * @returns valid space user has chosen to fill
     */
    public async promptPlayer() {
        let validAnswer = false;
        let move = 0;
        while (!validAnswer) {
            const answer = await this.askQuestion('Enter a space to fill (1-9): ');
            if (answer === 'p') {
                this.board.printBoardNumbers();
            } else if (this.isInteger(answer)) {
                move = parseInt(answer) - 1;
                if (move >= 0 && move <= 8) {
                    if (this.board.validMove(move)) {
                        validAnswer = true;
                    } else {
                        console.log('Invalid move. Please select an empty space.');
                    }
                } else {
                    console.log('Invalid move. Please enter a number between 1 and 9.');
                }
            } else {
                console.log('Invalid value. Please enter a number between 1 and 9.');
            }
        }
        return move;
    }

    /**
     * Execute selected valid move on board
     * @param player who made move
     * @param move location to fill
     * @returns true or false depending on if the player has won with that move
     */
    private executeMove(player: string, move: number) {
        this.board.addMove(move, player);
        this.board.printBoard();
        return this.board.checkWin(player);
    }

    /**
     * Comptuer logic
     * @returns random valid space for computer to fill
     */
    public async promptComputer() {
        console.log('Computer turn');
        const choices = this.board.board.map((space: string, index: number) => { if (space === ' ') return index; }).filter((index) => Number.isInteger(index));
        // Check if the result is an integer and if the conversion was successful
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex]!;
    }

    /**
     * Custom integer check
     * @param str 
     * @returns 
     */
    private isInteger(str: string): boolean {
        // Convert the string to a number
        const num = parseInt(str);
        
        // Check if the result is an integer and if the conversion was successful
        return Number.isInteger(num) && num.toString() === str;
      }
}