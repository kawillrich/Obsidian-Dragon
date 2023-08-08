class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        console.log('hi from overworld', this);
        
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        };
        image.src = "/images/maps/tileset-outdoor-gameworld-lower.png";

        const x = 5;
        const y = 10;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0,
                0,
                32,
                48,
                x * 20,
                y * 16 -12,
                32,
                48

                 )
        }
        shadow.src="images/characters/shadow.png";

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage( //image, start crop x, start crop y, width of cut, height of cut, x placement, y placement
                hero, 
                0, 
                0,
                32,
                48,
                x * 20,
                y * 16 - 12,
                32,
                48
                )
        }

        hero.src = "images/characters/hero.png"; 

    }
}