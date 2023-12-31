const utils = {
    withGrid16(n) {
        return n * 16;
    },
    withGrid20(n) {
        return n * 20;
    },

    asGridCoord(x,y) {
        return `${x*16},${y*16}`
    },


    wallGrid(num) {
        return num * 16;
    },

    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;

        //const size corresponds with directionUpdate() from Person.js

        const size = 5;

        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {

            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {

            y += size;
        }
        return {x,y};

    }
    
}

