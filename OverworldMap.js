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
            return false;
    }
    
    mountObjects() {
        Object.keys(this.gameObjects).forEach( key => {
            let object = this.gameObjects[key];
            object.id = key;
            
        })
    }

    checkMonster(currentX, currentY, direction) {        
        const {x,y} = utils.nextPosition(currentX,currentY, direction);         
        for (let prop in this.gameObjects) 
	    {
            // console.log(prop)//only prints the name of the property 'names'
            // console.log(this.gameObjects[prop])//only prints one object of all names because there's only one property in obj called names
            // for (let name in this.gameObjects[prop]) {
            //console.log(name)//prints the property name
                // console.log(this.gameObjects[prop][name])//console logs out the name i.e. value of key
                if (this.gameObjects[prop].isMonster ) {
                    
                    // console.log(this.gameObjects[prop].x, this.gameObjects[prop].y)//, prop.y)
                    if ((
                            x + 18 >= this.gameObjects[prop].x && 
                            x + 3 <= this.gameObjects[prop].x + 29
                        ) && (
                            y + 33 >= this.gameObjects[prop].y && 
                            y <= this.gameObjects[prop].y + 36
                        ))       
                    {
                       this.gameObjects[prop].isBlocking = true;                       
                       console.log('enemy')
                       return true;
    //may need to return a property value as true (i.e. isBlocking: true) in order to 
    //not RETURN and break out of the loop
                    } else {
                        this.gameObjects[prop].isBlocking = false;
                    }  
                // }          
		    }
	    }           
    }
        
    addWall(x,y,ctx) {
        this.walls.coords.push([x,y]);
        ctx.fillRect(x, y, 16, 16)
    }

    removeWall(x,y) {
        let source = [x, y];
        for (let i = 0; i < this.walls.length; i++ ) {		
            if (this.walls[i][0] === source[0]) {					
                if (this.walls[i][1] === source[1]) {						
                    this.walls.splice(this.walls.indexOf(coords[i]), 1)
                }
            } 
        }
        console.log("new coords", this.walls)
    }    
    
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x, y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}   

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./images/maps/tileset-outdoor-lower.png",
        upperSrc: "./images/maps/tileset-outdoor-upper.png",
        gameObjects: {            
            enemy: new Person({
                x: utils.withGrid16(11),
                y: utils.withGrid16(5),
                src: "./images/characters/kobold.png",
                isMonster: true,                
            }), 
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid16(7),
                y: utils.withGrid16(7),
                name: "Hero",                
            }),
            enemy2: new Person({
                x: utils.withGrid16(20),
                y: utils.withGrid16(10),
                src: "./images/characters/kobold.png",
                isMonster: true,
                isPlayerControlled: false
            })
        },
          
        walls: {
            coords: [              
                //upper left platform
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

                //upper left pond
                
                [utils.wallGrid(2), utils.wallGrid(5)],
                [utils.wallGrid(3), utils.wallGrid(5)],
                [utils.wallGrid(4), utils.wallGrid(5)],
                [utils.wallGrid(5), utils.wallGrid(5)],
                
                [utils.wallGrid(2), utils.wallGrid(6)],
                [utils.wallGrid(3), utils.wallGrid(6)],
                [utils.wallGrid(4), utils.wallGrid(6)],
                [utils.wallGrid(5), utils.wallGrid(6)],
                
                [utils.wallGrid(2), utils.wallGrid(7)],
                [utils.wallGrid(3), utils.wallGrid(7)],
                [utils.wallGrid(4), utils.wallGrid(7)],
                [utils.wallGrid(5), utils.wallGrid(7)],

                //double platform

                // [utils.wallGrid(17), utils.wallGrid(21)],
                [utils.wallGrid(17), utils.wallGrid(22)],
                [utils.wallGrid(17), utils.wallGrid(23)],
                [utils.wallGrid(17), utils.wallGrid(24)],

                // [utils.wallGrid(18), utils.wallGrid(21)],
                [utils.wallGrid(18), utils.wallGrid(22)],
                [utils.wallGrid(18), utils.wallGrid(23)],
                [utils.wallGrid(18), utils.wallGrid(24)],

                // [utils.wallGrid(19), utils.wallGrid(21)],
                [utils.wallGrid(19), utils.wallGrid(22)],
                [utils.wallGrid(19), utils.wallGrid(23)],
                [utils.wallGrid(19), utils.wallGrid(24)],

                // [utils.wallGrid(20), utils.wallGrid(21)],
                // [utils.wallGrid(20), utils.wallGrid(22)],
                // [utils.wallGrid(20), utils.wallGrid(23)],
                // [utils.wallGrid(20), utils.wallGrid(24)],

                [utils.wallGrid(21), utils.wallGrid(21)],
                [utils.wallGrid(21), utils.wallGrid(22)],
                [utils.wallGrid(21), utils.wallGrid(23)],
                [utils.wallGrid(21), utils.wallGrid(24)],

                // [utils.wallGrid(20), utils.wallGrid(20)],

                // [utils.wallGrid(21), utils.wallGrid(20)],

                // [utils.wallGrid(22), utils.wallGrid(20)],
                [utils.wallGrid(22), utils.wallGrid(21)],
                [utils.wallGrid(22), utils.wallGrid(22)],
                [utils.wallGrid(22), utils.wallGrid(23)],


                // [utils.wallGrid(23), utils.wallGrid(20)],
                [utils.wallGrid(23), utils.wallGrid(21)],
                [utils.wallGrid(23), utils.wallGrid(22)],
                [utils.wallGrid(23), utils.wallGrid(23)],

                //cave entrance

                [utils.wallGrid(35), utils.wallGrid(27)],
                [utils.wallGrid(35), utils.wallGrid(28)],
                [utils.wallGrid(35), utils.wallGrid(29)],
                [utils.wallGrid(35), utils.wallGrid(30)],
                [utils.wallGrid(35), utils.wallGrid(31)],

                [utils.wallGrid(36), utils.wallGrid(27)],
                [utils.wallGrid(36), utils.wallGrid(28)],
                [utils.wallGrid(36), utils.wallGrid(29)],
                [utils.wallGrid(36), utils.wallGrid(30)],
                [utils.wallGrid(36), utils.wallGrid(31)],

                [utils.wallGrid(37), utils.wallGrid(27)],
                [utils.wallGrid(37), utils.wallGrid(28)],
                [utils.wallGrid(37), utils.wallGrid(29)],
                [utils.wallGrid(37), utils.wallGrid(30)],
                [utils.wallGrid(37), utils.wallGrid(31)],
                [utils.wallGrid(37), utils.wallGrid(32)],


                [utils.wallGrid(38), utils.wallGrid(27)],
                [utils.wallGrid(38), utils.wallGrid(28)],
                [utils.wallGrid(38), utils.wallGrid(29)],
                [utils.wallGrid(38), utils.wallGrid(30)],
                [utils.wallGrid(38), utils.wallGrid(31)],
                [utils.wallGrid(38), utils.wallGrid(32)],


                [utils.wallGrid(39), utils.wallGrid(27)],
                [utils.wallGrid(39), utils.wallGrid(28)],
                [utils.wallGrid(39), utils.wallGrid(29)],
                [utils.wallGrid(39), utils.wallGrid(30)],
                // [utils.wallGrid(39), utils.wallGrid(31)],
                // [utils.wallGrid(39), utils.wallGrid(32)],


                [utils.wallGrid(40), utils.wallGrid(27)],
                [utils.wallGrid(40), utils.wallGrid(28)],
                [utils.wallGrid(40), utils.wallGrid(29)],
                [utils.wallGrid(40), utils.wallGrid(30)],
                // [utils.wallGrid(40), utils.wallGrid(31)],
                // [utils.wallGrid(40), utils.wallGrid(32)],


                [utils.wallGrid(41), utils.wallGrid(27)],
                [utils.wallGrid(41), utils.wallGrid(28)],
                [utils.wallGrid(41), utils.wallGrid(29)],
                [utils.wallGrid(41), utils.wallGrid(30)],
                [utils.wallGrid(41), utils.wallGrid(31)],
                [utils.wallGrid(41), utils.wallGrid(32)],


                [utils.wallGrid(42), utils.wallGrid(27)],
                [utils.wallGrid(42), utils.wallGrid(28)],
                [utils.wallGrid(42), utils.wallGrid(29)],
                [utils.wallGrid(42), utils.wallGrid(30)],
                [utils.wallGrid(42), utils.wallGrid(31)],
                [utils.wallGrid(42), utils.wallGrid(32)],


                [utils.wallGrid(43), utils.wallGrid(27)],
                [utils.wallGrid(43), utils.wallGrid(28)],
                [utils.wallGrid(43), utils.wallGrid(29)],
                [utils.wallGrid(43), utils.wallGrid(30)],
                [utils.wallGrid(43), utils.wallGrid(31)],

                //desert platform

                [utils.wallGrid(38), utils.wallGrid(4)],
                [utils.wallGrid(38), utils.wallGrid(5)],
                [utils.wallGrid(38), utils.wallGrid(6)],
                [utils.wallGrid(38), utils.wallGrid(7)],
                [utils.wallGrid(38), utils.wallGrid(8)],
                [utils.wallGrid(38), utils.wallGrid(9)],
                [utils.wallGrid(38), utils.wallGrid(10)],
                
                [utils.wallGrid(39), utils.wallGrid(4)],
                [utils.wallGrid(39), utils.wallGrid(5)],
                [utils.wallGrid(39), utils.wallGrid(6)],
                [utils.wallGrid(39), utils.wallGrid(7)],
                [utils.wallGrid(39), utils.wallGrid(8)],
                [utils.wallGrid(39), utils.wallGrid(9)],
                [utils.wallGrid(39), utils.wallGrid(10)],

                [utils.wallGrid(40), utils.wallGrid(4)],
                [utils.wallGrid(40), utils.wallGrid(5)],
                [utils.wallGrid(40), utils.wallGrid(6)],
                [utils.wallGrid(40), utils.wallGrid(7)],
                [utils.wallGrid(40), utils.wallGrid(8)],
                [utils.wallGrid(40), utils.wallGrid(9)],
                [utils.wallGrid(40), utils.wallGrid(10)],

                [utils.wallGrid(41), utils.wallGrid(4)],
                [utils.wallGrid(41), utils.wallGrid(5)],
                [utils.wallGrid(41), utils.wallGrid(6)],
                [utils.wallGrid(41), utils.wallGrid(7)],
                [utils.wallGrid(41), utils.wallGrid(8)],
                [utils.wallGrid(41), utils.wallGrid(9)],
                [utils.wallGrid(41), utils.wallGrid(10)],

                [utils.wallGrid(42), utils.wallGrid(4)],
                [utils.wallGrid(42), utils.wallGrid(5)],
                [utils.wallGrid(42), utils.wallGrid(6)],
                [utils.wallGrid(42), utils.wallGrid(7)],
                [utils.wallGrid(42), utils.wallGrid(8)],
                [utils.wallGrid(42), utils.wallGrid(9)],
                [utils.wallGrid(42), utils.wallGrid(10)],

                [utils.wallGrid(43), utils.wallGrid(4)],
                [utils.wallGrid(43), utils.wallGrid(5)],
                [utils.wallGrid(43), utils.wallGrid(6)],
                [utils.wallGrid(43), utils.wallGrid(7)],
                [utils.wallGrid(43), utils.wallGrid(8)],
                [utils.wallGrid(43), utils.wallGrid(9)],
                [utils.wallGrid(43), utils.wallGrid(10)],

                [utils.wallGrid(44), utils.wallGrid(4)],
                [utils.wallGrid(44), utils.wallGrid(5)],
                [utils.wallGrid(44), utils.wallGrid(6)],
                [utils.wallGrid(44), utils.wallGrid(7)],
                [utils.wallGrid(44), utils.wallGrid(8)],
                [utils.wallGrid(44), utils.wallGrid(9)],
                [utils.wallGrid(44), utils.wallGrid(10)],

                [utils.wallGrid(45), utils.wallGrid(4)],
                [utils.wallGrid(45), utils.wallGrid(5)],
                [utils.wallGrid(45), utils.wallGrid(6)],
                [utils.wallGrid(45), utils.wallGrid(7)],
                [utils.wallGrid(45), utils.wallGrid(8)],
                [utils.wallGrid(45), utils.wallGrid(9)],
                [utils.wallGrid(45), utils.wallGrid(10)],

                [utils.wallGrid(46), utils.wallGrid(4)],
                [utils.wallGrid(46), utils.wallGrid(5)],
                [utils.wallGrid(46), utils.wallGrid(6)],
                [utils.wallGrid(46), utils.wallGrid(7)],
                [utils.wallGrid(46), utils.wallGrid(8)],
                [utils.wallGrid(46), utils.wallGrid(9)],
                [utils.wallGrid(46), utils.wallGrid(10)],

                [utils.wallGrid(47), utils.wallGrid(4)],
                [utils.wallGrid(47), utils.wallGrid(5)],
                [utils.wallGrid(47), utils.wallGrid(6)],
                [utils.wallGrid(47), utils.wallGrid(7)],
                [utils.wallGrid(47), utils.wallGrid(8)],
                [utils.wallGrid(47), utils.wallGrid(9)],
                [utils.wallGrid(47), utils.wallGrid(10)],
            ]                 
        },              
    }
    //can add more rooms here
}