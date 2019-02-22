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

  acc() {
    this.vel.x -= Math.sin(-this.angle * Math.PI / 180) * 0.9
    this.vel.y -= Math.cos(-this.angle * Math.PI / 180) * 0.9
  }

  destroy() {
    this.delete = true
  }
  render(state) {
    if (state.poopMode === false) {
      this.acc()
      this.posX += this.vel.x * 0.9
      this.posY += this.vel.y * 0.9
    }

    // Delete objects if they're out of screen
    if (
      this.posX > 900 || this.posX < 0 ||
      this.posY > 600 || this.posY < 0
    ) this.destroy()

    const fr = state.context
    fr.save();

    if (state.poopMode === false) {

      fr.translate(this.posX, this.posY)
    } else {
      fr.translate(state.posX, state.posY)
    }

    fr.rotate(this.angle * Math.PI / 180)

    if (state.poopMode === true) {
      // Image
      var img = new Image()
      img.src = 'https://clipart.info/images/ccovers/1496184260Poop-Emoji-Png.png'
      fr.drawImage(img, -20, -20, 20, 20)
    } else {

      // Shape
      fr.beginPath();
      fr.arc(0, 0, 2, 0, 2 * Math.PI)
      fr.fillStyle = '#C44536'
      fr.fill()
    }
    fr.restore()
  }
}