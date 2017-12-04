export const GetDataBarangAction = (data) => {
    return {
      type: 'GET_DATA_BARANG',
      payload: {
        dataBarang: data
      }
    }
  }

export const IsLoading = (bool) => {
  return {
    type: 'IS_LOADING',
    payload: {
      loading: bool
    }
  }
}
  