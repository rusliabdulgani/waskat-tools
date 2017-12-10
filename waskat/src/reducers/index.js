import { combineReducers } from 'redux'

//IMPORT FILE
import {barangReducer, isLoading } from './barangReducers'
import {KreditReducers} from './kreditReducers'

const rootReducers = combineReducers({
  barang: barangReducer,
  loading: isLoading,
  kredit: KreditReducers
})

export default rootReducers