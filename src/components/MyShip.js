
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
    const { context, stepX, stepY, w, h, clr } = state;

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
    const ctx = context

    ctx.save()
    ctx.translate(this.pos.posX, this.pos.posY);
    ctx.rotate(this.pos.angle * Math.PI / 180);

    if (state.poopMode === true) {
      // Image
      var img = new Image()
      img.src = 'https://webstockreview.net/images/flying-clipart-person-15.png'
      // img.src = 'https://www.freepngimg.com/thumb/spaceship/24752-5-spaceship.png'
      ctx.drawImage(img, -20, -30, 40, 60)
    } else {
      ctx.beginPath();
      ctx.fillStyle = clr
      ctx.moveTo(0, - 20);
      ctx.bezierCurveTo(0, 5, -10, 10, -10, 20)
      ctx.bezierCurveTo(-5, 15, 5, 15, 10, 20)
      ctx.bezierCurveTo(10, 10, 0, 5, 0, -20)
      
      if(stepY) {
      ctx.fillStyle = 'orange'
      ctx.moveTo(0, 20);
      ctx.quadraticCurveTo(-8, 35, 0, 40);
      ctx.quadraticCurveTo(8, 35, 0, 20);
      }

      ctx.closePath();
      ctx.fill()
      ctx.restore()
    }
  }
}