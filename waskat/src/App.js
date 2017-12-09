import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

//IMPORT KOMPONEN BARANG

import SplashScreen from '../src/components/splashScreen/splashScreen'
import Login from '../src/components/login'
import Home from '../src/components/home/home'
import AddUser from '../src/components/home/addBarang'
import AddCustomer from '../src/components/home/addCustomer'
import Customer from '../src/components/home/Customer'
import User from '../src/components/home/User'
import Kredit from '../src/components/home/Kredit'
import AddKredit from '../src/components/home/addKredit'

class App extends Component {

    render () {
      return (
        <Router>
          <Scene key='root' hideNavBar>
            <Scene key='SplashScreen' component={SplashScreen} title='SplashScreen' panHandlers={null} initial />
            <Scene key='Login' component={Login} title='Login' panHandlers={null} />
            <Scene key='Home' component={Home} title='Home' panHandlers={null} />
            <Scene key='AddUser' component={AddUser} title='AddUser' panHandlers={null} />
            <Scene key='User' component={User} title='User' panHandlers={null} />
            <Scene key='Customer' component={Customer} title='Customer' panHandlers={null} />
            <Scene key='Kredit' component={Kredit} title='Kredit' panHandlers={null} />
            <Scene key='AddCustomer' component={AddCustomer} title='AddCustomer' panHandlers={null} />
            <Scene key='AddKredit' component={AddKredit} title='AddKredit' panHandlers={null} />
          </Scene>
        </Router>
      )
    }
}

export default App