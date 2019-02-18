import React, { Component } from 'react';
import MyRect from './components/MyRect'
import MyCircle from './components/MyCircle'
import Konva, { Stage, Layer } from 'react-konva';

const w = window.innerWidth
const h = window.innerHeight

let left = 37
let up = 38
let right = 39
let down = 40

let step = 10

class Game extends React.Component {
  state = {
    positionX: h / 2,
    positionY: w / 2
  }
  componentDidMount() {
    // this.updateCanvas();
    document.addEventListener('keydown', this.handleKeyPress)
  }
  componentDidUpdate() {
    // this.updateCanvas();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress = (event) => {
    if (event.keyCode === left) {
      console.log('left')
      this.setState({ positionY: this.state.positionY - step })
    }
    if (event.keyCode === right) {
      this.setState({ positionY: this.state.positionY + step })
    }
    if (event.keyCode === up) {
      this.setState({ positionX: this.state.positionX - step })
    }
    if (event.keyCode === down) {
      this.setState({ positionX: this.state.positionX + step })
    }
  }

  render() {
    console.log('State:', this.state)
    return (
      <div id="Game">
        <Stage
          container={Game}
          width={window.innerWidth}
          height={window.innerHeight}
        >

          <Layer>
            {/* <MyRect /> */}
            <MyCircle x={this.state.positionX} y={this.state.positionY} />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Game;
