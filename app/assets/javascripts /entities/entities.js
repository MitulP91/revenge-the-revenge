var force_render = false;

// Create the Main Player Sprite
game.PlayerEntity = me.ObjectEntity.extend({
	// Constructor
	init: function(x,y,settings) {
		// Call the Constructor
		this.parent(x,y,settings);

		// Set Vertical/Horizontal Speed
		this.setVelocity(5, 15);

		// Set Viewport to Follow Player
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		// Give Player HP
		this.hp = 3;

		// Date of Last HP Loss
		this.last_hp_loss = me.timer.getTime();

		// Date of Last Bullet Shot
		this.last_bullet_shot = me.timer.getTime();

        // Date of Last Melee
        this.last_melee = me.timer.getTime();

		// Store walking direction
		this.walk_direction = false;

        // melee variable
        // this.melee_action = false;

		// Set Type
		this.type = 'PLAYER';

		// Set Animations
        this.renderable.addAnimation('walk', [0,1,2]);
        this.renderable.addAnimation('attack', [3,4]);
        this.renderable.addAnimation('stand', [0]);
        this.renderable.addAnimation('jump', [6,7]);

        // Set Default Animation
        this.renderable.setCurrentAnimation("walk");
        this.updateColRect(1, 28, -1, 55);
        // this.updateColRect(1, 40, -1, 55);
	},

	update: function() {
		// Set Movement Left and Right
		if (me.input.isKeyPressed('left')) {
            force_render = false;
			// Set Animation
			// this.renderable.setCurrentAnimation("walk");

            // Flip Sprite on Horizontal Axis and Fix Turnaround Bug
            if(this.walk_direction === false) {
                this.flipX(true);
                this.pos.x -= 55;
            }

            // Fix Collision Box of Player Sprite
            this.collisionBox.width = 100;
            if(this.collisionBox.width > 40) {
                // this.collisionBox.width -= 60;
                this.updateColRect(70, 28, -1, 55);
            }

            this.walk_direction = true;

            // Update the Entity Velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            force_render = false;
        	// Set Animation
        	// this.renderable.setCurrentAnimation("walk");

            // Unflip the Sprite and Alter Turnaround Issue for other Direction
            if(this.walk_direction === true) {
                this.flipX(false);
                this.pos.x += 55;
            }

            // Fix Collision Box of Player Sprite
            this.collisionBox.width = 100;
            if(this.collisionBox.width > 40) {
                // this.collisionBox.width -= 60;
                this.updateColRect(1, 28, -1, 55);
            }

            this.walk_direction = false;

            // Update the Entity Velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }

        // Set Motion for Jump
        if (me.input.isKeyPressed('jump')) {
            // Make Sure Jumping/Falling is not Already Occuring
            if (!this.jumping && !this.falling) {
                force_render = false;
               	// Set Jump Velocity
                this.vel.y = -this.maxVel.y * me.timer.tick;
                
                // Alter Jump Flag
                this.jumping = true;

                // Play Sound
                // me.audio.play("jump");
            }
        }

        // Set Action for Shoot
        if(me.input.isKeyPressed('shoot')) {
        	if(me.timer.getTime() - this.last_bullet_shot > 500) {
                force_render = false;
	        	var shot = new ShotEntity(this.pos.x, this.pos.y, this.walk_direction);
	        	this.last_bullet_shot = me.timer.getTime();
	        	me.game.add(shot, this.z); 
				me.game.sort(); 
			} 
        }

        // Set Action for Melee Attack
        if(me.input.isKeyPressed('melee')) {
            if(me.timer.getTime() - this.last_melee > 500) {
                this.renderable.setCurrentAnimation('attack', 'walk');

                var self = this;

                var melee = new MeleeEntity(this.pos.x, this.pos.y, this.walk_direction);
                this.last_melee = me.timer.getTime();
                me.game.add(melee, this.z);
                me.game.sort();
                if (melee) {
                    force_render = true;
                }
            }
        }

        // Set Gameover if You Fall Through Bottom
        if(this.pos.y > 460) {
			me.state.change(me.state.GAMEOVER);
		}

        // Check and Update Player Movement
        this.updateMovement();

        // Check for Collision
		var res = me.game.collide(this);
		 
		if (res) {
			if (res.obj.type == me.game.ENEMY_OBJECT) {
			   if ((res.y>0) && !this.jumping) {
				  // Bounce on Top Collision
				  this.falling = false;
				  this.vel.y = -this.maxVel.y * me.timer.tick;

				  // Set Jumping Flag
				  this.jumping = true;

				  // play some audio
				  // me.audio.play("stomp");
			   } else {
				  // Flicker if Hit by Enemy
				  this.renderable.flicker(45);

				  // me.audio.play("stomp");

				  // Keep Track of HP Counter
				  if(this.hp === 3) {
				  	this.hp--;
				  	game.data.hp--;
				  	this.last_hp_loss = me.timer.getTime();
				  } else if(me.timer.getTime() - this.last_hp_loss > 3000) {
					this.hp--;
					game.data.hp--;
					this.last_hp_loss = me.timer.getTime();
				  }

				  // Trigger Gameover
				  if(this.hp === 0) {
				  	me.state.change(me.state.GAMEOVER);
				  }
			   }
			}
		}
		
        // Check if Animation Update is Needed 
        if(this.vel.x != 0 || this.vel.y != 0 || force_render != false) {
        	// Update the Animation
        	this.parent();
        	return true;
        }
        // Else No Update

        force_render = false;
        return false;
	}
});

// Create Coins
game.CoinEntity = me.CollectableEntity.extend({
	init: function(x,y,settings) {
		// Constructor
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

			// Prevent From Being Collected Twice
			this.collidable = false;

			// Remove The Coin
			me.game.remove(this);
		}
	}
});

// Roger Entity
game.RogerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // Define this Here Instead of Tiled
        settings.image = "roger";
        settings.spritewidth = 50; //need to check this
 
        // Constructor
        this.parent(x, y, settings);

        this.flipX(true);
        // Prevent from Falling When Flying
        //this.gravity = 0;

        // Sets Bounds
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
 
        // Start From Right Bound
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // Set Speed
        this.setVelocity(1, 10);
 
        // Make it Collidable
        this.collidable = true;
    }
});



// Enemy Entities
game.EnemyEntity = me.ObjectEntity.extend({
	init: function(x, y, settings) {
        // Define this Here Instead of Tiled
        settings.image = "dragonenemy";
        settings.spritewidth = 180;
 
        // Constructor
        this.parent(x, y, settings);

        // Prevent from Falling When Flying
        this.gravity = 0;

 		// Sets Bounds
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
 
        // Start From Right Bound
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // Set Speed
        this.setVelocity(1, 10);
 
        // Make it Collidable
        this.collidable = true;

        // Set as Enemy
        this.type = me.game.ENEMY_OBJECT;

        // Initialize HP Counter
        this.hp = 2;
    },
 
    // Do Action Upon Collision
    onCollision: function(res, obj) {
        // When Collision Occurs on Top of Enemy
        if (this.alive && (res.y > 0) && obj.falling) {
            this.hp -= 0.25;
  			this.renderable.flicker(45);
        }

        // When Collision Occurs with SHOT Object
        if(obj.type == 'SHOT') {
        	this.hp -= 0.5;
        	this.renderable.flicker(45);
        }

		// When Collision Occurs with MELEE Object
        if(obj.type == 'MELEE') {
        	this.hp--;
        	this.renderable.flicker(45);
        }

        if(this.hp <= 0) {
            me.game.remove(this);
            game.data.score += 250;
        }
    },
 
    // Manage Enemy Movement
    update: function() {
        // Don't Move if Not Seen
        if (!this.inViewport) {
            return false;
 		}

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // Make it Walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         
        // Check and Update Movement
        this.updateMovement();
         
        // Update Animation if Needed
        if (this.vel.x!=0 || this.vel.y!=0) {
            this.parent();
            return true;
        }
        return false;
    }
});


// EnemyEntity2
game.EnemyEntity2 = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // Define this Here Instead of Tiled
        settings.image = "ex-gf-enemy";
        settings.spritewidth = 32;

        // Constructor
        this.parent(x, y, settings);

        // Prevent from Falling When Flying
        this.gravity = 0;

        // Sets Bounds
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
 
        // Start From Right Bound
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // Set Speed
        this.setVelocity(1, 10);
 
        // Make it Collidable
        this.collidable = true;

        // Set as Enemy
        this.type = me.game.ENEMY_OBJECT;

        // Initialize HP Counter
        this.hp = 2;
    },
 
    // Do Action Upon Collision
    onCollision: function(res, obj) {
        // When Collision Occurs on Top of Enemy
        if (this.alive && (res.y > 0) && obj.falling) {
            this.hp -= 0.25;
            this.renderable.flicker(45);
        }

        // When Collision Occurs with SHOT Object
        if(obj.type == 'SHOT') {
            this.hp -= 0.5;
            this.renderable.flicker(45);
        }

        // When Collision Occurs with MELEE Object
        if(obj.type == 'MELEE') {
            this.hp--;
            this.renderable.flicker(45);
        }

        if(this.hp <= 0) {
            me.game.remove(this);
            game.data.score += 250;
        }
    },
 
    // Manage Enemy Movement
    update: function() {
        // Don't Move if Not Seen
        if (!this.inViewport) {
            return false;
        }

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // Make it Walk
            this.flipX(this.walkLeft);

            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         
        // Check and Update Movement
        this.updateMovement();
         
        // Update Animation if Needed
        if (this.vel.x!=0 || this.vel.y!=0) {
            this.parent();
            return true;
        }
        return false;
    }
});

//witch enemy
game.EnemyEntity3 = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // Define this Here Instead of Tiled
        settings.image = "witchenemy";
        settings.spritewidth = 83;
 
        // Constructor
        this.parent(x, y, settings);

        // Prevent from Falling When Flying
        this.gravity = 0;

        // Sets Bounds
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
 
        // Start From Right Bound
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // Set Speed
        this.setVelocity(1, 10);
 
        // Make it Collidable
        this.collidable = true;

        // Set as Enemy
        this.type = me.game.ENEMY_OBJECT;

        // Initialize HP Counter
        this.hp = 2;
    },
 
    // Do Action Upon Collision
    onCollision: function(res, obj) {
        // When Collision Occurs on Top of Enemy
        if (this.alive && (res.y > 0) && obj.falling) {
            this.hp -= 0.25;
            this.renderable.flicker(45);
        }

        // When Collision Occurs with SHOT Object
        if(obj.type == 'SHOT') {
            this.hp -= 0.5;
            this.renderable.flicker(45);
        }

        // When Collision Occurs with MELEE Object
        if(obj.type == 'MELEE') {
            this.hp--;
            this.renderable.flicker(45);
        }

        if(this.hp <= 0) {
            me.game.remove(this);
            game.data.score += 250;
        }
    },
 
    // Manage Enemy Movement
    update: function() {
        // Don't Move if Not Seen
        if (!this.inViewport) {
            return false;
        }

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // Make it Walk
            this.flipX(!this.walkLeft);

            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         
        // Check and Update Movement
        this.updateMovement();
         
        // Update Animation if Needed
        if (this.vel.x!=0 || this.vel.y!=0) {
            this.parent();
            return true;
        }
        return false;
    }
});

// Creates Bullets
var ShotEntity = me.ObjectEntity.extend({
	init: function(x,y,walkingLeft) {
		// Create Custom Settings
		var settings = {};
		settings.image = 'bullet';
		settings.spritewidth = 32;
		settings.spriteheight = 32;

		// Constructor
		this.parent(x,y,settings);

		// Set as Collidable
		this.collidable = true;

		// Give it Velocity
		this.setVelocity(10, 1);

		// Check if Player 
		this.walkingLeft = walkingLeft;
	
		// Set Bullet Gravity to 0 
		this.gravity = 0;	

		// Set Entity Type
		this.type = 'SHOT';
	},

	update: function() {
		// Remove from Game if Out of Viewport
		if (!this.inViewport) {
			this.collidable = false;
			me.game.remove(this);
			return false;
		}

		// Change Bullet Direction Based on Player Direction
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

        // If it Hits a Wall, Remove it
        if(this.vel.x == 0) {
        	me.game.remove(this);
        	return false;
        }

        // Check for Collisions
        var res = me.game.collide(this);

        if(res) {
        	if(res.obj.type == me.game.ENEMY_OBJECT) {
        		// me.game.remove(res.obj);
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

// Create Melee Attack Entity
var MeleeEntity = me.ObjectEntity.extend({
    init: function(x, y, walkingLeft) {
    	// Custom Settings
        var settings = {};
        settings.spritewidth = 32;
        settings.spriteheight = 32;

        // Obtain mainPlayer Information
        mainPlayer = me.game.getEntityByProp('name', 'mainPlayer');

        // Constructor
        this.parent(mainPlayer[0].pos.x, mainPlayer[0].pos.y, settings);

        // Make it Collidable
        this.collidable = true;

        // Check Player Direction
        this.walkingLeft = walkingLeft;
    
    	// No Gravity
        this.gravity = 0;   

        // Set Velocity
        this.setVelocity(3, 1);

        // Give it a Type
        this.type = 'MELEE';
    },

    update: function() {
    	// Only Render if in Viewport
        if (!this.inViewport) {
			this.collidable = false;
			me.game.remove(this);
			return false;
		}

		// Change Direction Based on Player Direction
        if(this.walkingLeft) {
            this.vel.x -= this.accel.x * me.timer.tick;
            this.flipX(false);
        } else if(!this.walkingLeft) {
            this.vel.x += this.accel.x * me.timer.tick;
            this.flipX(true);
        } else {
            this.vel.x = 0;
        }
        
        // Limit Distance of Attack
        if(this.pos.x > mainPlayer[0].pos.x + 45 || this.pos.x < mainPlayer[0].pos.x - 45) {
            me.game.remove(this);
            return false;
        }

        // Check and Update Movement
        this.updateMovement();

        // Check for Collision
        var res = me.game.collide(this);

        if(res) {
            if(res.obj.type == me.game.ENEMY_OBJECT) {
                // me.game.remove(res.obj);
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
    }
});

// Set Level Entity (Door)
game.LevelEntity = me.LevelEntity.extend({
    init : function (x, y, settings) {
        // Constructor
        this.parent(x, y, settings);

        // Save all settings
        this.settings = settings;
    },
    onCollision : function (res, obj) {
    	// Only Moves to Next Level for Player Collision
        if(obj.type == 'PLAYER') {
        	game.data.hp = 3;
        	var current_level = me.levelDirector.getCurrentLevelId();
        	if(current_level === 'level2') {
        		me.state.change(me.state.CHINA);
        	} else if(current_level === 'someword') {
        		me.state.change(me.state.TIMEWARP);
        	} else if(current_level === 'timetunnel') {
        		me.state.change(me.state.ROGER);
        	} 

        	// if(this.settings.to) {
            //    	me.levelDirector.loadLevel(this.settings.to);
        	// } else {
        	// 	me.state.change(me.state.GAME_END);
        	// }
        }
    }
});

// Final Animation Entities
game.AlasandraEntity = me.ObjectEntity.extend({
    init : function(x, y, settings) {
        settings.image = 'main-player'
        settings.spritewidth = 100;

        this.parent(x,y,settings);

        // Sets Bounds
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
 
        // Start From Left Bound
        this.pos.x = x + settings.spritewidth;
        this.walkLeft = false;
 
        // Set Speed
        this.setVelocity(1, 10);
 
        // Make it Collidable
        this.collidable = true;

        // Animations
        this.renderable.addAnimation('walk', [0,1,2]);
        this.renderable.setCurrentAnimation('walk');

        // Set as Enemy
        this.type = 'ALASANDRA';
    },

    onCollision : function(res, obj) {
        if(obj.type === 'ROGER') {
            console.log('blah');
            this.vel.x = 0;
            this.accel.x = 0;
            // Find A Way to Add Heart Animation Here.
            // var heart = new HeartEntity();
        }
    },

    // Manage Alasandra Movement
    update: function() {
        // Don't Move if Not Seen
        if (!this.inViewport) {
            return false;
        }

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // Make it Walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         
        // Check and Update Movement
        this.updateMovement();
         
        // Update Animation if Needed
        if (this.vel.x!=0 || this.vel.y!=0) {
            this.parent();
            return true;
        }
        return false;
    }
});

game.RogerEntity2 = me.ObjectEntity.extend({
    init : function(x, y, settings) {
        settings.image = 'roger';
        settings.spritewidth = 50;

        this.parent(x,y,settings);

        // Sets Bounds
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
 
        // Start From Right Bound
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // Set Speed
        this.setVelocity(3, 10);
 
        // Make it Collidable
        this.collidable = true;

        // Set as Enemy
        this.type = 'ROGER';
    },

    onCollision : function(res, obj) {
        if(obj.type === 'ALASANDRA') {
            console.log('collided');
            this.vel.x = 0;
            this.accel.x = 0;
        }
    },

    // Manage Roger Movement
    update: function() {
        // Don't Move if Not Seen
        if (!this.inViewport) {
            return false;
        }

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // Make it Walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         
        // Check and Update Movement
        this.updateMovement();
         
        // Update Animation if Needed
        if (this.vel.x!=0 || this.vel.y!=0) {
            this.parent();
            return true;
        }
        return false;
    }
});
