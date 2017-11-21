import React, { Component } from 'react'
import { StyleSheet, Modal, Text, View, Image, TouchableOpacity, Dimensions, BackHandler, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'

//IMPORT FILE
import CardBarang from './cardBarang'
import { headerGetDataBarang } from '../../helper'
import { fetchDataBarangThunk } from '../../thunk/getDataBarangThunk'

class ListBarang extends Component {
  constructor (props) {
    super (props)
    this.state = {
      baranglist: [],
      showModal: false
    }
  }
}

render () {
  return (
    <View style={styles.container}>
      
    </View>
  )
}

const mapStateToProps = (state) => ({
  getDataBarang: state.
})

const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center'
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
    color: '#01C6B2',
    ...Platform.select({
      ios: {
        // marginTop: 20,
      },
      android: {
        // marginTop: 15,
      }
    }),
    fontFamily: 'BrandonText-Black'
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