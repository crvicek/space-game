export default class Planet {

  render(state) {
    const plt = state.context
    plt.beginPath();
    plt.arc(200, 200, 90, 0, 2 * Math.PI)
    plt.fillStyle = 'white'
    plt.fill()
  }
}