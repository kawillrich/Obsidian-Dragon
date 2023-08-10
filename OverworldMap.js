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
            console.log(x, y);
        
           
            
            for (let i = 0; i < this.walls.coords.length; i++) {
                if (
                    (
                        //this.walls.coords[i] is the property (i.e. 1, 2)
                        //this.walls.coords[i][0] is the x coord
                        //this.walls.coords[i][1] is the y coord

                        //this x is the top left of the character
                        (x + 5 <= (this.walls.coords[i][0]) + 16 &&
                        x + 5 >= (this.walls.coords[i][0]))
                        ||
                        (x + 27 <= (this.walls.coords[i][0]) + 16 &&
                        x + 27 >= (this.walls.coords[i][0]))
                    ) &&

                    (
                        //this y is the top left of the character
                        (y + 12 <= (this.walls.coords[i][1]) + 16 &&
                        y + 12 >= (this.walls.coords[i][1]))
                        ||
                        (y + 46 <= (this.walls.coords[i][1]) + 16 &&
                        y + 46 >= (this.walls.coords[i][1]))
                    )

                )  {
                    console.log("wall")
                }   
            
        }


            //this.walls[`${x},${y}`] is the property name (i.e. 0,0), which has a value of true


            // console.log(this.walls[`${x},${y}`] || false)
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

                [utils.wallGrid(0), utils.wallGrid(1)],
                [utils.wallGrid(1), utils.wallGrid(1)],
                [utils.wallGrid(2), utils.wallGrid(1)],
                [utils.wallGrid(3), utils.wallGrid(1)],

                [utils.wallGrid(3), utils.wallGrid(2)],
                [utils.wallGrid(3), utils.wallGrid(2)],
                [utils.wallGrid(3), utils.wallGrid(2)],
                [utils.wallGrid(3), utils.wallGrid(2)],

                [utils.wallGrid(3), utils.wallGrid(3)],
                [utils.wallGrid(3), utils.wallGrid(3)],
                [utils.wallGrid(3), utils.wallGrid(3)],
                [utils.wallGrid(3), utils.wallGrid(3)],




            ]
            // [utils.asGridCoord(0,0)]: true,
            // [utils.asGridCoord(1,0)]: true,
            // [utils.asGridCoord(2,0)]: true,
            // [utils.asGridCoord(3,0)]: true,
            // [utils.asGridCoord(4,0)]: true,

            // [utils.asGridCoord(0,1)]: true,
            // [utils.asGridCoord(1,1)]: true,
            // [utils.asGridCoord(2,1)]: true,
            // [utils.asGridCoord(3,1)]: true,
            // [utils.asGridCoord(4,1)]: true,

            // [utils.asGridCoord(0,2)]: true,
            // [utils.asGridCoord(1,2)]: true,
            // [utils.asGridCoord(2,2)]: true,
            // [utils.asGridCoord(3,2)]: true,
            // [utils.asGridCoord(4,2)]: true,

            // [utils.asGridCoord(0,3)]: true,
            // [utils.asGridCoord(1,3)]: true,
            // [utils.asGridCoord(2,3)]: true,
            // [utils.asGridCoord(3,3)]: true,
            // [utils.asGridCoord(4,3)]: true,

            // [utils.asGridCoord(0,4)]: true,
            // [utils.asGridCoord(1,4)]: true,
            // [utils.asGridCoord(2,4)]: true,
            // [utils.asGridCoord(3,4)]: true,
            // [utils.asGridCoord(4,4)]: true,
            },
        
           
            
        
    }

    //can add more rooms here



}