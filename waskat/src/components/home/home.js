import React, { Component } from 'react'
import { View, Alert, Text, BackHandler, StyleSheet, AsyncStorage, Platform, TouchableOpacity, Dimensions, Image } from 'react-native'
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
        visibleModal: null,
        headers: this.props.storage
      }
  }
  
  componentDidMount () {
    AsyncStorage.getItem('headers')
    .then(result => {
      this.setState({
        headers: JSON.parse(result)
      })
    })
    BackHandler.addEventListener('hardwareBackPress', () => this._backAndroid())
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this._backAndroid())
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

  _signOut () {
    AsyncStorage.clear()
    Actions.Login({type: 'replace'})
  }

  
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => this._backAndroid())
  }

  _changeSceneAddBarang () {
    Actions.AddBarang({type: 'replace'})
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

  _menu (pilihan) {
    if (pilihan === 'User') {
      Actions.User({type: 'replace'})
    } else if (pilihan === 'Customer') {
      Actions.Customer({type: 'replace'})
    } else if (pilihan === 'Kredit') {
      Actions.Kredit({type: 'replace'})
    }
  }

  render () {
    console.log(this.props.storage)
    let { reports, visibleModal, headers } = this.state
    console.log('headers', headers)
    return (
      <View style={styles.container}>
        {/* header area */}
        <Modal isVisible={this.state.visibleModal === 'dialog_logout'} backdropOpacity={0.4} animationIn={'fadeIn'} animationOut={'fadeOut'} backdropColor={'black'}>
           <View style={styles.viewDialogJenisLayanan}>
             <View style={styles.cardDialogRadius}>
                <Text style={styles.textConfirm}>Apakah Anda yakin sign out {'\n'}dari aplikasi ?</Text>
                <View style={styles.lineDialog} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.viewTidak} onPress={() => this.setState({ visibleModal: null })}>
                    <Text style={styles.textYa}> TIDAK </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewYa} onPress={() => this._signOut()}>
                    <Text style={styles.textTidak}> YA </Text>
                  </TouchableOpacity>
                </View>
             </View>
           </View>
         </Modal>

        <View style={styles.headerHistory}> 
          <Text style={styles.title}>Home</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={{flex: 1}}>
        {
          headers.role === 'admin' && 
        <TouchableOpacity style={styles.cards} onPress={() => this._menu('User')}>
          <Text style={styles.textYa}>User</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity style={styles.cards} onPress={() => this._menu('Customer')}>
          <Text style={styles.textYa}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cards} onPress={() => this._menu('Kredit')}>
          <Text style={styles.textYa}>Kredit</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => this.setState({visibleModal: 'dialog_logout'})}>
        <Text style={styles.textLogout}>Sign Out</Text>
        </TouchableOpacity>

         
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewDialogJenisLayanan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutButton: {
    width: width,
    height: height * 0.08,
    backgroundColor: '#0D6129',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textLogout: {
    color: 'white',
    fontSize: 20
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
    fontSize: 20,
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
    marginTop: (10 / 100 * height + 24),
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
    marginTop: (10 / 100 * height + 24),
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
  },
  cards: {
    height:height * 0.1,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 5,
      width: 3
    },
    shadowColor: '#eeeeee',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})