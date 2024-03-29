import React, { Component } from 'react';
import Ship from './components/MyShip'
import Planet from './components/Planet'
import Fire from './components/Fire';
import io from 'socket.io-client';
import './App.css';

// Screen size
const w = 900
const h = 600

// Key variables
const left = 37
const up = 38
const right = 39
const space = 32

let step = 10

let opponentSt = {
  angle: 0,
  positionX: w / 2,
  positionY: h / 2,
  stepX: 0,
  stepY: 0,
  context: null,
  w: w,
  h: h,
  lastFire: 0,
  clr: 'lightblue',
  shpX: 0,
  shpY: 0,
}

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
      lastFire: 0,
      clr: '#E5D352',
      commands: {},
      poopMode: false,
    }

    // Generating the objects
    this.planet = new Planet(this.state)
    this.ship = new Ship(this.state)
    this.opponent = new Ship(opponentSt)
    this.fire = []

    // Communication with a server
    this.activeKeys = {
      up: false,
      left: false,
      right: false,
      space: false,
    }

    this.elementPosition =
      {
        x: this.ship.pos.velX,
        y: this.ship.pos.velY,
      }

    this.serverExport = {
      keys: this.activeKeys,
      currentPosition: this.elementPosition,
      timestamp: Date.now()
    }

    // Server
    this.socketConnection = io('wss://lit-reef-92926.herokuapp.com');
    console.log('Client Game:', this.socketConnection);

    this.socketConnection.on('@action/actionPropagation', msg => {
      console.log(msg);
    });

    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  addObject(obj, name) {
    this[name].push(obj)
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState)
    let context = this.refs.mycanvas.getContext('2d');
    this.setState({ context: context })
    opponentSt.context = context

    this.socketConnection.on('@action/actionBroadcast', data => {
      this.setState({ commands: data })
    })

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
    this.planet.render(this.state)

    // Ship
    this.opponent.render(opponentSt)
    this.ship.render(this.state)

      if (this.fire.length > 0) this.fire.map(x => x.render(this.state))

    // Handle key actions
    this.activeKeys.up ? this.setState({ stepY: - step }) : this.setState({ stepY: 0 })

    if (this.activeKeys.right) { this.setState({ stepX: step }) }
    else if (this.activeKeys.left) { this.setState({ stepX: -step }) }
    else { this.setState({ stepX: 0 }) }

    // Bullet shoot interval and key handler
    if (this.activeKeys.space && Date.now() - this.state.lastFire > 200) {
      const bullet = new Fire(this.ship.pos)
      this.addObject(bullet, 'fire')
      this.setState({ lastFire: Date.now() })
    }

    // Handle opponent actions
    if (this.state.commands.keys !== undefined) {
      this.state.commands.keys.up ? opponentSt.stepY = -step : opponentSt.stepY = 0

      if (this.state.commands.keys.right) opponentSt.stepX = step
      else if (this.state.commands.keys.left) opponentSt.stepX = -step
      else opponentSt.stepX = 0
    }

    if (this.state.commands.keys !== undefined) console.log('works', this.state.commands.keys.up)

    // Clear frame before redrawing
    bcg.restore();

    // Render next frame
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
    this.socketConnection.emit('@actions/RECEIVE_INPUT', this.serverExport);
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
    this.socketConnection.emit('@actions/RECEIVE_INPUT', this.serverExport);

  }

  handleToggle = () => {
    if (this.state.poopMode) { this.setState({ poopMode: false }) } else { this.setState({ poopMode: true }) }
  }

  render() {
    this.fire = this.fire.filter(blt => blt.delete === false)


    // Handle overflow
    if (this.state.positionX > w) { this.setState({ positionX: 0 }) }
    if (this.state.positionX < 0) { this.setState({ positionX: w }) }
    if (this.state.positionY > h) { this.setState({ positionY: 0 }) }
    if (this.state.positionY < 0) { this.setState({ positionY: h }) }

    return (
      <div>
        <span className='Game-stats' >Game stats: {this.state.stepY}</span>
        <button onClick={this.handleToggle} >Toggle Mode</button>
        <canvas width={w} height={h} ref='mycanvas' className='Game'></canvas>
      </div>
    )
  }
}



