export class Game {

    private _lastSymbol: string = 'O';
    private _board: Board = new Board();

    /* SMELL: LONG PARAMETER LIST  */
    public play(symbol: string, x: number, y: number) : void {
        if (this.canPlayNext(symbol) === false) {
            throw new Error("Invalid next player");
        }

        if (this.isTileTaken(x, y)) {
            throw new Error("Invalid position");
        }

        this.makeMove(symbol, x, y);
    }

    canPlayNext(symbol: string): boolean {
        return symbol !== this._lastSymbol;
    }

    isTileTaken(x: number, y: number): boolean {
         return this._board.symbolAt(x, y) != ' ';
    }

    makeMove(symbol: string, x: number, y: number): void {
        this._lastSymbol = symbol;
        this._board.addTileAt(symbol, x, y);
    }

    /* SMELL: DUPLICATED CODE */
    public winner() : string {
        
        let winner = ' ';

        winner = this.winnerOnRow(0);
        if (winner != ' ') {
            return winner;
        }

        winner = this.winnerOnRow(1);
        if (winner != ' ') {
            return winner;
        }

        winner = this.winnerOnRow(2);
        if (winner != ' ') {
            return winner;
        }

        return winner;
    }

    /* SMELL: FEATURE ENVY */
    winnerOnRow(row: number): string {
        if (this._board.symbolAt(row, 0) != ' ' &&
            this._board.symbolAt(row, 0) == this._board.symbolAt(row, 1) &&
            this._board.symbolAt(row, 2) == this._board.symbolAt(row, 1)) {
            return this._board.symbolAt(row, 0);
        }

        return ' ';
    }
    
}

interface Tile
{
    /* SMELL: PRIMITIVE OBSESSION */
    X: number;
    Y: number;
    Symbol: string;
}

class Board
{

    private _tiles : Tile[] = [];

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._tiles.push(tile);
            }
        }
    }


    public symbolAt(x:  number, y: number): string {
        const tile = this._tiles.find((t:Tile) => t.X == x && t.Y == y)
        if (tile !== undefined) {
            return tile.Symbol
        } 
        return " "
    }

    /* SMELL: LONG PARAMETER LIST */
    public addTileAt(symbol: string, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        this._tiles.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}