import Vector from "../util/Vector";


class CollisionDetector {

    constructor(canvasWidth, canvasHeight, ballSize) {
        this.splitFactor = ballSize;
        this.gridXLength = Math.ceil(canvasWidth / this.splitFactor);
        this.gridYLength = Math.ceil(canvasHeight / this.splitFactor);

        this.grid = Array(this.gridXLength).fill(null).map(() => Array(this.gridYLength).fill(null));

        this.ballGridPositions = {};
    }

    checkCollision(ball) {

        this.erasePreviousGridPositions(ball);

        let collidingElement = null;

        let gridPositionsVector = this.getGridPositionsVector(ball);
        this.ballGridPositions[ball.getId()] = gridPositionsVector;

        gridPositionsVector.forEach(newGridPosition => {
            let currentGridElement = this.grid[newGridPosition.x][newGridPosition.y];
            this.grid[newGridPosition.x][newGridPosition.y] = ball;
            if (currentGridElement !== null && currentGridElement.getId() !== ball.getId()) {
                collidingElement = currentGridElement;
            }
        });

        return collidingElement

    }

    erasePreviousGridPositions(ball) {
        if (ball.getId() in this.ballGridPositions) {
            let oldGridPositions = this.ballGridPositions[ball.getId()];
            oldGridPositions.forEach(gridPosition => this.grid[gridPosition.x][gridPosition.y] = null)
        }
    }

    getGridPositionsVector(ball) {
        const gridPositions = [];

        const yGridPositions = this.setBounds(this.getGridPosition(ball.getY()), 0, this.gridYLength - 1);

        const xGridPositions = this.setBounds(this.getGridPosition(ball.getX()), 0, this.gridXLength - 1);

        xGridPositions.forEach(x => yGridPositions.forEach(y => gridPositions.push(new Vector(x, y))));

        return gridPositions

    }

    setBounds(coordinates, min, max) {
        return coordinates.map(coordinate => coordinates < min ? min : coordinate)
            .map(coordinate => coordinate > max ? max : coordinate);
    }

    getGridPosition(coordinate) {
        let reminder = coordinate % this.splitFactor;
        let cell = Math.ceil(coordinate / this.splitFactor);
        if (reminder < Math.floor(this.splitFactor / 2)) {
            return [cell - 1, cell]
        } else {
            return [cell, cell + 1]
        }
    }
}

export default CollisionDetector;