import { INVALID_MOVE } from 'boardgame.io/core';

export const Battle = {
	name: 'battle',

	setup: function(){
		return({
			board: Array(10).fill(null)
		});
	},

	turn: {
		moveLimit: 1,
	},

	moves: {
		clickLocation: function(G, ctx, id){
			if(G.board[id] !== null){
				return INVALID_MOVE;
			}
			G.board[id] = ctx.currentPlayer;
		}
	},
}

