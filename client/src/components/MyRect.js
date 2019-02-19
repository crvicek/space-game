import React from 'react'
import { Rect } from 'react-konva'

// function MyRect(props) {
//   return (
//     <Rect
//       // ref="rect"
//       y={props.x}
//       x={props.y}
//       width={100}
//       height={100}
//       fill="gray"

//     />
//   )
// }

// export default React.forwardRef((props, innerRef) => <MyRect {...props} ref={innerRef} />)
export default class MyRect extends React.Component {
  changeSize() {
    const rect = this.refs.rect;

    // to() is a method of `Konva.Node` instances
    rect.to({
      x: this.props.y,
      y: this.props.x,
      // scaleX: Math.random() + 0.8,
      // scaleY: Math.random() + 0.8,
      duration: 1
    });
  }
  render() {
    return (
      <Rect
        ref="rect"
        width="50"
        height="50"
        fill="green"
        // draggable="true"
        // onDragEnd={this.changeSize.bind(this)}
        // onDragStart={this.changeSize.bind(this)}
      />
    );
  }
}