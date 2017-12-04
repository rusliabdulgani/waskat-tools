import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import FitImage from 'react-native-fit-image'

import {allLogo} from '../../assets'

export default class CardBarang extends React.PureComponent {
    render () {
      const { 
      id,
      judul,
      jenis_barang,
      berat_barang,
      pinjaman,
      foto,
      } = this.props.data

      return (
  
        <View style={styles.cards}>
          {
            <View style={styles.imageContainer}>
              <FitImage style={styles.cardImage} source={{ uri: foto }} />
            </View>
          }
          <View style={styles.cardContent}>
            <View style={styles.titleContainer}>
              <View><Text style={styles.titleKeluhan}>{judul}</Text>
                <Text style={styles.dateKeluhan}>{jenis_barang}</Text>
              </View>
            </View>
            <View style={styles.keluhanPreviewContainer}>
                <Text style={styles.keluhanPreview}>Rp. {(pinjaman).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
            </View>
          </View>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    icon: {
      width: 23,
      height: 23
    },
    iconInvalidContainer: {
  
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
      height: 140,
      paddingRight: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 5,
      backgroundColor: '#416F14',
      elevation: 1,
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
      paddingTop: 10
    },
    titleKeluhan: {
      fontFamily: 'BrandonText-Light',
      fontSize: 18,
      color: 'white'
    },
    dateKeluhan: {
      fontFamily: 'BrandonText-Light',
      fontSize: 15,
      color: 'white',
      lineHeight: 18,
      paddingTop: 5,
      marginBottom: 10
    },
    keluhanPreview: {
      fontFamily: 'BrandonText-Light',
      fontSize: 16,
      paddingTop: 10,
      lineHeight: 21,
      color: 'white'
    }
  })