game.PlayScreen = me.ScreenObject.extend({
	// On State Change
	onResetEvent: function() {	
		// Play BG Music
		// me.audio.playTrack("DST-InertExponent");

		// Load Level 1


		// me.levelDirector.loadLevel('someword');

		me.levelDirector.loadLevel('level2');

		// Reset the Score
		game.data.score = 0;
		game.data.hp = 3;
		game.data.startTime = me.timer.getTime();
		
		// Add HUD to Game World
		me.game.add(new game.HUD.Container());

		// Rebind Keys 
		me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,     "jump");
        me.input.bindKey(me.input.KEY.SHIFT,     "shoot");
        me.input.bindKey(me.input.KEY.ALT,     "melee");
	},
	
	
	// When Leaving Screen
	onDestroyEvent: function() {
		// remove the HUD from the game world
		// me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);

		// End Time
		endTime = (me.timer.getTime() - game.data.startTime)/1000;

		// Stop BG Music
		me.audio.stopTrack();
	}
});