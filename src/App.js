import React, { Component } from 'react';
import './App.css';
// import { Provider } from 'react-redux'
// import store from './store'
// import AlbumsListContainer from './components/AlbumsListContainer';
// import PhotoPageContainer from './components/PhotoPageContainer';
// import {Route} from 'react-router-dom'
import Game from './Game'

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
        <div className="App">
          <Game width = {window.innerWidth} height= {window.innerHeight} />
        {/* <Route exact path="/" component={Game} /> */}


        </div>
      // </Provider>
    );
  }
}

export default App;
