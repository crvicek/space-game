import React from 'react'
import { Line } from 'react-konva'

 export default function MyShip() {
  return (
    <Line
      x={40}
      y={200}
      points={[0, 0, 100, 0, 50, 100]}
      tension={0.3}
      closed
      stroke="black"
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{ x: 0, y: 100 }}
      fillLinearGradientColorStops={[0, "black", 1, "red"]}
    />
  )
}