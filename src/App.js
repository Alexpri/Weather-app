import React, { Component } from 'react'
import './App.css'
import store from './store'
import MenuItems from './containers/MenuItems'
import SearchBlock from './containers/SearchBlock'
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <SearchBlock />
          <MenuItems />
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

export default App;
