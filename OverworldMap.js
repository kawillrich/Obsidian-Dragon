class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, 
            utils.withGrid16(27.5) - cameraPerson.x, 
            utils.withGrid20(11.0) - cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, 
            utils.withGrid16(27.5) - cameraPerson.x, 
            utils.withGrid20(11.0) - cameraPerson.y)
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX,currentY, direction);            
            for (let i = 0; i < this.walls.coords.length; i++) {
                if (
                    (                      
                        //12px from top; 5 px from each side;2 px from bottom
                        (x + 3 <= (this.walls.coords[i][0]) + 16 &&
                        x + 3 >= (this.walls.coords[i][0]) )
                        ||
                        (x + 27 <= (this.walls.coords[i][0]) + 16 &&
                        x  + 27 >= (this.walls.coords[i][0]) )
                    ) &&
                    (
                        //this y is the top left of the character
                        (y + 11 <= (this.walls.coords[i][1]) + 16 &&
                        y + 11 >= (this.walls.coords[i][1]) )
                        ||
                        (y + 45 <= (this.walls.coords[i][1]) + 16 &&
                        y + 45 >=  (this.walls.coords[i][1]) )
                    )
                )  {
                    console.log("wall")
                    return true;
                }               
        }
            return this.walls[`${x},${y}`] || false;
        }

    }


window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/tileset-outdoor-lower.png",
        upperSrc: "/images/maps/tileset-outdoor-upper.png",
        gameObjects: {
            
            enemy: new Person({
                x: utils.withGrid16(7),
                y: utils.withGrid20(7),
                src: "images/characters/kobold.png",
                isMonster: true
            }), 
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid16(5),
                y: utils.withGrid20(6),
            }),
        },
          
        walls: {
            coords: [
                [utils.wallGrid(0), utils.wallGrid(0)],
                [utils.wallGrid(1), utils.wallGrid(0)],
                [utils.wallGrid(2), utils.wallGrid(0)],
                [utils.wallGrid(3), utils.wallGrid(0)],
                [utils.wallGrid(4), utils.wallGrid(0)],

                [utils.wallGrid(0), utils.wallGrid(1)],
                [utils.wallGrid(1), utils.wallGrid(1)],
                [utils.wallGrid(2), utils.wallGrid(1)],
                [utils.wallGrid(3), utils.wallGrid(1)],
                [utils.wallGrid(4), utils.wallGrid(1)],

                [utils.wallGrid(0), utils.wallGrid(2)],
                [utils.wallGrid(1), utils.wallGrid(2)],
                [utils.wallGrid(2), utils.wallGrid(2)],
                [utils.wallGrid(3), utils.wallGrid(2)],
                [utils.wallGrid(4), utils.wallGrid(2)],

                [utils.wallGrid(0), utils.wallGrid(3)],
                [utils.wallGrid(1), utils.wallGrid(3)],
                [utils.wallGrid(2), utils.wallGrid(3)],
                [utils.wallGrid(3), utils.wallGrid(3)],
                [utils.wallGrid(4), utils.wallGrid(3)],
            ]
            // [utils.asGridCoord(0,0)]: true,
            
            },              
    }

    //can add more rooms here

}