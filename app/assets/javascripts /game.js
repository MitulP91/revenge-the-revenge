// Game Namespace
var game = {

	// Object to Store Score
	data : {
		// score
		score : 0,
        hp : 3,
        startTime: 0
	},
	
    // Run on Page Load
    "onload" : function () {
        // Initialize the HTML5 Canvas Video
        if (!me.video.init("screen", 640, 480, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		// Add #Debug Capabilities (Remove for Production)
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

        // Initialize the audio.
        // me.audio.init("mp3,ogg");

        // Set a Callback for when Loading is Complete
        me.loader.onload = this.loaded.bind(this);
     
        // Load the Resources.
        me.loader.preload(game.resources);

        // Initialize MelonJS and Display a Loading Screen.
        me.state.change(me.state.LOADING);
    },



    // Run when Game Resources Loaded
    "loaded" : function () {
        // Set the Title Screen Object
        me.state.set(me.state.MENU, new game.TitleScreen());

        // Set the Play Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Set Game Over Screen Object
        me.state.set(me.state.GAMEOVER, new game.EndScreen());

        // Set Story Screen
        me.state.set(me.state.STORY, new game.StoryScreen());

        // Set End Game Screen
        me.state.set(me.state.GAME_END, new game.WinScreen());

        

        // Set Transition Between States
        me.state.transition("fade", "#FFFFFF", 250);

         // Add Player Entity to Entity Pool
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        me.entityPool.add("CoinEntity", game.CoinEntity);
        me.entityPool.add("EnemyEntity", game.EnemyEntity);
        me.entityPool.add("nextLevel", game.LevelEntity);
        me.entityPool.add("EnemyEntity2", game.EnemyEntity2);

        // Enable Keyboard Bindings
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.Z,     "shoot", true);
        me.input.bindKey(me.input.KEY.C,     "melee", true);

        // Start the Game
        me.state.change(me.state.MENU);
    }
};
