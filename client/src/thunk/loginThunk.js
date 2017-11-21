import axios from 'axios'

//IMPORT ACTIONS
import { loginAction } from '../actions'
import { URL_LOGIN } from '../api'

export const loginThunk = (input, callback) => {
  return dispatch => {
    axios.post(URL_LOGIN, {
      username: input.username,
      password: input.password
    })
    .then(response => {
      dispatch(loginAction(response))
      callback(response)
    })
    .catch(err => {
      if (err.response) {
        callback(err.response)
      }
    })
  }
}