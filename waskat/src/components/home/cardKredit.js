import React from 'react'
import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import FitImage from 'react-native-fit-image'
import axios from 'axios'
import {allLogo} from '../../assets'

import {headerDeleteUser} from '../../helper/header'
import {URL_DELETE_USER} from '../../api'
export default class CardKredit extends React.PureComponent {

  constructor () {
    super ()
    this.state = {
      header: {}
    }
  }

  componentWillReceiveProps () {
    this.props
  }

  _deleteUser (id) {
    AsyncStorage.getItem('headers')
    .then(result => {
      this.setState({
        header: JSON.parse(result)
      })
    })
    .then(() => {
      axios(headerDeleteUser(`${URL_DELETE_USER}${id}`, this.state.header ))
      .then(resultAxios => {
        console.log('hasil delete', resultAxios)
        Alert.alert('Sukses!',`Berhasil delete user id: ${id}`)
      })
      .catch(err => {
        console.log('error delete user', err)
      })
    })
  }
    render () {
      const { 
        noKredit,
        _customerId,
        pinjaman
      } = this.props.data

      console.log('ini props' , this.props.data)
      return (
  
        <View style={styles.cards}>
          <View style={styles.cardContent}>
            <View style={styles.titleContainer}>
              <View><Text style={styles.titleKeluhan}>No Kredit: {noKredit}</Text>
                <Text style={styles.dateKeluhan}>Nama Peminjam: {_customerId.nama}</Text>
                <Text style={styles.dateKeluhan}>Jumlah Pinjaman: Rp. {pinjaman}</Text>
                <View style={styles.buttonAdmin}>
                </View>
              </View>
            </View>
              <TouchableOpacity style={styles.keluhanPreview} onPress={() => this._deleteUser(_id)}>
                <Text style={styles.textButtonHapus}>Detail Kredit</Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity>
          </TouchableOpacity>
        </View>
      )
    }
  }
  
  const {width, height} = Dimensions.get('window') 

  const styles = StyleSheet.create({
    icon: {
      width: 23,
      height: 23
    },
    buttonAdmin: {
      alignItems: 'center'
    },
    textAdmin: {
      backgroundColor: 'red',
      width: width * 0.13,
      padding: 5,
      borderRadius: 10,
      color: 'white'
    },
    iconTerkirimContainer: {
      width: 30,
      height: 30,
      borderRadius: 30,
      borderWidth: 0.5,
      backgroundColor: '#F37E7C',
      borderColor: '#EF5350',
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconProsesContainer: {
      width: 30,
      height: 30,
      padding: 4,
      borderRadius: 30,
      borderWidth: 0.5,
      backgroundColor: '#FCD061',
      borderColor: '#FBC02D',
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconSelesaiContainer: {
      width: 30,
      height: 30,
      padding: 4,
      borderRadius: 30,
      borderWidth: 0.5,
      backgroundColor: '#40D4C5',
      borderColor: '#01C6B2',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cards: {
      flex:1,
      height: height * 0.22,
      width: width*0.95,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 10,
      elevation: 3,
      backgroundColor: 'white',
      shadowOpacity: 0.8,
      shadowOffset: {
        height: 5,
        width: 3
      },
      shadowColor: '#eeeeee',
      marginTop: 5
    },
    imageContainer: {
      flex:1,
      width: 140,
      height: 140,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      alignItems: 'center'
    },
    blankImageContainer: {
      backgroundColor: '#d9d9d9',
      width: 140,
      height: 140,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    },
    cardImage: {
      flex: 1,
      width: '100%',
      height: 100
    },
    cardPlaceholder: {
      width: 140,
      height: 140,
      resizeMode: 'contain'
    },
    cardContent: {
      flex: 1.5,
      justifyContent:'space-between',
      paddingLeft: 16,
      paddingTop: 16,
      paddingBottom: 16
    },
    titleContainer: {
      flex:1,
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    keluhanPreviewContainer: {
      flex:1,
      paddingTop: 50
    },
    titleKeluhan: {
      fontFamily: 'BrandonText-Light',
      fontSize: 18,
      color: 'green'
    },
    dateKeluhan: {
      fontFamily: 'BrandonText-Light',
      fontSize: 15,
      color: 'green',
      lineHeight: 18,
      paddingTop: 5
    },
    keluhanPreview: {
      width: width,
      height: height*0.05,
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',

    },
    textButtonHapus: {
      fontFamily: 'BrandonText-Light',
      fontSize: 20,
      color: 'white'
    }
  })