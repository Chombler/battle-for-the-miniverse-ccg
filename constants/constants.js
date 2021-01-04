
const Constants = {
	hand : {
		PLAYER_X : 75,
		PLAYER_Y : 350,
		PLAYER_FILL_COLOR : 'Green',

		OPPONENT_X : 75,
		OPPONENT_Y : 0,
		OPPONENT_FILL_COLOR : 'Red',
		
		WIDTH : 250,
		HEIGHT : 100
	},

	board : {
		PATH : '/images/board',
		IMG_KEYS : ['heights', 'ground', 'void'],
		X : 150,
		Y : 100,
		WIDTH : 500,
		HEIGHT : 125,
		LANE_WIDTH : 500 / 5
	},

	card : {
		WIDTH : 75,
		HEIGHT : 75
	}
}

module.exports = Constants;