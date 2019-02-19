import Fire from "./Fire";

export default class Ship {
  constructor(st) {
    this.pos = {
      posX: st.positionX,
      posY: st.positionY,
      shoot: st.shoot,
    }
  }

  // Render fire
  render(state) {
    const { angle, context, stepX, stepY, w, h, shoot } = state;

    // if(shoot){
    //   const fire = new Fire(this.pos.fire);
    //   Object.create(fire)
      // this.lastShot = Date.now();
    // }
    // if(shoot) Fire.create(this.pos)

    // Move the ship
    if (stepX) { this.pos.posX += stepX }
    if (stepY) { this.pos.posY += stepY }

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
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, 40);
    ctx.lineTo(10, 40);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = color[1]
    ctx.fill()
    ctx.restore()
  }
}