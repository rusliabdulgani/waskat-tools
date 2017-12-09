import {FotoKreditAction} from '../actions'


export const FotoKreditThunk = (linkUpload, imageUri) => {
    return dispatch => {
      dispatch(FotoKreditAction(linkUpload, imageUri))
    }
  }