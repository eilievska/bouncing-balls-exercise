import Ball from "./Ball";
import CollisionDetector from "./CollisionDetector";

let instance = null;
let collisionDetector = null;

/**
 * In absence of a DI container, I've created this class to instantiate implementations of
 * a movable object and a single collision detector.
 */
class AnimationContext {

    constructor(canvasWidth, canvasHeight, objectSize) {
        if (!instance) {
            instance = this;
        }

        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._objectSize = objectSize;

        return instance;
    }

    getCollisionDetector() {
        if (!collisionDetector)
            collisionDetector = new CollisionDetector(this._canvasWidth, this._canvasHeight, this._objectSize);
        return collisionDetector
    }

    createMovableObject(startPosition, startVelocity) {
        return new Ball(this._canvasWidth, this._canvasHeight, startPosition, startVelocity, this._objectSize,
            this.getCollisionDetector());
    }

}

export default AnimationContext;