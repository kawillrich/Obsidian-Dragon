class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {            
            "up": ["y", -5],
            "down": ["y", 5],
            "left": ["x", -5],
            "right": ["x", 5],

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
            //stop here if space isn't free 
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }            
        this.movingProgressRemaining = 1;
        }
    }

    updatePosition() {
        
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
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