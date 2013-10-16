game.TitleScreen = me.ScreenObject.extend({
	// Constructor
	init: function() {
		this.parent(true);

		// Title Screen Image
		this.title = null;
		this.font = null;
		this.scrollerfont = null;
		this.scrollertween = null;

		///test scroll up
		this.storySize = 18;
		this.storyX = 300;
		this.storyY = -750;


    	//end



    	this.scroller = 'MITUL PATEL MADE A GAME CASSIE CREATED THE GREATEST WALL ';
		var scroller = this.scroller 
	},

	onResetEvent: function() {
		// If null, initialize the variables
		this.storySize = 18;
		this.storyX = 300;
		this.storyY = -750;


		if(this.title == null) {
			// Initialize background image
			this.title = me.loader.getImage('title_screen');

			// Initialize font
			this.font = new me.BitmapFont('32x32_font', 32);

			// Set the Scroller
			this.scrollerfont = new me.BitmapFont('32x32_font', 32);
		}

		// // Reset to default
		// this.scrollerpos = 640;

		// // Tween to Animate Arrow
  //   this.scrollertween = new me.Tween(this).to({
  //       scrollerpos: -850
  //   	}, 10000).onComplete(this.scrollover.bind(this)).start();

    	

		var tween = new me.Tween(this).to({
	        storySize: 0,
	        storyX: 300,
	        storyY: 0
	    }, 500).onComplete(this.scrollover.bind(this)).start();;

		// Enable the Keyboard
		me.input.bindKey(me.input.KEY.ENTER, 'enter', true);

		// Sound Effect
		// me.audio.play('cling');
	},

	// Tween Callback Function
	scrollover: function() {
		// Reset to Default
		// this.scrollerpos = 640;
		// 	this.scrollertween.to({
		// 		scrollerpos: -2200
		// 	},10000).onComplete(this.scrollover.bind(this)).start();
		// },

		
	this.storySize = 18;
 	this.storyX = 300;
	this.storyY = -700;


	this.tween.to( {
	       storySize: 0,
	        storyX: 300,
	         storyY: 0
	     }, 500)
	     .start();

	},

	


	update: function() {
		// If pressed
		if(me.input.isKeyPressed('enter')) {
			me.state.change(me.state.PLAY);
		}
		return true;
	},

	draw: function(context) {
		context.drawImage(this.title, 0, 0);
		this.scroller = 'MITUL PATEL MADE A GAME but Cassie created the greatest wall ';

		this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
		// this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
		this.scrollerfont.set('century gothic', this.storySize, 'black');
		
		
		this.scrollerfont.draw(context, this.scroller, this.storyY, this.storyX); 	
		
		
	},

	onDestroyEvent: function() {
		// Unbind the key
		me.input.unbindKey(me.input.KEY.ENTER);
	}

		// Just in Case
		// this.scrollertween.stop
		// this.tween.stop	}
});