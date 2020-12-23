
class Ability{

	constructor(flag, effect){
		this.flag = flag;
		this.effect = effect;
	}

	setFlag(flag){
		this.flag = flag;
	}

	setEffect(effect){
		this.effect = effect;
	}

	setEffectTarget(target){
		this.effect.target = target;
	}
}

/*
Effect
-Flag can be player input driven or automatic
-Flag when it occurs
-Target criteria
--Side
---Board
----Many
-----Lane
-----Group
----One
---Hand
---Deck
-Result*/