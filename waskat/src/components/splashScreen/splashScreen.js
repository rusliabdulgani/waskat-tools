import React, { Component } from 'react'
import { Image, Dimensions, AsyncStorage } from 'react-native'
import { Actions, } from 'react-native-router-flux'

// Detect screen width and height
const { width, height } = Dimensions.get('window')
const DELAY = 2500 ; // default 2000

class SplashScreen extends Component {
  componentDidMount () {
    setTimeout(() => {
      AsyncStorage.getItem('dataUser', (err, result) => {
        if(result === null){
          Actions.Login({type: "reset"})
        } else {
          Actions.Home({type: "reset", storage: JSON.parse(result)})
        }
      });
    }, DELAY )
  }

  render () {
    return (
      <Image
        source={require('../../assets/splash.jpg')}
        style={{width: width, height: height}}
      />
    )
  }
}

export default SplashScreen
