import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity, StyleSheet, Picker, TextInput, Dimensions, Alert, Modal, AsyncStorage, BackHandler} from 'react-native'
import {Actions} from 'react-native-router-flux'
import FitImage from 'react-native-fit-image'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import axios from 'axios'

import { allLogo } from '../../assets'
import {headerAddUser} from '../../helper/header'
import {URL_ADD_USER} from '../../api'

let {width, height} = Dimensions.get('window')
export default class AddUser extends Component {
  constructor (props) {
    super (props)
    this.state = {
        role: 'admin',
        id: '',
        username: '',
        password: '',
        email: '',
        headers: {},
        animate: false
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('headers').then((keyValue) => { this.setState(previousState => { return {headers: JSON.parse(keyValue)} }) })
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid())
  }

  componentWillMount () {
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid())
  }

  backAndroid () {
    this._backButton()
    return true
  }

  _backButton () {
    Alert.alert(
      'Hi,',
      'Apakah Anda yakin tidak ingin menambah user ?',
      [
        {text: 'IYA',
          onPress: () => {
            // this.props.clearContent()
            Actions.User({type: 'replace'})
          }
        },
        {text: 'TIDAK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  _onChangeID (event) {
    this.setState({id: event.nativeEvent.text})
  }

  _onChangeUsername (event) {
    this.setState({username: event.nativeEvent.text})
  }

  _onChangePassword (event) {
    this.setState({password: event.nativeEvent.text})
  }

  _onChangeEmail (event) {
    this.setState({email: event.nativeEvent.text})
    
  }


  _addUser() {
    this.setState({
      animate: true
    })
    let data = {
      id: this.state.id,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      role: this.state.role
    }
    AsyncStorage.getItem('headers')
    .then(result => {
      this.setState({
        headers: JSON.parse(result)
      })
    })
    .then(() => {
      console.log('headers', this.state.headers)
      axios(headerAddUser(URL_ADD_USER,this.state.headers, data))
      .then(resultAxios => {
          console.log('data user', resultAxios)
        this.setState({
            animate: false,
            dataUser: resultAxios.data
        })
        Alert.alert('Sukses!','Berhasil input user baru')
      })
      .catch(err => {
        this.setState({
          animate: false
        })
          Alert.alert('Error!','Internal Server Error')
          console.log('errornya', err)
      })
    })
  }

  _validation () {
    if (this.state.id.length === 0) {
      Alert.alert('Warning!','Kolom ID harus diisi')
    } else if (this.state.username.length === 0 ) {
      Alert.alert('Warning!','Kolom username harus diisi')
    } else if (this.state.password.length === 0 ) {
      Alert.alert('Warning!','Kolom password harus diisi')
    } else if (this.state.email.length === 0 ) {
      Alert.alert('Warning!','Kolom email harus diisi')
    } else if (!this.validateEmail(this.state.email)) {
      Alert.alert('Warning!','format email harus sesuai')
    } else {
      this._addUser()
      Actions.User({type: 'replace'})
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  _confirmation () {
    this.setState(previousState => { return {showModal: false} }, this.props.clearContent())
    Actions.User({type: 'replace'})
  }

  render () {
    console.log('state role', this.state.role)
    return (
        <View style={styles.viewImg}>
         {/* header area */}
         <View style={styles.header}>
         <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => this._backButton()}>
            <Image source={allLogo.backSymbol} style={{width: 40, height: 40, marginLeft: 10}} />
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>Add User</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={[styles.viewContent]}>
          <View style={{flex: 0.6}}>
          <View style={styles.viewInput}>
            <TextInput
              onChange={(event) => { this._onChangeID(event) }}
              placeholder='ID'
              returnKeyType='next'
              autoCapitalize='none'
              underlineColorAndroid='transparent'
              style={styles.textInput} />
          </View>
    
          <View style={[styles.viewInput, {marginTop: 20}]}>
            <TextInput
              onChange={(event) => { this._onChangeUsername(event) }}
              placeholder='Username'
              returnKeyType='next'
              underlineColorAndroid='transparent'
              maxLength={25}
              style={styles.textInput} />
        </View>
        <View style={[styles.viewInput, {marginTop: 20}]}>
            <TextInput
              onChange={(event) => { this._onChangePassword(event) }}
              placeholder='Password'
              returnKeyType='next'
              secureTextEntry
              underlineColorAndroid='transparent'
              maxLength={25}
              style={styles.textInput} />
        </View>
        <View style={[styles.viewInput, {marginTop: 20}]}>
            <TextInput
              onChange={(event) => { this._onChangeEmail(event) }}
              placeholder='Email'
              returnKeyType='next'
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              maxLength={25}
              style={styles.textInput} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width:width * 0.3, paddingTop: 15}}>
          <Text>Role: </Text>
        </View>
        <View style={{width:width * 0.5, paddingRight: 1}}>
        <Picker
          selectedValue={this.state.role}
          onValueChange={(itemValue, itemIndex) => this.setState({role: itemValue})}>
          <Picker.Item label="admin" value="admin" />
          <Picker.Item label="user" value="user" />
        </Picker>
        </View>
        </View>
          </View>
    
        </View>
        <View>
          <ActivityIndicator animating={this.state.animate} size='large' color='#0D6129'/>
        </View>
        <View style={{alignItems: 'center'}}>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { this._validation() }}>
          <Text style={styles.buttonText}>T A M B A H</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#0D6129',
        shadowOpacity: 0.05,
        shadowRadius: 0,
        zIndex: 2,
        shadowOffset: {
          height: 2,
          width: 0
        },
        paddingTop: 0,
        height: 60, // 86 (60 + 24)
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
    title: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'BrandonText-Light'
      },
    headerLeft: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
      },
      headerRight: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
      },
      headerHistory: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D6129',
        height: 50
      },
    viewImg: {
        flex: 1,
        alignItems: 'center'
      },
      viewContent: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        height: height*0.3,
        width: width*0.9,
        marginTop: 60
      },
      viewInput: {
        flex: 3,
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
        width: width,
        height: height * 0.08,
        backgroundColor: '#0D6129',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
      },
      buttonText: {
        textAlign: 'center',
        fontFamily: 'BrandonText-Black',
        fontSize: 20,
        color: 'white'
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
      }
})