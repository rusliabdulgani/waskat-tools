import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Dimensions, Alert, Modal, AsyncStorage, BackHandler} from 'react-native'
import {Actions} from 'react-native-router-flux'
import FitImage from 'react-native-fit-image'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

import { allLogo } from '../../assets'
let {width} = Dimensions.get('window')

export default class AddBarang extends Component {
  constructor (props) {
    super (props)
    this.state = {
        judul: '',
        jenis_barang: '',
        berat_barang: '',
        pinjaman: '',
        foto: ''
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid())
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
      'Warning!',
      'Apakah Anda yakin tidak ingin menambah barang ?',
      [
        {text: 'IYA',
          onPress: () => {
            // this.props.clearContent()
            Actions.Home({type: 'replace'})
          }
        },
        {text: 'TIDAK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  _confirmation () {
    this.setState(previousState => { return {showModal: false} }, this.props.clearContent())
    Actions.Home({type: 'replace'})
  }

  render () {
    return (
        <View style={styles.viewImg}>
         {/* header area */}
         <View style={styles.header}>
         <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => this._backButton()}>
            <Image source={allLogo.backSymbol} style={{width: 40, height: 40, marginLeft: 10}} />
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>Add Barang</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={[styles.viewContent, {width: width}]}>
          <View style={styles.viewInput}>
            <TextInput
              onChange={(event) => { this._onChangeUsername(event) }}
              placeholder='Judul'
              returnKeyType='next'
              autoCapitalize='none'
              underlineColorAndroid='transparent'
              style={styles.textInput} />
          </View>
    
          <View style={[styles.viewInput, {marginTop: 20}]}>
            <TextInput
              onChange={(event) => { this._onChangePassword(event) }}
              placeholder='Jenis Barang'
              returnKeyType='next'
              underlineColorAndroid='transparent'
              maxLength={25}
              style={styles.textInput} />
        </View>
        <View style={[styles.viewInput, {marginTop: 20}]}>
            <TextInput
              onChange={(event) => { this._onChangePassword(event) }}
              placeholder='Berat Barang'
              returnKeyType='next'
              underlineColorAndroid='transparent'
              maxLength={25}
              style={styles.textInput} />
        </View>
        <View style={[styles.viewInput, {marginTop: 20}]}>
            <TextInput
              onChange={(event) => { this._onChangePassword(event) }}
              placeholder='Jumlah Pinjaman'
              returnKeyType='next'
              underlineColorAndroid='transparent'
              maxLength={25}
              style={styles.textInput} />
        </View>
        <View style={[styles.viewInput, {marginTop: 20}]}>
            <TextInput
              onChange={(event) => { this._onChangePassword(event) }}
              placeholder='Link Image'
              returnKeyType='go'
              underlineColorAndroid='transparent'
              maxLength={25}
              style={styles.textInput} />
        </View>
    
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { this._sendDataForLogin() }}>
          <Text style={styles.buttonText}>T A M B A H</Text>
        </TouchableOpacity>
        </View>
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
        paddingLeft: 40,
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
        backgroundColor: '#0D6129',
        paddingVertical: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        marginTop: 20
      },
      buttonText: {
        textAlign: 'center',
        fontFamily: 'BrandonText-Black',
        fontSize: 15,
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