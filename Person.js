class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;
        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {            
            "up": ["y", -5, "vy"],
            "down": ["y", 5, "vy"], 
            "left": ["x", -5, "vx"],
            "right": ["x", 5, "vx"],

        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {

            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk", 
                    direction: state.arrow
                })  
            }
            this.updateSprite(state);
        }       
    }

    startBehavior(state, behavior) {
        //set character direction to behavior direction
        this.direction = behavior.direction;  
         
        if (behavior.type === "walk")   {      
            //stop here if space isn't free a
            // console.log(state.map.checkMonster(this.x, this.y, this.direction))
            // console.log(state.map.isSpaceTaken(this.x, this.y, this.direction))
            if (state.map.isSpaceTaken(this.x, this.y, this.direction) )
            {
                return;
            } else     

            if (state.map.checkMonster(this.x, this.y, this.direction) )
            {
                console.log('monster')
                return;
            } 

        // state.map.moveWall(this.x, this.y, this.direction);
        this.movingProgressRemaining = 1;
        }
    }

    updatePosition() {
            const [property, change, velocity] = this.directionUpdate[this.direction];
            this[velocity] = change;
            //property = x or y
            //change = 5 or -5
            //velocity = vx or vy
            console.log(property, change, velocity, this[property], this.vx)
            this[property] += this[velocity];
            
            this.movingProgressRemaining -= 1;

        
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        
        this.sprite.setAnimation("idle-"+this.direction);
            
        
        

    }
}