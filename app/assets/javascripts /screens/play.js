game.PlayScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		// Play BG Music
		// me.audio.playTrack("DST-InertExponent");

		// Load Level 1
		me.levelDirector.loadLevel('someword')

		// reset the score
		game.data.score = 0;
		
		// add our HUD to the game world	
		// game.HUD.add(new game.HUD.Container());
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		// me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);

		// Stop BG Music
		me.audio.stopTrack();
	}
});