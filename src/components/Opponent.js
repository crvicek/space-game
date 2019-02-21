
export default class Ship {
  constructor(st) {
    this.pos = {
      posX: st.positionX,
      posY: st.positionY,
      angle: 0,
      velX: 0,
      velY: 0,
    }
    this.vel = {
      x: 0,
      y: 0,
    }
  }

  accelerate() {
    this.pos.velX -= Math.sin(-this.pos.angle * Math.PI / 180) * 0.2;
    this.pos.velY -= Math.cos(-this.pos.angle * Math.PI / 180) * 0.2;
  }

  // Render ship
  render(state) {
    const { context, stepX, stepY, w, h } = state;

    // Rotate
    if (stepX) { this.pos.angle += stepX }
    if (this.pos.angle > 360) { this.pos.angle = 0 }
    if (this.pos.angle < 0) { this.pos.angle = 360 }

    // Move the ship
    if (stepY) {
      this.accelerate()
    }
    this.pos.posX += this.pos.velX
    this.pos.posY += this.pos.velY
    // console.log(this.pos.velX, this.pos.velY)

    // Limit the speed & add speed resistance
    this.pos.velX *= 0.98
    this.pos.velY *= 0.98


    // Reset position once the object is out of the screen
    if (this.pos.posX > w) this.pos.posX = 0
    if (this.pos.posX < 0) this.pos.posX = w
    if (this.pos.posY > h) this.pos.posY = 0
    if (this.pos.posY < 0) this.pos.posY = h



    // Draw the SpaceCraft
    const color = ['red', 'lightblue', 'yellow', 'gray']
    // const colorPick = () => Math.floor(Math.random()*color.length)
    const opp = context
    opp.save()
    opp.translate(this.pos.posX, this.pos.posY);
    opp.rotate(this.pos.angle * Math.PI / 180);
    opp.beginPath();
    opp.moveTo(0, - 20);
    opp.lineTo(-10, 20);
    opp.lineTo(10, 20);
    opp.lineTo(0, -20);
    opp.closePath();
    opp.fillStyle = color[1]
    opp.fill()
    opp.restore()
  }
}