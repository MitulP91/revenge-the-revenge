// Game Namespace
var game = {

	// Object to Store Score
	data : {
		// score
		score : 0,
        hp : 3,
        startTime: 0
	},

    andrewMaddenIsAwesome: function() {
        game.data.hp = 999;
        me.game.getEntityByProp('name', 'mainPlayer')[0].hp = 999;
    },

    andrewMaddenCanFly: function() {
        me.game.getEntityByProp('name', 'mainPlayer')[0].gravity = 0;
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.bindKey(me.input.KEY.W,     "up");
        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.S,     "down");
        me.input.bindKey(me.input.KEY.D,     "right");
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
        // User Custom Screens
        // var myStories = {
        //     STORY : me.state.USER + 0,
        //     CHINA : me.state.USER + 1,
        //     TIMEWARP : me.state.USER + 2,
        //     ROGER : me.state.USER + 3
        // };

        // Set the Title Screen Object
        me.state.set(me.state.MENU, new game.TitleScreen());

        // Set the Play Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Set Game Over Screen Object
        me.state.set(me.state.GAMEOVER, new game.EndScreen());

        // Set Story Screens
        me.state.STORY = me.state.USER + 1;
        me.state.CHINA = me.state.USER + 2;
        me.state.TIMEWARP = me.state.USER + 3;
        me.state.ROGER = me.state.USER + 4;

        
        me.state.set(me.state.STORY, new game.StoryScreen());
        me.state.set(me.state.CHINA, new game.ChinaScreen());  
        me.state.set(me.state.TIMEWARP, new game.TimewarpScreen()); 
        me.state.set(me.state.ROGER, new game.RogerScreen());

        //final animation
        //me.state.set(me.state.LOVE, new game.LOVEScreen());

        // Set End Game Screen
        me.state.set(me.state.GAME_END, new game.WinScreen());

        // Set Transition Between States
        me.state.transition("fade", "#FFFFFF", 250);

         // Add Player Entity to Entity Pool
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        me.entityPool.add("CoinEntity", game.CoinEntity);
        
        
        me.entityPool.add("RogerEntity", game.RogerEntity);
        me.entityPool.add("nextLevel", game.LevelEntity);
        me.entityPool.add("EnemyEntity", game.EnemyEntity);
        me.entityPool.add("EnemyEntity2", game.EnemyEntity2);
        me.entityPool.add("EnemyEntity3", game.EnemyEntity3);
        me.entityPool.add("AlasandraEntity", game.AlasandraEntity);
        me.entityPool.add("OtherRogEntity", game.RogerEntity2);

        // Enable Keyboard Bindings
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,     "jump");
        me.input.bindKey(me.input.KEY.SHIFT,     "shoot");
        me.input.bindKey(me.input.KEY.ALT,     "melee");
        me.input.bindKey(me.input.KEY.DOWN,     "down");



        // Start the Game
        me.state.change(me.state.MENU);
    }
};
