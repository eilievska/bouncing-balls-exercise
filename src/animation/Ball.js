import Vector from '../util/Vector'
import {randomWithMax} from "../util/random";

const floorFriction = 0.98;
const restitutionCoefficient = -0.8;
const gravity = 1;

class Ball {

    constructor(width, height, startPosition, startVelocity, size, collisionDetector) {
        this._id = randomWithMax(5000);

        this._canvasWidth = width;
        this._canvasHeight = height;
        this._size = size;
        this._position = startPosition;
        this._collisionDetector = collisionDetector;
        this._velocity = startVelocity;

        this._color = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        this._isRollingOnGround = false;

        this.draw = this.draw.bind(this);

    }

    move() {

        this._velocity.y -= gravity;
        if (this._isRollingOnGround) {
            this._velocity.x *= floorFriction
        }

        const {nextX, xVelocityReductionAfterBounce: xVelocityChangeAfterBounce} = this._getXVelocityAndPositionChange();
        this._velocity.x *= xVelocityChangeAfterBounce;

        const {nextY, yVelocityReductionAfterBounce: yVelocityChangeAfterBounce} = this._getYVelocityAndPositionChange();
        this._velocity.y *= yVelocityChangeAfterBounce;

        this._isRollingOnGround = nextY === this._position.y && nextY === this._canvasHeight - this._size;
        this._position = new Vector(nextX, nextY);

        this._checkForCollision();

        return this._position
    }

    updateVelocity(newVelocity) {
        this._velocity = newVelocity;
    }

    getId() {
        return this._id
    }

    getX() {
        return this._position.x
    }

    getY() {
        return this._position.y
    }

    getVelocity() {
        return this._velocity;
    }

    draw(canvasContext) {
        canvasContext.beginPath();
        canvasContext.fillStyle = this._color;
        canvasContext.arc(this.getX(), this.getY(), this._size, 0, 2 * Math.PI);
        canvasContext.fill();
    }

    _checkForCollision() {
        const collidingBall = this._collisionDetector.checkCollision(this);
        if (collidingBall !== null)
            this._handleCollision(collidingBall);
    }

    _getYVelocityAndPositionChange() {
        const positionAndVelocityChangeIfBounce = this._getPositionAndVelocityChangeIfBounce(this._position.y - this._velocity.y, this._canvasHeight);
        return {
            nextY: positionAndVelocityChangeIfBounce.positionDelta,
            yVelocityReductionAfterBounce: positionAndVelocityChangeIfBounce.velocityDelta
        };
    }

    _getXVelocityAndPositionChange() {
        const positionAndVelocityChangeIfBounce = this._getPositionAndVelocityChangeIfBounce(this._position.x + this._velocity.x, this._canvasWidth);
        return {
            nextX: positionAndVelocityChangeIfBounce.positionDelta,
            xVelocityReductionAfterBounce: positionAndVelocityChangeIfBounce.velocityDelta
        };
    }

    _getPositionAndVelocityChangeIfBounce(nextPosition, maxLength) {
        let positionChange = nextPosition;
        let velocityChange = 1;
        if (nextPosition > maxLength - this._size) {
            velocityChange = restitutionCoefficient;
            positionChange = maxLength - this._size
        }
        if (nextPosition < this._size) {
            velocityChange = restitutionCoefficient;
            positionChange = this._size
        }
        return {positionDelta: positionChange, velocityDelta: velocityChange};
    }

    _handleCollision(otherBall) {
        const {v1AfterCollision, v2AfterCollision} = this._getVelocitiesAfterCollision(otherBall);

        this.updateVelocity(v1AfterCollision);
        otherBall.updateVelocity(v2AfterCollision)
    }

    _getVelocitiesAfterCollision(otherBall) {
        const normal = new Vector(otherBall.getX() - this.getX(), otherBall.getY() - this.getY());
        const unitNormal = normal.divideByScalar(normal.magnitude());
        const unitTangent = new Vector(-1 * unitNormal.y, unitNormal.x);
        const v1 = this.getVelocity();
        const v2 = otherBall.getVelocity();

        const v1Normal = unitNormal.dot(v1);
        const v1Tangent = unitTangent.dot(v1);

        const v2Normal = unitNormal.dot(v2);
        const v2Tangent = unitTangent.dot(v2);

        const v1n_after_collision = v2Normal;
        const v2n_after_collision = v1Normal;

        const v1NormalVector = unitNormal.multiplyByScalar(v1n_after_collision);
        const v2NormalVector = unitNormal.multiplyByScalar(v2n_after_collision);

        const v1TangentVector = unitTangent.multiplyByScalar(v1Tangent);
        const v2TangentVector = unitTangent.multiplyByScalar(v2Tangent);

        const v1_after_collision = v1NormalVector.add(v1TangentVector);
        const v2_after_collision = v2NormalVector.add(v2TangentVector);
        return {v1AfterCollision: v1_after_collision, v2AfterCollision: v2_after_collision};
    }

}

export default Ball;