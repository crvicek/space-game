export default class Fire {
  constructor(st) {
    this.posX = st.posX
    this.posY = st.posY
    this.angle = st.angle
    this.delete = false

    this.vel = {
      x: st.velX,
      y: st.velY
    }
  }

  // acc() {
  //   this.vel.x -= Math.sin(-this.angle * Math.PI / 180) * 0.3;
  //   this.vel.y -= Math.cos(-this.angle * Math.PI / 180) * 0.3;
  // }

  destroy() {
    this.delete = true
  }
  render(state) {
    // console.log('posX', this.posX)

    // this.acc()
    // this.posX += this.vel.x * 0.5
    // this.posY += this.vel.y * 0.5

    if (
      this.posX > 900 || this.posX < 0 ||
      this.posY > 600 || this.posY < 0
    ) this.destroy()

    const fr = state.context
    fr.save();
    fr.translate(this.posX, this.posY);
    fr.beginPath();
    fr.arc(20, 10, 5, 0, 2 * Math.PI)
    fr.fillStyle = 'white'
    fr.fill()
    fr.restore()
  }
}