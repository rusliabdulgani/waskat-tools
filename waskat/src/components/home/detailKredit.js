import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity, StyleSheet, Picker, TextInput, Dimensions, Alert, Modal, AsyncStorage, BackHandler} from 'react-native'
import {Actions} from 'react-native-router-flux'
import FitImage from 'react-native-fit-image'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import axios from 'axios'

import { allLogo } from '../../assets'

let {width, height} = Dimensions.get('window')
export default class DetailKredit extends Component {
  constructor (props) {
    super (props)
    this.state = {
        role: 'admin',
        nama: '',
        alamat: '',
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
    Actions.Kredit({type: 'replace'})    
    return true
  }


  render () {
    console.log('props', this.props.detailKredit._barangId.foto)
    let {noKredit, _customerId, _barangId, pinjaman} = this.props.detailKredit
    return (
        <View style={styles.viewImg}>
         {/* header area */}
         <View style={styles.header}>
         <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => this.backAndroid()}>
            <Image source={allLogo.backSymbol} style={{width: 40, height: 40, marginLeft: 10}} />
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>Detail Kredit</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={[styles.viewContent]}>
          <View style={{flex: 0.8, alignItems: 'center', paddingTop: 20}}>

            <Text>No Kredit : {noKredit}</Text>
            <Text>Customer  : {_customerId.nama}</Text>
            <Text>Pinjaman: Rp. {pinjaman}</Text>
            <Text>Barang: </Text>
            <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
            {
                _barangId.map((barang, idx) => {
                    return (
                        <Image source={{uri: barang.foto}} style={{ margin: 20, borderRadius: 25, width: '48%', margin: '1%', aspectRatio: 1}}></Image>
                    )
                })
            }
            </View>
          </View>
    
        </View>
        <View>
          <ActivityIndicator animating={this.state.animate} size='large' color='#0D6129'/>
        </View>
        <View style={{alignItems: 'center'}}>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { this._validation() }}>
          <Text style={styles.buttonText}>H A P U S</Text>
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