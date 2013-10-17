game.StoryScreen = me.ScreenObject.extend({ 

	init: function() {

		this.parent(true);


		// title screen image
        this.title = null;

        this.scrollerfont = null;
        this.tween = null;


		this.scroller = "THE SWEETEST AND\n\n\n SMARTEST OF ALL\n\n\n MEN AND THE LOVE\n\n\n OF MY LIFE,\n\n\n ROGER, CREATED \n\n\nTIME TRAVEL.\n\n\n UNFORTUNATLEY\n\n\nROGER HAS \n\n\nLANDED IN THE \n\n\nHANDS OF THE\n\n\n EVIL WITCHES \n\n\n FROM WITCHWORLD\n\n\n AND IT IS UP TO\n\n\n ME TO SAVE HIM!\n\n\n IT SEEMS AS IF\n\n\n THE WITCHES\n\n\n HAVE TAKEN ROGER \n\n\nTO A PREHISTORIC\n\n\n LAND VOID\n\n\n OF ALL HUMANS.……\n\n\n OH NO! \n\n\nWHO IS THAT\n\n\nNONE OTHER THAN\n\n\n THE CLONES OF \n\n\nROGER'S EX,\n\n\n ROSEFLOWER!";


		

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
        	storyY: -1700
    		}, 17000).start();

			// enable the keyboard
        	me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	    },
	 
	    // update function
	    update: function() {
	    	 // enter pressed ?
	   

	        if (me.input.isKeyPressed('enter')){ //|| this.storyY === -1500) {
	            me.state.change(me.state.PLAY);
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

