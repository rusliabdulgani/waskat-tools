export const loginAction = (data) => {
  return {
    type: 'USER_LOGIN_ACTION',
    payload: {
      datalogin: data
    }
  }
}