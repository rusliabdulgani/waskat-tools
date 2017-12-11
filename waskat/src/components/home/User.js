import React, { Component } from 'react'
import { ActivityIndicator, View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Dimensions, Alert, FlatList, Modal, AsyncStorage, BackHandler} from 'react-native'
import {Actions} from 'react-native-router-flux'
import FitImage from 'react-native-fit-image'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import axios from 'axios'

import { allLogo } from '../../assets'
import CardBarang from './cardBarang'
import { headerGetDataBarang, headerAddUser } from '../../helper/header'
import {URL_GET_DATA_USER, URL_ADD_USER} from '../../api'
let {width, height} = Dimensions.get('window')

export default class User extends Component {
  constructor (props) {
    super (props)
    this.state = {
        dataUser: [],
        header: {},
        animate: false
    }
    this._getAllUser = this._getAllUser.bind(this)
  }

  componentDidMount () {
    this._getAllUser()
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid())
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid())
  }


  shouldComponentUpdate(nextState) {
    const dataUserUpdate = this.state.dataUser !== nextState.dataUser
    return dataUserUpdate
  }

  backAndroid () {
    Actions.Home({type: 'replace', storage: this.state.header})
    return true
  }

  _addUserPage () {
      Actions.AddUser({style: 'replace'})
  }

  _confirmation () {
    this.setState(previousState => { return {showModal: false} }, this.props.clearContent())
    Actions.Home({type: 'replace'})
  }

  _getAllUser () {
      this.setState({
          animate: true
      })
      AsyncStorage.getItem('headers')
      .then(result => {
          this.setState({
              header: JSON.parse(result)
            })
            console.log('header',result)
      })
      .then( () => {
        axios(headerGetDataBarang(URL_GET_DATA_USER,this.state.header))
        .then(resultAxios => {
            this.setState({
                animate: false
            })
            console.log('data user', resultAxios)
          this.setState({
              dataUser: resultAxios.data
          })
        })
        .catch(err => {
            this.setState({
                animate: false
            })
            console.log('errornya', err)
        })
      })
  }

  _renderItem({item}) {
      return (
        <CardBarang 
        data={item}
        id={item._id}
        menu={'user'}
        getUser={this._getAllUser}/>
      )
  }

  render () {
    return (
        <View style={styles.container}>
         {/* header area */}
         <View style={styles.header}>
         <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => this.backAndroid()}>
            <Image source={allLogo.backSymbol} style={{width: 40, height: 40, marginLeft: 10}} />
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>User</Text>
          <View style={styles.headerRight} />
        </View>
        {
            this.state.animate ?
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator  size='large' color='#0D6129' />
        </View>
        : 
        <FlatList 
        style={{marginBottom: 60}}
        data={this.state.dataUser}
        keyExtractor={(item, idx)=> item}
        renderItem={this._renderItem}/>
        }
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this._addUserPage()}>
            <Text style={styles.textButton}>Tambah User</Text>
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
    textButton: {
        fontSize: 20,
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
        alignItems: 'center',
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