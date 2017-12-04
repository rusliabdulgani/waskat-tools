import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

//IMPORT KOMPONEN BARANG

import SplashScreen from '../src/components/splashScreen/splashScreen'
import Login from '../src/components/login'
import Home from '../src/components/home/home'
import AddBarang from '../src/components/home/addBarang'

class App extends Component {

    render () {
      return (
        <Router>
          <Scene key='root' hideNavBar>
            <Scene key='SplashScreen' component={SplashScreen} title='SplashScreen' panHandlers={null} initial />
            <Scene key='Login' component={Login} title='Login' panHandlers={null} />
            <Scene key='Home' component={Home} title='Home' panHandlers={null} />
            <Scene key='AddBarang' component={AddBarang} title='AddBarang' panHandlers={null} />
          </Scene>
        </Router>
      )
    }
}

export default App