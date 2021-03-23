
import { Game } from "./Game"

describe('TicTacToe game', () => {
    let game : Game;

    beforeEach(() => {
        game = new Game();
    });

    it('should not allow player O to play first', () => {
        expect(() => game.play('O', 0, 0)).toThrow();
    });

    it('should not allow player x to play twice in a row', () =>{
        game.play('X', 0, 0);
        expect(() => game.play('X', 1, 0)).toThrow();
    });
    
    it('should not allow a player to play in last played position', () => {
        game.play('X', 0, 0);
        expect(() => game.play('O', 0, 0)).toThrow();
    });
    
    it('should not allow a player to play in any played position', () => {
        game.play('X', 0, 0);
        game.play('O', 1, 0);
        expect(() => game.play('X', 0, 0)).toThrow();
    });
    
    it('should declare player X as winner if it plays three in top row', () =>{
        game.play('X', 0, 0);
        game.play('O', 1, 0);
        game.play('X', 0, 1);
        game.play('O', 1, 1);
        game.play('X', 0, 2);
        
        var winner = game.winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in top row', () => {
        game.play('X', 1, 0);
        game.play('O', 0, 0);
        game.play('X', 1, 1);
        game.play('O', 0, 1);
        game.play('X', 2, 2);
        game.play('O', 0, 2);
        
        var winner = game.winner();
        
        expect(winner).toBe("O");
    });
    
    it('should declare player X as winner if it plays three in middle row', () => {
        game.play('X', 1, 0);
        game.play('O', 0, 0);
        game.play('X', 1, 1);
        game.play('O', 0, 1);
        game.play('X', 1, 2);
       
        var winner = game.winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in middle row', () => {
        game.play('X', 0, 0);
        game.play('O', 1, 0);
        game.play('X', 2, 1);
        game.play('O', 1, 1);
        game.play('X', 2, 2);
        game.play('O', 1, 2);
        
        var winner = game.winner();
        
        expect(winner).toBe("O");
    });
    
    it('should declare player X as winner if it plays three in bottom row', () => {
        game.play('X', 2, 0);
        game.play('O', 0, 0);
        game.play('X', 2, 1);
        game.play('O', 0, 1);
        game.play('X', 2, 2);
        
        var winner = game.winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in bottom row', () => {
        game.play('X', 0, 0);
        game.play('O', 2, 0);
        game.play('X', 1, 1);
        game.play('O', 2, 1);
        game.play('X', 0, 1);
        game.play('O', 2, 2);
        
        var winner = game.winner();
        
        expect(winner).toBe("O");
    });
});
