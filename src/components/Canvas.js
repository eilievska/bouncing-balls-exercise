import React from 'react';

/**
 * A canvas component that draws an array of balls on a canvas.
 */
class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();

        this.width = props.width;
        this.height = props.height;

    }

    componentDidUpdate() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, this.width, this.height);

        this.props.drawables.forEach(drawable => {
            drawable(ctx)
        });
    }

    render() {
        return (
            <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}/>
        )
    }
}

export default Canvas;