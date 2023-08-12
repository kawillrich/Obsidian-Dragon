class Sprite {
    constructor(config) {

        //set up image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }


        //set up shadow
        this.shadow = new Image();
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.src = "images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }


        //config anim and init state
        this.animations = config.animations || {
            "idle-down" : [ [0,0] ],
            "idle-right": [ [0,2] ],
            "idle-up"   : [ [0,3] ],
            "idle-left" : [ [0,1] ],
            "walk-down" : [ [1,0],[2,0],[3,0],[0,0]] ,
            "walk-right": [ [1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2]],            
            "walk-up"   : [ [1,3],[2,3],[3,3],[0,3]],            
            "walk-left" : [ [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]]            

        }

        this.currentAnimation = "idle-right"; //config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 6;
        this.animationFrameProgress = this.animationFrameLimit;

        //reference the game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        //downtick frame progress
        if(this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }
        //reset counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if(this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {


        if (this.gameObject.isMonster) {
            const x = this.gameObject.x - 24 + utils.withGrid16(27.5) - cameraPerson.x;
            const y = this.gameObject.y - 12 + utils.withGrid20(11.0) - cameraPerson.y;
            this.isShadowLoaded && ctx.drawImage(this.shadow, x + 23, y + 2)
            this.isLoaded && ctx.drawImage(
                this.image,
                0,
                0,
                72,
                64,
                x,
                y,
                72,
                64        
            )    
        } else {

            const x = this.gameObject.x + utils.withGrid16(27.5) - cameraPerson.x;
            const y = this.gameObject.y  + utils.withGrid20(11.0) - cameraPerson.y;
            this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

            const [frameX, frameY] = this.frame;

            this.isLoaded && ctx.drawImage(
                this.image,
                frameX * 32,
                frameY * 48,
                32,
                48,
                x,
                y,
                32,
                48        
            )    
        }    
    this.updateAnimationProgress();

    } 
        //*may need to adjust cut sizes for attack effects and other objects
    }

