import React, { Component } from 'react'
import { View, Text, BackHandler, StyleSheet, Platform, TouchableOpacity, Dimensions, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import Modal from 'react-native-modal'

import {uniqueNumber} from '../../helper'
import { allLogo } from '../../assets'
//IMPORT FILE
import CardBarang from './cardBarang'


const {width, height} = Dimensions.get('window')

export default class Home extends Component {
  constructor (props) {
      super (props)
      this.state = {
        reports: [],
        visibleModal: ''
      }
  }

  componentWillUnmount () {
    BackHandler.addEventListener('hardwareBackPress', () => this._backAndroid())
  }

  _backAndroid () {
    this.setState({ visibleModal: 'dialog_exit' })
    return true
  }

  _exit () {
    //this.setState({ visibleModal: null })
    BackHandler.exitApp()
  }

  componentDidMount () {
    this._setReports()
    BackHandler.addEventListener('hardwareBackPress', () => this._backAndroid())
  }

  _changeSceneAddBarang () {
    Actions.AddBarang({type: 'replace'})
  }

  _setReports () {
    let datas = [
      {
        judul: 'emas oke oce',
        jenis_barang: 'logam mulia/emas',
        berat_barang: '13 gram',
        pinjaman: 10000000,
        foto: 'http://scofany.com/wp-content/uploads/2014/10/KR05-1.jpg'
      },
      {
        judul: 'jam tangan alexander christie',
        jenis_barang: 'perhiasan',
        berat_barang: '200 gram',
        pinjaman: 5000000,
        foto: 'https://dynamic.zacdn.com/-1VLhAjwhCVbP0DvfWeC-UEqets=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/alexandre-christie-4718-9716341-2.jpg'
      },
      {
        judul: 'Sepeda Motor Honda Vario',
        jenis_barang: 'kendaraan',
        berat_barang: '-',
        pinjaman: 5000000,
        foto: 'http://cdnhonda.azureedge.net/wp-content/uploads/2017/04/fitur-vario-125-2017-new.png'
      },
      {
        judul: 'Cincin berlian',
        jenis_barang: 'Perhiasan',
        berat_barang: '10 gram',
        pinjaman: 15000000,
        foto: 'http://www.permata-berlian.info/wp-content/uploads/2017/02/harga-cincin-berlian.jpg'
      },
      
    ]
    this.setState({ reports: datas})
  }

  _renderItem ({item}) {
    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() => Actions.DetailBarang({detail: item})}>
          <CardBarang data={item} />
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    let { reports, visibleModal } = this.state
    console.log('data dummie', reports, visibleModal)
    return (
      <View style={styles.container}>
        {/* header area */}
        <View style={styles.headerHistory}>
          <Text style={styles.title}>List Barang</Text>
          <View style={styles.headerRight} />
        </View>
        
         { reports.length !== 0 ?
          (<OptimizedFlatList
            style={styles.content}
            data={reports}
            keyExtractor={() => uniqueNumber()}
            renderItem={this._renderItem}
            />) :
            (
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 24}}>Belum ada data</Text>
              </View>
            )
          }
          <TouchableOpacity style={styles.addKeluhanButtonContainer} onPress={() => this._changeSceneAddBarang()}>
            <Image style={styles.addKeluhanButton} source={allLogo.add} />
          </TouchableOpacity>

          <Modal isVisible={this.state.visibleModal === 'dialog_exit'} backdropOpacity={0.4} animationIn={'fadeIn'} animationOut={'fadeOut'} backdropColor={'black'}>
           <View style={styles.viewDialogJenisLayanan}>
             <View style={styles.cardDialogRadius}>
                <Text style={styles.textConfirm}>Apakah Anda yakin ingin keluar{'\n'}dari aplikasi ?</Text>
                <View style={styles.lineDialog} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.viewTidak} onPress={() => this.setState({ visibleModal: '' })}>
                    <Text style={styles.textTidak}> TIDAK </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewYa} onPress={() => this._exit()}>
                    <Text style={styles.textYa}> YA </Text>
                  </TouchableOpacity>
                </View>
             </View>
           </View>
         </Modal>
         
      </View>
    )
  }
}

const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  viewDialogJenisLayanan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textTidak: {
    fontSize: 14,
    color: '#416F14',
    
    fontFamily: 'BrandonText-Black'
  },
  viewYa: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textYa: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'BrandonText-Black'
  },
  viewTidak: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineDialog: {
    width: '100%',
    height: 1,
    backgroundColor: '#95989A',
    opacity: 0.25,
    marginTop: 20,
    marginBottom: 20
  },
  filterBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: (10 / 100 * windowHeight + 24),
    zIndex: 3,
    backgroundColor: '#eee',
    opacity: 0.75,
    paddingLeft: 16,
    paddingRight: 16
  },
  textConfirm: {
    fontSize: 14,
    color: '#4B4B4B',
    fontFamily: 'BrandonText-Bold',
    width: '100%',
    textAlign: 'center'
  },
  cardDialogRadius: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    width: width * 0.83,
    padding: 20,
    zIndex: 1,
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: {
      height: 4,
      width: 2
    },
    elevation: 2
  },
  filterOptionsContainer: {
    marginTop: (10 / 100 * windowHeight + 24),
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 330,
    zIndex: 4,
    opacity: 1
  },
  cardDialogRadius: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    width: width * 0.83,
    padding: 20,
    zIndex: 1,
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: {
      height: 4,
      width: 2
    },
    elevation: 2
  },
  filterOptions: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowOpacity: 0.05,
    shadowRadius: 0,
    shadowOffset: {
      height: 2,
      width: 0
    },
    paddingLeft: 40,
    paddingTop: 17,
    paddingBottom: 17,
    paddingRight: 14
  },

  filterHeader: {
    marginLeft: 37,
    paddingTop: 8,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  addKeluhanButtonContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 24,
    right: 12,
    width: 80,
    height: 80
  },

  addKeluhanButton: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },

  filterItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  filterIcon: {
    width: 12,
    height: 30,
    resizeMode: 'contain',
    marginRight: 25
  },

  closeIcon: {
    width: 15,
    height: 15,
    resizeMode: 'center'
  },

  filterText: {
    width: '60%',
    height: 50,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center'
  },

  title: {
    fontSize: 22,
    marginTop: 15,
    color: 'white',
    fontFamily: 'BrandonText-Light'
  },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    shadowOpacity: 0.05,
    shadowRadius: 0,
    zIndex: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    ...Platform.select({
      ios: {
        // paddingTop:20,
      },
      android: {
        paddingTop: 0
      }
    }),
    height: '10%', // 86 (60 + 24)
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D6129'
  },
  content: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 32
  },
  iconFilter: {
    marginRight: 28,
    width: 12,
    height: 20,
    resizeMode: 'contain'
  },

  filter: {
    fontFamily: 'BrandonText-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#333333'
  },
  filterHeaderText: {
    fontFamily: 'BrandonText-Black',
    fontSize: 18,
    color: '#333333'
  }
})