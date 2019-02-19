import React from 'react'
import { Line } from 'react-konva'

export default class Ship {

  render(state) {
    const color = ['red', 'lightblue', 'yellow', 'gray']
    // const colorPick = () => Math.floor(Math.random()*color.length)
    const { angle, positionX, positionY, context } = state;
    const ctx = context
    ctx.translate(positionX, positionY);
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(10, 60);
    ctx.lineTo(30, 60);
    ctx.lineTo(20, 20);
    ctx.closePath();
    ctx.fillStyle = color[1]
    ctx.fill()

  }
}