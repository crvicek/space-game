import React, { Component } from 'react';
import Ship from './components/MyShip'
import Planet from './components/Planet'
import Fire from './components/Fire';

const w = window.innerWidth
const h = window.innerHeight

const left = 37
const up = 38
const right = 39
const down = 40
const space = 32

let step = 10
const planet = new Planet


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      positionX: w / 2,
      positionY: h / 2,
      stepX: 0,
      stepY: 0,
      context: null,
      w: window.innerWidth,
      h: window.innerHeight,
      shoot: false,
    };
    this.ship = new Ship(this.state)
    this.fire = [new Fire(this.ship.pos)]
    // console.log('ship in framerate', this.ship.pos)
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  addObject(obj, name) {
    this[name].push(obj)
  }

  componentDidMount() {
    console.log('component')
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

  // shootSth() {
  //   if(this.state.shoot === true)
  //   this.createNew()
  // }

  // createNew(object){
  //   object = new 
  // }

  // Handles all animations
  updateAnimationState() {
    // this.setState(prevState => ({ angle: prevState.angle + 1 }));
    // this.setState(prevState => ({ positionX: prevState.positionX + this.state.stepX }));
    // this.setState(prevState => ({ positionY: prevState.positionY + this.state.stepY }));
    // console.log('x:', this.ship.pos.posX)
    const bcg = this.state.context
    bcg.save();
    bcg.clearRect(0, 0, 500, 500);

    // Create background
    bcg.fillStyle = 'black'
    bcg.fillRect(0, 0, w, h)

    // Some planets
    planet.render(this.state)

    // Ship
    this.ship.render(this.state)
    // spcCraft.render(this.state)
    
    if(this.fire.length > 0) this.fire.map(x => x.render(this.state))





    // Clear frame before redrawing
    bcg.restore();

    // render next frame
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  stopKeyPress = (event) => {
    if (event.keyCode === left || right) {
      this.setState({ stepX: 0 })
    }
    if (event.keyCode === up) {
      this.setState({ stepY: 0 })
    }
    if (event.keyCode === space) {
      this.setState({ shoot: false })
    }
  }

  handleKeyPress = (event) => {
    // event.preventDefault()
    if (event.keyCode === left) {
      this.setState({ stepX: - step })
    }
    if (event.keyCode === right) {
      this.setState({ stepX: step })
    }
    if (event.keyCode === up) {
      this.setState({ stepY: - step })
    }
    // if (event.keyCode === down) {
    //   this.setState({ stepY: step })
    // }
    if (event.keyCode === space) {
      const bullet = new Fire(this.ship.pos)
      this.addObject(bullet, 'fire')
      // this.setState({ shoot: true })
    }
  }

  render() {

    this.fire = this.fire.filter(blt => blt.delete === false)
    console.log('ship',this.ship, 'time', Date.now())


    if (this.state.positionX > w) { this.setState({ positionX: 0 }) }
    if (this.state.positionX < 0) { this.setState({ positionX: w }) }
    if (this.state.positionY > h) { this.setState({ positionY: 0 }) }
    if (this.state.positionY < 0) { this.setState({ positionY: h }) }

    return (
      <canvas width={window.innerWidth} height={window.innerHeight} ref='mycanvas'></canvas>
    )
  }
}



