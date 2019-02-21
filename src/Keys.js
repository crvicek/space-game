import Konva, { Stage } from 'react-konva'

var stage = new Konva.Stage({
  container: 'Game',
  width: window.innerWidth,
  height: window.innerHeight
});

var layer = new Konva.Layer();
stage.add(layer);

var circle = new Konva.Circle({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2 + 10,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

layer.add(circle);
layer.draw();


var container = stage.container();

// make it focusable

container.tabIndex = 1;
// focus it
// also stage will be in focus on its click
container.focus();


const DELTA = 4;

container.addEventListener('keydown', function (e) {
  if (e.keyCode === 37) {
    circle.x(circle.x() - DELTA);
  } else if (e.keyCode === 38) {
    circle.y(circle.y() - DELTA);
  } else if (e.keyCode === 39) {
    circle.x(circle.x() + DELTA);
  } else if (e.keyCode === 40) {
    circle.y(circle.y() + DELTA);
  } else {
    return;
  }
  e.preventDefault();
  layer.batchDraw();
});