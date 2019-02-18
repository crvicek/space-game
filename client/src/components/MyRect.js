import React from 'react'
import { Rect } from 'react-konva'

export default function MyRect(props) {
    return (
      <Rect
        x={200}
        y={200}
        width={100}
        height={100}
        fill="red"
        shadowBlur={10}
      />
    )
  }
