// TODO
game.PlayerEntity = me.ObjectEntity.extend({
	// Constructor
	init: function(x,y,settings) {
		// Call the Constructor
		this.parent(x,y,settings);

		// Set Vertical/Horizontal Speed
		this.setVelocity(5, 15);

		// adjust the bounding box
		this.updateColRect(8,48, -1,0);

		// Set Viewport to Follow Player
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		// Give Player HP
		this.hp = 3;

		// Date of Last HP Loss
		this.last_hp_loss = me.timer.getTime();

		// Date of Last Bullet Shot
		this.last_bullet_shot = me.timer.getTime();

		// Store walking direction
		this.walk_direction = false;

		// Set Type
		this.type = 'PLAYER';
	},

	update: function() {

		if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            this.walk_direction = true;
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            this.walk_direction = false;
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }

        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.jumping = true;

                // Play Sound
                // me.audio.play("jump");
            }
        }

        if(me.input.isKeyPressed('shoot')) {
        	if(me.timer.getTime() - this.last_bullet_shot > 500) {
	        	var shot = new ShotEntity(this.pos.x, this.pos.y, this.walk_direction);
	        	this.last_bullet_shot = me.timer.getTime();
	        	me.game.add(shot, this.z); 
				me.game.sort(); 
			} 
        }
        if(this.pos.y > 460) {
			me.state.change(me.state.GAMEOVER);

		}
        // Check and Update Player Movement
        this.updateMovement();

        // check for collision
		var res = me.game.collide(this);
		 
		if (res) {
			if (res.obj.type == me.game.ENEMY_OBJECT) {
			   if ((res.y>0) && !this.jumping) {
				  // bounce (force jump)
				  this.falling = false;
				  this.vel.y = -this.maxVel.y * me.timer.tick;
				  // set the jumping flag
				  this.jumping = true;
				  // play some audio
				  // me.audio.play("stomp");
			   } else {
				  // let's flicker in case we touched an enemy
				  this.renderable.flicker(45);
				  // me.audio.play("stomp");

				  if(this.hp === 3) {
				  	this.hp--;
				  	this.last_hp_loss = me.timer.getTime();
				  } else if(me.timer.getTime() - this.last_hp_loss > 3000) {
					this.hp--;
					this.last_hp_loss = me.timer.getTime();
				  }

				  if(this.hp === 0) {
				  	me.state.change(me.state.GAMEOVER);
				  }
			   }
			}
		}
		
        // Check if Animation Update is Needed 
        if(this.vel.x != 0 || this.vel.y != 0) {
        	// Update the Animation
        	this.parent();
        	return true;
        }
        // Else No Update
        return false;
	}
});

game.CoinEntity = me.CollectableEntity.extend({
	init: function(x,y,settings) {
		this.parent(x,y,settings);

		// Set Type
		this.type = me.game.COLLECTABLE_OBJECT;
	},

	// Checks for Collision With Coins
	onCollision: function(res, obj) {
		if(obj.type == 'PLAYER') {
			// Play Sound
			// me.audio.play("cling");

			// Increment HUD Score
			game.data.score += 250;

			// Can't Be Collected Twice
			this.collidable = false;

			// Remove It
			me.game.remove(this);
		}
	}
});

game.EnemyEntity = me.ObjectEntity.extend({
	init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "dragonenemy";
        settings.spritewidth = 180;
 
        // call the parent constructor
        this.parent(x, y, settings);
        this.gravity = 0;

 
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite
 
        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // walking & jumping speed
        this.setVelocity(1, 10);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        this.hp = 2;
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.hp--;
            if(this.hp === 0) {
            	me.game.remove(this);
            } else {
            	this.renderable.flicker(45);
            }
        }
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport) {
            return false;
 		}

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});

game.HUD = game.HUD || {};

 
game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();

		// persistent across level change
		this.isPersistent = true;

		// non collidable
		this.collidable = false;

		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";

		// add our child score object at position
		this.addChild(new game.HUD.ScoreItem(790, 560));
	}
});


/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend( {	
	/** 
	 * constructor
	 */
	init: function(x, y) {

		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 

		// create a font
		this.font = new me.BitmapFont("32x32_font", {x:24});
		this.font.alignText = "bottom";
		this.font.set("right", 1.6);

		// local copy of the global score
		this.score = -1;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't draw anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== me.game.score) {	
			this.score = me.game.score;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {
		this.font.draw (context, game.data.score, this.pos.x, this.pos.y);
	}
});

var ShotEntity = me.ObjectEntity.extend({
	init: function(x,y,walkingLeft) {
		var settings = {};
		settings.image = 'bullet';
		settings.spritewidth = 32;
		settings.spriteheight = 32;

		this.parent(x,y,settings);
		this.collidable = true;
		this.setVelocity(10, 1);

		this.walkingLeft = walkingLeft;
	
		this.gravity = 0;	

		this.type = 'SHOT';
	},

	update: function() {
		if(!this.visible) {
			this.collidable = false;
			me.game.remove(this);	
			return false;
		}

		if(this.walkingLeft) {
			this.vel.x -= this.accel.x * me.timer.tick;
			this.flipX(false);
		} else if(!this.walkingLeft) {
			this.vel.x += this.accel.x * me.timer.tick;
			this.flipX(true);
		} else {
			this.vel.x = 0;
		}

        // Check and Update Movement
        this.updateMovement();

        if(this.vel.x == 0) {
        	me.game.remove(this);
        	return false;
        }

        var res = me.game.collide(this);

        if(res) {
        	if(res.obj.type == me.game.ENEMY_OBJECT) {
        		me.game.remove(res.obj);
        		this.collidable = false;
        		me.game.remove(this);
        		return false;
        	} else if(res.obj.type != 'PLAYER' && res.obj.type != me.game.COLLECTABLE_OBJECT && res.obj.type != 'SHOT') {
        		this.collidable = false;
        		me.game.remove(this);
        		return false;
        	}  
        }
        return this.parent();
	},
});
