import React, { Component } from 'react';
import Ship from './components/MyShip'
import Planet from './components/Planet'
import Fire from './components/Fire';
import io from 'socket.io-client';


const w = 900
const h = 600

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
      w: w,
      h: h,
      shoot: false,
      lastFire: 0,
    }
    // Communication with a server
    this.activeKeys = {
      up: false,
      left: false,
      right: false,
      space: false,
    }

    this.elementPosition = {
      x: 0,
      y: 0
    }

    this.serverExport = {
      keys: this.activeKeys,
      currentPosition: this.elementPosition,
      timestamp: Date.now()
    }



    // Generating the objects
    this.ship = new Ship(this.state)
    this.fire = []
    // console.log('ship in framerate', this.ship.pos)
  
    this.socketConnection = io('http://localhost:4000');
  
    console.log(this.socketConnection);
  
  
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  addObject(obj, name) {
    this[name].push(obj)
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState)
    const context = this.refs.mycanvas.getContext('2d');
    this.setState({ context: context });

    document.addEventListener('keydown', this.handleKeyState)
    document.addEventListener('keyup', this.stopKeyState)

  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  // Handles all animations
  updateAnimationState() {
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

    if (this.fire.length > 0) this.fire.map(x => x.render(this.state))

    // Handle key actions
    //   switch (this.activeKeys) {
    //     case up:
    //       this.setState({ stepY: - step })
    //     case left:
    //       this.setState({ stepX: -step })
    //     case right:
    //       this.setState({ stepX: step })
    //     default:
    //       this.setState({
    //         stepX: 0,
    //         stepY: 0,
    //       })
    // }

    this.activeKeys.up ? this.setState({ stepY: - step }) : this.setState({ stepY: 0 })

    if (this.activeKeys.right) { this.setState({ stepX: step }) }
    else if (this.activeKeys.left) { this.setState({ stepX: -step }) }
    else { this.setState({ stepX: 0 }) }

    if (this.activeKeys.space && Date.now() - this.state.lastFire > 200) {
      const bullet = new Fire(this.ship.pos)
      this.addObject(bullet, 'fire')
      this.setState({lastFire: Date.now()})
    }
  
    // console.log(this.fire)

    // Clear frame before redrawing
    bcg.restore();

    // render next frame
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  
  stopKeyState = (event) => {
    if (event.keyCode === left) {
      this.activeKeys.left = false
    }
    if (event.keyCode === right) {
      this.activeKeys.right = false
    }
    if (event.keyCode === up) {
      this.activeKeys.up = false
    }
    if (event.keyCode === space) {
      this.activeKeys.space = false
    }
  }

  handleKeyState = (event) => {
    if (event.keyCode === left) {
      this.activeKeys.left = true
    }
    if (event.keyCode === right) {
      this.activeKeys.right = true
    }
    if (event.keyCode === up) {
      this.activeKeys.up = true
    }
    if (event.keyCode === space) {
      this.activeKeys.space = true
    }
    console.log('Emitting: ' + this.serverExport);
    this.socketConnection.emit('@actions/RECEIVE_INPUT', this.serverExport);
  }

  // stopKeyPress = (event) => {
  //   if (event.keyCode === left || right) {
  //     this.setState({ stepX: 0 })
  //   }
  //   if (event.keyCode === up) {
  //     this.setState({ stepY: 0 })
  //   }
  //   if (event.keyCode === space) {
  //     this.setState({ shoot: false })
  //   }
  // }

  // handleKeyPress = (event) => {
  //   // event.preventDefault()
  //   if (event.keyCode === left) {
  //     this.setState({ stepX: - step })
  //   }
  //   if (event.keyCode === right) {
  //     this.setState({ stepX: step })
  //   }
  //   if (event.keyCode === up) {
  //     this.setState({ stepY: - step })
  //   }
  //   // if (event.keyCode === down) {
  //   //   this.setState({ stepY: step })
  //   // }
  //   if (event.keyCode === space) {
  //     const bullet = new Fire(this.ship.pos)
  //     this.addObject(bullet, 'fire')
  //     // this.setState({ shoot: true })
  //   }
  // }

  render() {

    this.fire = this.fire.filter(blt => blt.delete === false)
    // console.log('ship',this.ship, 'time', Date.now())



    // Handle overflow
    if (this.state.positionX > w) { this.setState({ positionX: 0 }) }
    if (this.state.positionX < 0) { this.setState({ positionX: w }) }
    if (this.state.positionY > h) { this.setState({ positionY: 0 }) }
    if (this.state.positionY < 0) { this.setState({ positionY: h }) }

    return (
      <canvas width={w} height={h} ref='mycanvas' className='Game'></canvas>
    )
  }
}



