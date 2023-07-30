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

        const x = 0;
        const y = 0;

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage( //image, top, left, width of cut, height of cut, 
                hero, 
                0, 
                0,
                32,
                48,
                x,
                y,
                32,
                48
                )
        }

        hero.src = "images/characters/hero.png"; 

    }
}