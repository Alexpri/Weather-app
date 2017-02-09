import React, { Component } from 'react'
import './App.css'
import 'normalize.css'
import store from './store'
import MenuItems from './containers/MenuItems'
import SearchBlock from './containers/SearchBlock'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <Provider  store={ store }>
        <MuiThemeProvider>
          <div className="App">
            <SearchBlock />
            <MenuItems />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
