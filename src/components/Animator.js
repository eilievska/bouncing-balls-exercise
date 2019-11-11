import React from 'react';
import Vector from "../util/Vector";
import {randomWithMax} from "../util/random";
import Canvas from './Canvas'
import AnimationContext from "../animation/AnimationContext";

const ballSize = 30;

/**
 * Creates and animates moving objects on a canvas.
 */
class Animator extends React.Component {

    constructor(props) {
        super(props);

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.state = {drawableObjects: []};
        this.movableObjects = [];

        this.refreshCanvas = this.refreshCanvas.bind(this);
        this.moveObjects = this.moveObjects.bind(this);
        this.addMovableObject = this.addMovableObject.bind(this);

        this.animationContext = new AnimationContext(this.width, this.height, ballSize);
    }

    addMovableObject(event) {
        const x = event.clientX;
        const y = event.clientY;
        const movableObject = this.animationContext.createMovableObject(new Vector(x, y),
            new Vector(randomWithMax(50), randomWithMax(50)));
        this.movableObjects.push(movableObject);
    }

    moveObjects() {
        const drawableObjects = [];

        this.movableObjects.forEach(movableObject => {

            movableObject.move();
            drawableObjects.push(movableObject.draw);

        });

        this.setState({drawableObjects: drawableObjects})
    }

    refreshCanvas() {
        this.moveObjects();
        requestAnimationFrame(this.refreshCanvas)
    }

    componentDidMount() {
        requestAnimationFrame(this.refreshCanvas)
    }

    render() {
        return (
            <div onClick={this.addMovableObject}>
                <Canvas width={this.width} height={this.height} drawables={this.state.drawableObjects}/>
            </div>
        )
    }
}

export default Animator;