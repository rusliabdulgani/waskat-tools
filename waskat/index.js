import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'

import App from './src/App'
import store from './src/store'

export default class waskat extends Component {
    render () {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      )
    }
  }

AppRegistry.registerComponent('waskat', () => waskat)
