import Fire from "./Fire";

export default class Ship {
  constructor(st) {
    this.pos = {
      posX: st.positionX,
      posY: st.positionY,
      shoot: st.shoot,
    }
    this.angle = 0
    this.vel = {
      x: 0,
      y: 0,
    }
  }

  accelerate() {
    this.vel.x -= Math.sin(-this.angle * Math.PI / 180) * 0.2;
    this.vel.y -= Math.cos(-this.angle * Math.PI / 180) * 0.2;
  }

  // Render fire
  render(state) {
    const { context, stepX, stepY, w, h, shoot } = state;

    // if(shoot){
    //   const fire = new Fire(this.pos.fire);
    //   Object.create(fire)
    // this.lastShot = Date.now();
    // }
    // if(shoot) Fire.create(this.pos)

    // Rotate
    if (stepX) { this.angle += stepX }
    if (this.angle > 360) { this.angle = 0 }
    if (this.angle < 0) { this.angle = 360 }

    // Move the ship
    if (stepY) {
      this.accelerate()
    }
    this.pos.posX += this.vel.x
    this.pos.posY += this.vel.y
    this.vel.x *= 0.98
    this.vel.y *= 0.98


    // Reset position once the object is out of the screen
    if (this.pos.posX > w) this.pos.posX = 0
    if (this.pos.posX < 0) this.pos.posX = w
    if (this.pos.posY > h) this.pos.posY = 0
    if (this.pos.posY < 0) this.pos.posY = h



    // Draw the SpaceCraft
    const color = ['red', 'lightblue', 'yellow', 'gray']
    // const colorPick = () => Math.floor(Math.random()*color.length)
    const ctx = context
    ctx.save()
    ctx.translate(this.pos.posX, this.pos.posY);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, - 20);
    ctx.lineTo(-10, 20);
    ctx.lineTo(10, 20);
    ctx.lineTo(0, -20);
    ctx.closePath();
    ctx.fillStyle = color[1]
    ctx.fill()
    ctx.restore()
  }
}