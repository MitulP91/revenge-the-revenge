game.ChinaScreen = me.ScreenObject.extend({ 

	init: function() {

		this.parent(true);


		// title screen image
        this.title = null;

        this.scrollerfont = null;
        this.tween = null;


		this.scroller = "ROSEFLOWER HAS \n\n\n NOTHING ON ME...\n\n\n BUT THOSE MEDLY \n\n\nWITCHES MOVED ROGER\n\n\nTO THE AGE OF\n\n\nANCIENT CHINA…\n\n\nLIKE A COUPLE\n\n\nOF DRAGONS\n\n\nWILL KEEP ME FROM MY\n\n\nONE AND ONLY ROG…\n\n\nBRING IN ON WITCHES!";


		

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
        	storyY: -300
    		}, 12000).start();

			// enable the keyboard
        	me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	    },
	 
	    // update function
	    update: function() {
	    	 // enter pressed ?
	        if (me.input.isKeyPressed('enter')) {
	            // me.state.change(me.state.PLAY);
	            me.levelDirector.loadLevel('someword');
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

