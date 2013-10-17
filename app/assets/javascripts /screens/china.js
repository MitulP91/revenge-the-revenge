game.ChinaScreen = me.ScreenObject.extend({ 

	init: function() {

		this.parent(true);


		// title screen image
        this.title = null;

        this.scrollerfont = null;
        this.tween = null;


		this.scroller = "ROSEFLOWER HAS NOTHING ON ME..\n BUT THOSE MEDLY WITCHES MOVED ROGER\n TO THE AGE OF ANCIENT CHINA…\n LIKE A COUPLE OF DRAGONS WILL KEEP ME FROM MY\n ONE AND ONLY ROG… BRING IN ON WITCHES!";


		

		},

	
		// reset function
	    onResetEvent: function() {

	    	 if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("Time_Travel_Watch");
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
        	}

        	this.storyX = 50;
			this.storyY = 500;
			//did not add animation tween yet
			this.tween = new me.Tween(this).to({
        	storySize: 0,
        	storyX: 50,
        	storyY: -100
    		}, 9000).start();

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

