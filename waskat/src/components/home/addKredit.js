import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity, ScrollView, StyleSheet, Picker, TextInput, Dimensions, Alert, Modal, AsyncStorage, BackHandler} from 'react-native'
import {Actions} from 'react-native-router-flux'
import FitImage from 'react-native-fit-image'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import Spinner from 'react-native-loading-spinner-overlay'
import * as Crop from 'react-native-image-crop-picker'
import {connect} from 'react-redux'
import axios from 'axios'

import { allLogo } from '../../assets'
import {headerAddUser, headerGetDataBarang} from '../../helper/header'
import {URL_GET_KREDIT, URL_GET_DATA_CUSTOMER, URL_POST_BARANG} from '../../api'
import { FotoKreditThunk } from '../../thunk/kreditThunk';

let {width, height} = Dimensions.get('window')

export default class AddKredit extends Component {
  constructor (props) {
    super (props)
    this.state = {
        customer: 'customer',
        nama: '',
        alamat: '',
        email: '',
        headers: {},
        animate: false,
        customers: [],
        showModalCamera: false,
        opacity: 1,
        images: [],
        _barangId: [],
        _customerId: '',
        noKredit: '',
        pinjaman: 0
    }
  }

  componentDidMount () {
    this._getCustomer()
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
      'Apakah Anda yakin tidak ingin membuat kredit baru ?',
      [
        {text: 'IYA',
          onPress: () => {
            // this.props.clearContent()
            Actions.Kredit({type: 'replace'})
          }
        },
        {text: 'TIDAK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  _oncChangeNoKredit (event) {
    this.setState({noKredit: event.nativeEvent.text})
  }

  _onChangePinjaman (event) {
    this.setState({pinjaman: event.nativeEvent.text})
  }

  _onChangeEmail (event) {
    this.setState({email: event.nativeEvent.text})
  }

  _getCustomer() {
    AsyncStorage.getItem('headers')
    .then(result => {
      this.setState({
        headers: JSON.parse(result)
      })
    })
    .then(() => {
        axios(headerGetDataBarang(URL_GET_DATA_CUSTOMER, this.state.headers))
        .then(resultAxios => {
            console.log('data customer', resultAxios.data)
            this.setState({
                customers: resultAxios.data
            })
        })
        .catch(err => {
            console.log('error get customers', err)
            Alert.alerr('Error!','Internal Server Error')
        })
    })
    .catch(err => {
        console.log(err)
    })
  }

  _addKredit() {
    this.setState({
      animate: true
    })
    let input = {
        noKredit: this.state.noKredit,
        _customerId: this.state._customerId,
        pinjaman: this.state.pinjaman,
        _barangId: this.state._barangId
    }
    AsyncStorage.getItem('headers')
    .then(result => {
      this.setState({
        headers: JSON.parse(result)
      })
    })
    .then(() => {
      console.log('headers', this.state.headers)
      axios(headerAddUser(URL_GET_KREDIT, this.state.headers, input))
      .then(resultAxios => {
          console.log('data kredit', resultAxios)
        this.setState({
            animate: false,
            dataKredit: resultAxios.data
        })
        Alert.alert('Sukses!','Berhasil input customer')
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

  _uploadPictureCamera () {
    this.setState(previousState => { return {spinnerVisible: false, showModalCamera: false, opacity: 1} })
    Crop.default.openCamera({width: 400, height: 400, cropping: true})
    .then(image => {
      gambar = []
      let url = 'https://waskat-tools.appspot.com/upload/single'
      let RandomNumber = Math.floor(Math.random() * 10000000) + 1 ;
      const postData = new FormData()
      postData.append('file', { uri: image.path, type: 'image/jpg', name: `barang-${RandomNumber}.jpg` })
      axios(headerAddUser(url, this.state.headers, postData))
        .then((resultAxios) => {
          console.log('upload------------', resultAxios.data, image.path)
          axios(headerAddUser(URL_POST_BARANG, this.state.headers, {foto: resultAxios.data.result, keterangan: 'text'}))
          .then(resultAxios2 => {
            this.setState({_barangId: [...this.state._barangId, resultAxios2.data._id]})
          })
          .catch(err => {
            console.log(err)
          })
          this.setState({images: [...this.state.images, resultAxios.data.result]})
          this.setState(previousState => { return {spinnerVisible: false, showModalCamera: false, opacity: 1} })
        })
        .catch(err => {
          console.log('error nya',err)
        })
    })
    .catch(error => {
      console.log(error)
      this.setState(previousState => { return {spinnerVisible: false, showModalCamera: false, opacity: 1} })
    })
  }

  _uploadPictureGallery () {
    this.setState(previousState => { return {spinnerVisible: true, showModalCamera: false, opacity: 1} })
    Crop.default.openPicker({width: 400, height: 400, cropping: true})
    .then(image => {
      let url = 'https://waskat-tools.appspot.com/upload/single'
      const postData = new FormData()
      let RandomNumber = Math.floor(Math.random() * 10000000) + 1 ;
      postData.append('file', { uri: image.path, type: 'image/jpg', name: `barang-${RandomNumber}.jpg` })
      axios(headerAddUser(url, this.state.headers, postData))
        .then((resultAxios) => {
          console.log('upload--------', resultAxios.data.result)
          axios(headerAddUser(URL_POST_BARANG, this.state.headers, {foto: resultAxios.data.result, keterangan: 'text'}))
          .then(resultAxios2 => {
            console.log('ini input barang', resultAxios2.data._id  )
            this.setState({_barangId: [...this.state._barangId, resultAxios2.data._id]})
          })
          .catch(err => {
            console.log(err)
          })
          this.setState({images: [...this.state.images, resultAxios.data.result]})
          this.setState(previousState => { return {spinnerVisible: false, showModalCamera: false, opacity: 1} })
        })
    })
    .catch(error => {
      console.log(error)
      this.setState(previousState => { return {spinnerVisible: false, showModalCamera: false, opacity: 1} })
    })
  }

  _validation () {
    if (this.state.noKredit.length === 0) {
        Alert.alert('Warning!','Kolom Nomor Kredit harus diisi')
    } else if (this.state.pinjaman === 0) {
        Alert.alert('Warning!','Kolom pinjaman harus diisi')
    } else if (this.state.images.length === 0) {
        Alert.alert('Warning!','Gambar harus diisi')
    } else if (this.state._customerId.length === 0) {
        Alert.alert('Warning!','Customer harus dipilih')
    } else {
      this._addKredit()
      Actions.Kredit({type: 'replace'})
    }
  }


  render () {
    console.log('props redux', this.state.images, this.state._customerId)
    return (
        <View style={[styles.viewImg, {opacity: this.state.opacity}]}>
         {/* header area */}
         <View style={styles.header}>
         <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => this._backButton()}>
            <Image source={allLogo.backSymbol} style={{width: 40, height: 40, marginLeft: 10}} />
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>Buat Kredit</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView style={[styles.viewContent]}>
            <View style={{flex: 0.7, paddingLeft: 40, paddingRight: 40}}>
            <View style={styles.viewInput}>
                <TextInput
                    onChange={(event) => { this._oncChangeNoKredit(event) }}
                    placeholder='No Kredit'
                    returnKeyType='next'
                    autoCapitalize='none'
                    underlineColorAndroid='transparent'
                    style={styles.textInput} />
            </View>
            <View style={{flex: 3, flexDirection: 'row'}}>
                <View style={{width:width * 0.3, paddingTop: 15}}>
                    <Text>Customer </Text>
                </View>
                <View style={{width:width * 0.5, paddingRight: 1}}>
                    <Picker
                    selectedValue={this.state._customerId}
                    onValueChange={(itemValue, itemIndex) => this.setState({_customerId: itemValue})}>
                    <Picker.Item label={`Pilih Customer..`} value={''} />
                    {
                        this.state.customers.map((cust, idx) => {
                            return (
                                <Picker.Item label={`${idx+1}. ${cust.nama}`} value={cust._id} />
                            )
                        })
                    }
                    </Picker>
                </View>
            </View>
    
            <View style={[styles.viewInput, {marginTop: 20}]}>
                <TextInput
                onChange={(event) => { this._onChangePinjaman(event) }}
                placeholder='Pinjaman'
                returnKeyType='next'
                underlineColorAndroid='transparent'
                style={styles.textInput} />
            </View>
        </View>
            <TouchableOpacity style={[styles.buttonTambah, {marginTop: 20, marginBottom: 20}]} onPress={() => this.setState({showModalCamera: true, opacity: 0.3})}>
                {
                  this.state.images.length !== 0 ?
                  <Text style={styles.buttonTambahBarang}>Tambah Barang Jaminan</Text>
                  :
                  <Text style={styles.buttonTambahBarang}>Barang Jaminan</Text>
                }
            </TouchableOpacity>
            <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              this.state.images.map((image, idx) => {
                return (
                  <Image style={{margin: 20, borderRadius: 25, width: '30%', aspectRatio: 1}}
                  source={{uri: image}} idx={{idx}} />
                )
              })
            }
            </View>
        </ScrollView>
        <View>
          <ActivityIndicator animating={this.state.animate} size='large' color='#0D6129'/>
        </View>
        <View style={{alignItems: 'center'}}>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { this._validation() }}>
          <Text style={styles.buttonText}>T A M B A H</Text>
        </TouchableOpacity>

        {/* MODAL FOR PICK IMAGE */}
        <Modal animationType={'slide'} style={{borderRadius: 10}} transparent visible={this.state.showModalCamera} backgroundColor='transparent' onRequestClose={() => console.log('close')}>
          <View style={styles.modalKeluhanContainer}>
            <View style={styles.modalKeluhanContentContainer}>
              <View style={styles.modalKeluhanTitle}>
                <Text style={styles.modalKeluhanTitleFont}>Pilih gambar</Text>
              </View>
              <View style={{flex: 3}}>
                <TouchableOpacity style={{height: 50}} onPress={() => this._uploadPictureCamera()}>
                  <Text>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 50}} onPress={() => this._uploadPictureGallery()}>
                  <Text>Galery</Text>
                </TouchableOpacity>
                <View style={{top: 10, width: 150, borderBottomWidth: 2, borderColor: '#f3f3f3'}} />
              </View>
              <View>
                <View style={{top: -60, alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => { this.setState({showModalCamera: false, opacity: 1}) }}>
                    <Text style={{fontSize: 20, color: '#01C6B2'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
      buttonTambahBarang: {
        fontFamily: 'BrandonText-Black',
        fontSize: 20,
        color: 'white',
        paddingRight: 30
      },
      modalKeluhanContentContainer: {
        width: width / 1.4,
        height: 230,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
      },
      modalKeluhanTopContent: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
      },
      modalKeluhanTitle: {
        flex: 1,
        alignItems: 'center'
      },
      modalKeluhanTitleFont: {
        fontFamily: 'BrandonText-Black',
        fontSize: 15
      },
      modalKeluhanContentFont: {
        fontFamily: 'BrandonText-Light'
      },
      modalKeluhanContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      },
      textButtonHapus: {
        fontFamily: 'BrandonText-Light',
        fontSize: 20,
        color: 'green'
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
      viewInput: {
          paddingLeft: 40,
          paddingRight: 40
      },
      viewContent: {
        flex: 1,
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
        justifyContent: 'center'
      },
      buttonTambah: {
        width: width*0.95,
        height: height * 0.06,
        backgroundColor: '#0D6129',
        alignItems: 'center',
        justifyContent: 'center'
      },
      buttonText: {
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