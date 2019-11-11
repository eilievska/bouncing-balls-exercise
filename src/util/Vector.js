class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    divideByScalar(scalar) {
        return new Vector(this.x / scalar, this.y / scalar)
    }

    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y
    }

    multiplyByScalar(scalar) {
        return new Vector(scalar * this.x, scalar * this.y)
    }

    add(secondOperand) {
        return new Vector(this.x + secondOperand.x, this.y + secondOperand.y)
    }

}

export default Vector;