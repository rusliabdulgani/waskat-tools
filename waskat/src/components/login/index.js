import React, { Component } from 'react'
import { Animated, ToastAndroid, Platform, View, Text, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator, Alert, Keyboard, NetInfo, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'

import { loginThunk } from '../../thunk/loginThunk'
import { allLogo } from '../../assets'

const { width, height} = Dimensions.get('window')

class Login extends Component {
  constructor () {
    super ()
    this.state = {
      username: '',
      password: '',
      msgErr: '',
      err: '',
      isConnected: '',
      sourceUsername: allLogo.username,
      sourcePassword: allLogo.password,
      spinnerVisible: false,
      storage: {}
    }
    this.animatedValue = new Animated.Value(235) 
  }
  

  componentWillMount () {
    NetInfo.isConnected.addEventListener('connectionChange',  this.handleConnectionChange)
    BackHandler.addEventListener('hardwareBackPress', () => this._backAndroid())
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        this.setState({isConnected: isConnected ? 'online' : 'offline'})
      }
    )
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this._backAndroid())
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  _backAndroid () {
    Alert.alert(
      'Keluar dari Aplikasi',
      'Apakah anda ingin keluar dari aplikasi?',
      [{text: 'Tidak', 
        onPress: () => console.log('Cancel'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      }],
      { cancelable: false }
    )
    return true
  }

  _onChangeUsername (event) {
    this.setState({username: event.nativeEvent.text})
    event.nativeEvent.text === '' ? this.setState({sourceUsername: allLogo.username}) : this.setState({sourceUsername: allLogo.usernameActive})
  }

  _onChangePassword (event) {
    this.setState({password: event.nativeEvent.text})
    event.nativeEvent.text === '' ? this.setState({sourcePassword: allLogo.password}) : this.setState({sourcePassword: allLogo.passwordActive})
  }

  _sendDataForLogin () {
    const { username, password, isConnected } =  this.state
    let input = {
      username: username,
      password: password
    }

    let callback = (input) => {
      const self = this
      console.log('hasil login', input)
      input.data.token !== undefined ? (
      AsyncStorage.setItem('headers', JSON.stringify(input.data)),
      AsyncStorage.setItem('dataUser', JSON.stringify(input.data)),
      this.setState({spinnerVisible: false}),
      Actions.Home({type: "reset", storage: input.data}),
      console.log('input'),
      Keyboard.dismiss()
      ) : (
      console.log('login failed', input),
      Alert.alert(
        input.data,
        'Mohon login kembali',
        [{text: 'OK', onPress: () => self.setState({spinnerVisible: false})}]
        )
      )
    }

    if (username.length === 0 && password.length === 0){
        Alert.alert("Failed","Username dan Password tidak boleh kosong")
      } else if(username.length === 0){
        Alert.alert("Failed","Username tidak boleh kosong")
      } else if(password.length === 0){
        Alert.alert("Failed","Password tidak boleh kosong")
      } else {
        const self = this
        self.setState({spinnerVisible: true})
        this.props.sendData(input, callback)
      }
  }

  render () {
    const { viewImg, viewContent, viewInput, textInput, imgIconUsername, imgIconPassword, buttonContainer, buttonText, viewContentKataSandi, buttonKataSandi } = styles

    return (
        <ImageBackground source={allLogo.login} style={{width: width, height: height}}>
          <View style={viewImg}>
            <View style={[viewContent, {width: width}]}>
              <View style={viewInput}>
                {/* INPUT EMAIL */}
                <Image source={this.state.sourceUsername} style={imgIconUsername} />
                <TextInput
                  onChange={(event) => { this._onChangeUsername(event) }}
                  placeholder='Username'
                  returnKeyType='next'
                  autoCapitalize='none'
                  underlineColorAndroid='transparent'
                  style={styles.textInput} />
              </View>

              <View style={[viewInput, {marginTop: 20}]}>
                <Image source={this.state.sourcePassword} style={imgIconPassword} />
                <TextInput
                  onChange={(event) => { this._onChangePassword(event) }}
                  placeholder='Password'
                  secureTextEntry
                  returnKeyType='go'
                  underlineColorAndroid='transparent'
                  maxLength={25}
                  style={textInput} />
            </View>

            <TouchableOpacity style={buttonContainer} onPress={() => { this._sendDataForLogin() }}>
              <Text style={buttonText}>M A S U K</Text>
            </TouchableOpacity>
            <Spinner visible={this.state.spinnerVisible} color='#68D9C6' size='large' overlayColor={'rgba(0, 0, 0, 0.85)'} />
            </View>
          </View>
        </ImageBackground>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendData: (input, callback) => dispatch(loginThunk(input, callback))
  }
}

export default connect(null, mapDispatchToProps)(Login)

const styles = {
    viewImg: {
      flex: 1,
      alignItems: 'center',
      marginTop: 65
    },
    viewContent: {
      flex: 1,
      paddingLeft: 150,
      paddingRight: 40,
      backgroundColor: 'transparent',
      height: 'auto',
      marginTop: 100
    },
    viewInput: {
      flexDirection: 'row'
    },
    textInput: {
      flex: 1,
      width: 'auto',
      height: 40,
      borderColor: '#BDBDBD',
      borderBottomWidth: 1,
      fontSize: 14,
      fontFamily: 'BrandonText-Regular'
    },
    imgIconUsername: {
      width: 25,
      height: 25,
      marginTop: 10,
      marginRight: 15
    },
    imgIconPassword: {
      width: 25,
      height: 30,
      marginTop: 5,
      marginRight: 15
    },
    buttonContainer: {
      width: '50%',
      backgroundColor: '#AFFF26',
      paddingVertical: 14,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
      marginLeft: 40,
      marginTop: 40
    },
    buttonText: {
      textAlign: 'center',
      fontFamily: 'BrandonText-Black',
      fontSize: 15,
      color: '#333333'
    },
    viewContentKataSandi: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20
    },
    buttonKataSandi: {
      color: '#01C6B2',
      fontFamily: 'BrandonText-Medium',
      fontSize: 14
    },
    line: {
      marginLeft: 40,
      width: '85%',
      //width: 244,
      height: 1,
      backgroundColor: '#BDBDBD'
    },
  
   }
  
