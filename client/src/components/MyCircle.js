import React from 'react'
import { Circle } from 'react-konva'

export default function MyCircle(props) {
  return (
    <Circle
      y={props.x}
      x={props.y}
      radius={50}
      fill="yellow"
      
      />

  )
}