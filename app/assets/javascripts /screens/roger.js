game.RogerScreen = me.ScreenObject.extend({ 

	init: function() {

		this.parent(true);


		// title screen image
        this.title = null;
        this.scrollerfont = null;
        this.tween = null;


		this.scroller = "I DEFEATED THE\n\n\nEVIL WITCHES FROM\n\n\nWITCHWORLD AND SAVED\n\n\n MY BELOVED ROGER!";


		

		},

	
		// reset function
	    onResetEvent: function() {

	    	 if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("Time_Warp");
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("atascii", 24);
        	}

        	this.storyX = 100;
			this.storyY = 500;
			//did not add animation tween yet
			this.tween = new me.Tween(this).to({
        	storySize: 0,
        	storyX: 100,
        	storyY: -500
    		}, 12000).start();

			// enable the keyboard
        	me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	    },
	 
	    // update function
	    update: function() {
	    	 // enter pressed ?
	        

	        if (me.input.isKeyPressed('enter')) {
	           // me.levelDirector.loadLevel('love');

	            me.state.change(me.state.GAME_END);
	        }
	        return true;
	    },
	 
	    // draw function
	    draw: function(context) {
	    	context.drawImage(this.title, 0, 0);
	    	this.scrollerfont.draw(context, this.scroller, this.storyX, this.storyY);
	    },
	 
	    // destroy function
	    onDestroyEvent: function() {
	    	 me.input.unbindKey(me.input.KEY.ENTER);
 
        		//just in case
        	this.tween.stop();

	    }
 
});