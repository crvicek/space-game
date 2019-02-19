export default class Fire {
  constructor(st) {
    this.posX = st.posX
    this.posY = st.posY
  }

  render(state) {
      const fr = state.context
      fr.save();

      fr.translate(this.posX - 20, this.posY - 40 );

      fr.beginPath();
      fr.arc(20, 10, 5, 0, 2 * Math.PI)
      fr.fillStyle = 'white'
      fr.fill()
      fr.restore()
  }
}