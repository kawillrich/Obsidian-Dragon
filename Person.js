class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {            
            "up": ["y", -2],
            "down": ["y", 2],
            "left": ["x", -2],
            "right": ["x", 2],

        }
    }

    update(state) {
        this.updatePosition();
        this.updateSprite(state);
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            // console.log(OverworldMaps.DemoRoom.walls);
            // console.log(state.arrow);
            console.log(state.map.isSpaceTaken(this.x, this.y, this.direction))
            console.log(this.movingProgressRemaining);
            this.movingProgressRemaining = 2;
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;

        }
    }

    updateSprite(state) {
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-"+this.direction);
            return;
        }
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
        }

    }
}