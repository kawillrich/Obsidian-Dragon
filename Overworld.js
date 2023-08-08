class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            //clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //establish camera view
            const cameraPerson = this.map.gameObjects.hero;

            //update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            })

            //draw lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);
            

            //draw game objects
            Object.values(this.map.gameObjects).forEach(object => {
                
                object.sprite.draw(this.ctx, cameraPerson);
            })

            //draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson)
            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        //can start on new map by changing 'DemoRoom' property to new map locaiton
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
        console.log(this.map.walls)
        this.directionInput = new DirectionInput();
        this.directionInput.init();


        this.startGameLoop();
    }
}