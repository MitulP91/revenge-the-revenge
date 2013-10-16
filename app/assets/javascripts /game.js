
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},
	
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 640, 480, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

        // Render Debug Hitbox
        // me.debug.renderHitBox = true;

        // Initialize the audio.
        // me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
     
        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    "loaded" : function () {
        // Set the Title Screen Object
        me.state.set(me.state.MENU, new game.TitleScreen());

        // Set the Play Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Set Game Over Screen Object
        me.state.set(me.state.GAMEOVER, new game.EndScreen());

        // Set Transition Between States
        me.state.transition("fade", "#FFFFFF", 250);

         // Add Player Entity to Entity Pool
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        me.entityPool.add("CoinEntity", game.CoinEntity);
        me.entityPool.add("EnemyEntity", game.EnemyEntity);

        // Enable Keyboard Bindings
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.Z,     "shoot", true);

        // Start the Game.
        me.state.change(me.state.MENU);
    }
};
