import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect } from "react-konva";

const w = window.innerWidth
const h = window.innerHeight

let left = 37
let up = 38
let right = 39
let down = 40

let step = 10

var period = 800;
let moveL;
let moveR;
export default class App extends Component {
  state = {
    positionX: h / 2,
    positionY: w / 2
  }

  componentDidMount() {
    // var period = 800;

    moveL = new Konva.Animation(frame => {
      // this.rect.opacity((Math.sin(frame.time / period/2) + 1) / 2);
      // this.rect.setX(this.state.positionX * Math.sin(frame.time * 2 * Math.PI / period) + w/2);
      this.rect.setX((-this.state.positionY/period) * frame.time);
      // this.state.positionX((frame.time * this.state.positionX)/period);
    }, this.rect.getLayer());
    moveR = new Konva.Animation(frame => {
      // this.rect.opacity((Math.sin(frame.time / period/2) + 1) / 2);
      // this.rect.setX(this.state.positionX * Math.sin(frame.time * 2 * Math.PI / period) + w/2);
      this.rect.setX((this.state.positionY/period) * frame.time);
      // this.state.positionX((frame.time * this.state.positionX)/period);
    }, this.rect.getLayer());

    // anim.start();
    document.addEventListener('keydown', this.handleKeyPress)
    document.addEventListener('keyup', this.stopKeyPress)
    
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
    document.addEventListener('keyup', this.stopKeyPress)
  }
  
  stopKeyPress = (event) => {
    if (event.keyCode === left) {
      console.log('stop')
      moveL.stop();
    }
    if (event.keyCode === right) {
      moveR.stop()
    }
  }

  handleKeyPress = (event) => {
    if (event.keyCode === left) {
      console.log('left')
      this.setState({ positionY: this.state.positionY - step })
      moveL.start()
      
    }
    if (event.keyCode === right) {
      this.setState({ positionY: this.state.positionY + step })
      moveR.start()
    }
    if (event.keyCode === up) {
      this.setState({ positionX: this.state.positionX - step })
    }
    if (event.keyCode === down) {
      this.setState({ positionX: this.state.positionX + step })
    }
  }

  render() {
    return (
      <Stage width={w} height={h}>
        <Layer>
          <Rect
            x={500}
            y={500}
            width={50}
            height={50}
            fill="green"
            shadowBlur={5}
            ref={node => {
              this.rect = node;
            }}
          />
        </Layer>
      </Stage>
    );
  }
}

