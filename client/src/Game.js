import React, { Component } from 'react';
import MyRect from './components/MyRect'
import MyCircle from './components/MyCircle'

const w = window.innerWidth
const h = window.innerHeight

let left = 37
let up = 38
let right = 39
let down = 40

let step = 10

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      positionX: h / 2,
      positionY: w / 2,
      stepX: 0,
      stepY: 0
    };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState)
    document.addEventListener('keydown', this.handleKeyPress)
    document.addEventListener('keyup', this.stopKeyPress)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.setState(prevState => ({ positionX: prevState.positionX + this.state.stepX }));
    this.setState(prevState => ({ positionY: prevState.positionY + this.state.stepY }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  stopKeyPress = (event) => {
    if (event.keyCode === left || right) {
      this.setState({ stepX: 0 })
    }
    // if (event.keyCode === right) {
    //   this.setState({ stepX: 0 })
    // }
    if (event.keyCode === up || down) {
      this.setState({ stepY: 0 })
    }
    // if (event.keyCode === down) {
    //   this.setState({ stepY: 0 })
    // }
  }

  handleKeyPress = (event) => {
    if (event.keyCode === left) {
      this.setState({ stepX: -5 })
    }
    if (event.keyCode === right) {
      this.setState({ stepX: 5 })
    }
    if (event.keyCode === up) {
      this.setState({ stepY: -5 })
    }
    if (event.keyCode === down) {
      this.setState({ stepY: 5 })
    }
  }

  render() {
    console.log('posX', this.state.positionX)
    return <Canvas angle={this.state.angle} x={this.state.positionX} y={this.state.positionY} />
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    const { angle, x, y } = this.props;
    // console.log('this', x)
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    // ctx.translate(x, w);
    // ctx.rotate(angle * Math.PI / 180);
    ctx.fillStyle = '#4397AC'
    // ctx.arc(100, 75, 50, 0, 2 * Math.PI)
    // ctx.stroke();
    ctx.fillStyle= '#ffff00'
    ctx.fillRect(x - 20, y - 20, x + 20, y + 20);
    ctx.restore();
  }

  render() {
    return <canvas width={window.innerWidth} height={window.innerHeight} ref={this.canvasRef}></canvas>;
  }
}

