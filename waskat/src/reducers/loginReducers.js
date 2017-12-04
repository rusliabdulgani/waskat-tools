const loginReducers = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_ACTION': {
      return Object.assign({}, action.payload.datalogin)
    }
    default: {
      return state
    }
  }
}

export default loginReducers