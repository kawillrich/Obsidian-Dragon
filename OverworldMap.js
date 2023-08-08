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
            [utils.asGridCoord(0,0)]: true,
            [utils.asGridCoord(1,0)]: true,
            [utils.asGridCoord(2,0)]: true,
            [utils.asGridCoord(3,0)]: true,
            [utils.asGridCoord(4,0)]: true,

            [utils.asGridCoord(0,1)]: true,
            [utils.asGridCoord(1,1)]: true,
            [utils.asGridCoord(2,1)]: true,
            [utils.asGridCoord(3,1)]: true,
            [utils.asGridCoord(4,1)]: true,

            [utils.asGridCoord(0,2)]: true,
            [utils.asGridCoord(1,2)]: true,
            [utils.asGridCoord(2,2)]: true,
            [utils.asGridCoord(3,2)]: true,
            [utils.asGridCoord(4,2)]: true,

            [utils.asGridCoord(0,3)]: true,
            [utils.asGridCoord(1,3)]: true,
            [utils.asGridCoord(2,3)]: true,
            [utils.asGridCoord(3,3)]: true,
            [utils.asGridCoord(4,3)]: true,

            [utils.asGridCoord(0,4)]: true,
            [utils.asGridCoord(1,4)]: true,
            [utils.asGridCoord(2,4)]: true,
            [utils.asGridCoord(3,4)]: true,
            [utils.asGridCoord(4,4)]: true,




        }
    }

    //can add more rooms here



}