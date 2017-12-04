import { combineReducers } from 'redux'

//IMPORT FILE
import {barangReducer, isLoading } from './barangReducers'

const rootReducers = combineReducers({
  barang: barangReducer,
  loading: isLoading
})

export default rootReducers