game.StoryScreen = me.ScreenObject.extend({ 

	init: function() {

		this.parent(true);


		// title screen image
        this.title = null;

        this.scrollerfont = null;
        this.tween = null;


		this.scroller = "THE LOVE OF MY LIFE\n\nROGER IS THE SWEETEST\n\n AND SMARTEST OF ALL \n\nMEN. IN FACT HE CREATED \n\nTIME TRAVEL......\n\n\n\n UNFORTUNATELY ROGER HAS \n\nLANDED IN THE HANDS OF\n\n THE EVIL WITCHES \n\n FROM WITCHWORLD AND \n\nIT IS UP TO ME TO \n\nSAVE HIM.\n\n\n\n IT SEEMS AS IF\n\nTHE WITCHES\n\n HAVE TAKEN ROGER \n\nTO A PREHISTORIC\n\n LAND VOID\n\n OF ALL HUMANS....\n\n\n\n\n\n OH NO....\n\n\nWHO IS THAT???\n\n\nNONE OTHER THAN\n\n THE CLONES OF \n\nROGERS EX-GIRLFRIEND \n\nWITH THE STUPIDEST\n\n NAME ROSEFLOWER";

	},

	
		// reset function
	    onResetEvent: function() {

	    	 if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("Time_Warp");
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("atascii", 24);
        	}

        	this.storyX = 50;
			this.storyY = 500;
			//did not add animation tween yet
			this.tween = new me.Tween(this).to({
        	storySize: 0,
        	storyX: 50,
        	storyY: -1450
    		}, 25000).start();

			// enable the keyboard
        	me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	    },
	 
	    // update function
	    update: function() {
	    	 // enter pressed ?
	    	 // console.log(this.storyY);
	        if (me.input.isKeyPressed('enter') || this.storyY === -1450) {
	        	setTimeout(function() {
	        		me.state.change(me.state.PLAY)
	        	}, 0);
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

