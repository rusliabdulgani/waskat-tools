import { AsyncStorage } from 'react-native'
import axios from 'axios'

import { GetDataBarangAction, IsLoading } from '../actions'
import { headerGetDataBarang } from '../helper'
import { URL_DATA_BARANG } from '../api'

export const fetchDataBarangThunk = () => dispatch => {
  AsyncStorage.getItem('headers')
  .then((keyValue) => {
    console.log('data headers: ', keyValue)
    const headers = JSON.parse(keyValue)
    dispatch(IsLoading(true))
    axios(headerGetDataBarang(URL_DATA_BARANG, headers))
    .then(resultAxios => {
      dispatch(IsLoading(false))
      console.log('hasil axios get data barang all', resultAxios)
      dispatch(GetDataBarangAction(resultAxios.data.result.data))
    catch(err => {
      console.log('error fetch data barang: ', err)
    })
    })
  })
  .catch(err => {
    console.log('gagal get headers',err)
  })
}



