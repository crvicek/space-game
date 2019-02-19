import React, { Component } from 'react';
import Ship from './components/MyShip'
import Planet from './components/Planet'

const w = window.innerWidth
const h = window.innerHeight

let left = 37
let up = 38
let right = 39
let down = 40

let step = 10
const ship = new Ship
const spcCraft = new Ship
const planet = new Planet


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      positionX: h / 2,
      positionY: w / 2,
      stepX: 0,
      stepY: 0,
      context: null
    };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState)
    const context = this.refs.mycanvas.getContext('2d');
    this.setState({ context: context });

    document.addEventListener('keydown', this.handleKeyPress)
    document.addEventListener('keyup', this.stopKeyPress)
  }

  componentDidUpdate() {
    // const { angle, x, y } = this.props;
    // const width = canvas.width;
    // const height = canvas.height;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  // Handles all animations
  updateAnimationState() {
    // this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.setState(prevState => ({ positionX: prevState.positionX + this.state.stepX }));
    this.setState(prevState => ({ positionY: prevState.positionY + this.state.stepY }));
    console.log('x:', this.state.positionX)
    const ctx = this.state.context
    ctx.save();
    ctx.clearRect(0, 0, 500, 500);

    // Create background
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, w, h)

    // Some planets
    planet.render(this.state)

    // Ship
    ship.render(this.state)
    spcCraft.render(this.state)
    spcCraft.render(this.state)




    // Clear frame before redrawing
    ctx.restore();

    // render next frame
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  stopKeyPress = (event) => {
    if (event.keyCode === left || right) {
      this.setState({ stepX: 0 })
    }
    if (event.keyCode === up || down) {
      this.setState({ stepY: 0 })
    }
  }

  handleKeyPress = (event) => {
    if (event.keyCode === left) {
      this.setState({ stepX: - step })
    }
    if (event.keyCode === right) {
      this.setState({ stepX: step })
    }
    if (event.keyCode === up) {
      this.setState({ stepY: - step })
    }
    if (event.keyCode === down) {
      this.setState({ stepY: step })
    }
  }

  render() {
    if (this.state.positionX > w) { this.setState({ positionX: 0 }) }
    if (this.state.positionX < 0) { this.setState({ positionX: w }) }
    if (this.state.positionY > h) { this.setState({ positionY: 0 }) }
    if (this.state.positionY < 0) { this.setState({ positionY: h }) }

    return (
      <canvas width={window.innerWidth} height={window.innerHeight} ref='mycanvas'></canvas>
    )
  }
}



