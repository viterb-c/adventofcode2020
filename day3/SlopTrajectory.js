const file = require("../utils/files.js");

class SlopTrajectory {

    constructor(horizontal, vertical) {
        this.horizontalDirection = horizontal;
        this.verticalDirection = vertical;
        this.geology = [];
    }

    setGeology(filePath) {
        this.geology  = file.fromFileToArray(filePath);
    }

    changeDirections(horizontal, vertical) {
        this.horizontalDirection = horizontal;
        this.verticalDirection = vertical;
    }

    countTreesOnPath() {
        let trees = 0;
        let posX = 0;
        let posY = 0;

        while (posY < this.geology.length) {
            if (this.geology[posY][posX] == '#') {
                trees++;
            }
            posX = (posX + this.horizontalDirection) % this.geology[posY].length;
            posY += this.verticalDirection;
        }
        return trees;
    }
}

exports.SlopTrajectory = SlopTrajectory;