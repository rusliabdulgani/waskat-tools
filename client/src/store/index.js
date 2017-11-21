import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Reducer as routerReducer } from 'react-native-router-flux'

import rootReducers from '../reducers'

const store = createStore(rootReducers, applyMiddleware(thunk))

export default store