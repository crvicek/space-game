export default class Planet {

  render(state) {
    const plt = state.context

    if (state.poopMode === true) {
      // Image
      var img = new Image()
      img.src = 'http://assets.stickpng.com/thumbs/58f9fd580ed2bdaf7c128327.png'
      plt.drawImage(img, 110, 110, 180, 180)
    } else {
      // Shape
      plt.beginPath();
      plt.arc(200, 200, 90, 0, 2 * Math.PI)
      plt.fillStyle = 'white'
      plt.fill()
    }
  }
}