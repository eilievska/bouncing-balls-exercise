import Ball from "../animation/Ball";
import Vector from "../util/Vector";
import {collisionDetectorMock} from "./mocks/collisionDetectionMock";
import * as jest from "jest";

jest.mock('./mocks/collisionDetectionMock');
const mockedCollisionDetector = collisionDetectorMock;

const gravity = 1;

it('creates a ball on a specified position and with specified start velocity', () => {
    const startPosition = new Vector(100, 200);
    const startVelocity = new Vector(25, 30);
    const ball = new Ball(1000, 1000, startPosition, startVelocity, 50);

    expect(ball.getX()).toBe(startPosition.x);
    expect(ball.getY()).toBe(startPosition.y);
    expect(ball.getVelocity().x).toBe(startVelocity.x);
    expect(ball.getVelocity().y).toBe(startVelocity.y);
});

it('moves the ball trough one frame without bouncing on any wall or collision with another ball', () => {
    const startPosition = new Vector(100, 200);
    const xVelocity = 25;
    const yVelocity = 30;

    mockedCollisionDetector.checkCollision.mockImplementation((someBall) => {
        return null;
    });

    const ball = new Ball(1000, 1000, startPosition, new Vector(xVelocity, yVelocity), 50, mockedCollisionDetector);
    ball.move();

    expect(ball.getX()).toBe(startPosition.x + xVelocity);
    expect(ball.getY()).toBe(startPosition.y - (yVelocity - gravity));
});

it('moves the ball trough two frame without bouncing on any wall or collision with another ball', () => {
    const startPosition = new Vector(100, 200);
    const xVelocity = 25;
    const yVelocity = 30;

    mockedCollisionDetector.checkCollision.mockImplementation((someBall) => {
        return null;
    });

    const ball = new Ball(1000, 1000, startPosition, new Vector(xVelocity, yVelocity), 50, mockedCollisionDetector);
    ball.move();
    ball.move();

    expect(ball.getX()).toBe(startPosition.x + xVelocity + xVelocity);
    expect(ball.getY()).toBe(startPosition.y - (yVelocity - gravity) - (yVelocity - gravity - gravity));
});

it('moves the ball bouncing on the lower wall, without collision with another ball', () => {
    const ballSize = 50;
    const heightAndWidth = 1000;
    const xVelocity = 25;
    const yVelocity = -30;

    const startPosition = new Vector(100, heightAndWidth - ballSize);

    mockedCollisionDetector.checkCollision.mockImplementation((someBall) => {

        return null;
    });
    const ball = new Ball(heightAndWidth, heightAndWidth, startPosition, new Vector(xVelocity, yVelocity), ballSize, mockedCollisionDetector);
    ball.move();

    expect(ball.getX()).toBe(startPosition.x + xVelocity);
    expect(ball.getY()).toBe(heightAndWidth - ballSize);
});

it('moves the ball one frames after bouncing on the lower wall, without collision with another ball', () => {
    const ballSize = 50;
    const heightAndWidth = 1000;
    const xVelocity = 25;
    const yVelocity = -30;

    const startPosition = new Vector(100, heightAndWidth - ballSize / 2);

    mockedCollisionDetector.checkCollision.mockImplementation((someBall) => {
        return null;
    });
    const ball = new Ball(heightAndWidth, heightAndWidth, startPosition, new Vector(xVelocity, yVelocity), ballSize, mockedCollisionDetector);

    ball.move();
    ball.move();

    const restitutionCoefficient = -0.8;
    const gravity = 1;
    const velocityChanged = (yVelocity - gravity) * restitutionCoefficient;

    expect(ball.getX()).toBe(startPosition.x + xVelocity + xVelocity);
    expect(ball.getY()).toBe(heightAndWidth - ballSize - (velocityChanged - gravity));
});

it('moves the ball bouncing on the left wall, without collision with another ball', () => {
    const ballSize = 50;
    const heightAndWidth = 1000;
    const xVelocity = -25;
    const yVelocity = 30;

    const startPosition = new Vector(20, 200);

    mockedCollisionDetector.checkCollision.mockImplementation((someBall) => {
        return null;
    });

    const ball = new Ball(heightAndWidth, heightAndWidth, startPosition, new Vector(xVelocity, yVelocity), ballSize, mockedCollisionDetector);

    ball.move();

    const restitutionCoefficient = -0.8;
    const gravity = 1;

    expect(ball.getX()).toBe(ballSize);
    expect(ball.getY()).toBe(startPosition.y - (yVelocity - gravity));
    expect(ball.getVelocity().x).toBe(xVelocity * restitutionCoefficient);
    expect(ball.getVelocity().y).toBe(yVelocity - gravity);
});

it('moves the after bouncing with another ball', () => {
    const heightAndWidth = 1000;
    const ballSize = 50;
    const xVelocity = 50;
    const ball1 = new Ball(heightAndWidth, heightAndWidth, new Vector(100, 100), new Vector(xVelocity * -1, 0), ballSize);

    mockedCollisionDetector.checkCollision.mockImplementation((someBall) => {
        return ball1;
    });

    const ball2 = new Ball(heightAndWidth, heightAndWidth, new Vector(100 + ballSize, 100), new Vector(xVelocity, 0), ballSize, mockedCollisionDetector);

    ball2.move();

    expect(Math.round(ball2.getVelocity().x)).toBe(xVelocity * -1);
    expect(Math.round(ball1.getVelocity().x)).toBe(xVelocity);

});
