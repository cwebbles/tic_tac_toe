

export default class Board {
    private _board: string[];

    constructor() {
        this._board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    }

    /**
     * Checks if the move is valid
     * @param location 
     * @returns true or false
     */
    public validMove(location: number): boolean {
        return this._board[location] === ' ';
    }

    get board(): string[] {
        return this._board;
    }

    /**
     * Checks for a full board
     * @returns 
     */
    public isFull(): boolean {
        return this._board.every((space) => space !== ' ');
    }

    /**
     * Adds move to the board. If the space is already taken, it will not add the move. 
     * validMove is called before this function to ensure the move is valid.
     * @param location 
     * @param symbol 
     */
    public addMove(location: number, symbol: string) {
        if (this._board[location] === ' ') {
            this._board[location] = symbol;
        }
    }

    /**
     * Check if the given player has won
     * @param symbol 
     * @returns 
     */
    public checkWin(symbol: string): boolean {
        return (this._board[0] === symbol && this._board[1] === symbol && this._board[2] === symbol) ||
               (this._board[3] === symbol && this._board[4] === symbol && this._board[5] === symbol) ||
               (this._board[6] === symbol && this._board[7] === symbol && this._board[8] === symbol) ||
               (this._board[0] === symbol && this._board[3] === symbol && this._board[6] === symbol) ||
               (this._board[1] === symbol && this._board[4] === symbol && this._board[7] === symbol) ||
               (this._board[2] === symbol && this._board[5] === symbol && this._board[8] === symbol) ||
               (this._board[0] === symbol && this._board[4] === symbol && this._board[8] === symbol) ||
               (this._board[2] === symbol && this._board[4] === symbol && this._board[6] === symbol);
    }

    public printBoard() {
        console.log(`
        ${this._board[0]} | ${this._board[1]} | ${this._board[2]}
        ---------
        ${this._board[3]} | ${this._board[4]} | ${this._board[5]}
        ---------
        ${this._board[6]} | ${this._board[7]} | ${this._board[8]}
        `);
    }

    public printBoardNumbers() {
        console.log(`
        1 | 2 | 3
        ---------
        4 | 5 | 6
        ---------
        7 | 8 | 9
        `);
    }
}