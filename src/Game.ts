import { timeLog } from "console";
import { isUndefined } from "util";

export class Game {

    /* SMELL: TEMPORARY FIELD */
    private _lastSymbol: string = ' ';
    private _board: Board = new Board();

    /* SMELL: SWITCH, LONG PARAMETER LIST, COMMENTS  */
    public Play(symbol: string, x: number, y: number) : void {
        //if first move
        if (this._lastSymbol == ' ') {
            //if player is X
            if (symbol == 'O') {
                throw new Error("Invalid first player");
            }
        }
        //if not first move but player repeated
        else if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }
        //if not first move but play on an already played tile
        else if (this._board.SymbolAt(x, y) != ' ') {
            throw new Error("Invalid position");
        }

        // update game state
        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    /* SMELL: DUPLICATED CODE, LONG METHOD, FEATURE ENVY, MESSAGE CHAIN, COMMENTS */
    public Winner() : string {
        
        let winner = ' ';

        winner = this.WinnerOnRow(0);
        if (winner != ' ') {
            return winner;
        }

        winner = this.WinnerOnRow(1);
        if (winner != ' ') {
            return winner;
        }

        winner = this.WinnerOnRow(2);
        if (winner != ' ') {
            return winner;
        }

        return winner;
    }

    /* SMELL: FEATURE ENVY, MESSAGE CHAIN */
    WinnerOnRow(row: number): string {
        if (this._board.SymbolAt(row, 0) != ' ' &&
            this._board.SymbolAt(row, 0) == this._board.SymbolAt(row, 1) &&
            this._board.SymbolAt(row, 2) == this._board.SymbolAt(row, 1)) {
            return this._board.SymbolAt(row, 0);
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


    public SymbolAt(x:  number, y: number): string {
        const tile = this._tiles.find((t:Tile) => t.X == x && t.Y == y)
        if (tile !== undefined) {
            return tile.Symbol
        } 
        return " "
    }

    /* SMELL: LONG PARAMETER LIST */
    public AddTileAt(symbol: string, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        this._tiles.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}