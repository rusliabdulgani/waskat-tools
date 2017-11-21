const fetchBarangState = {
  barangList: []
}

const isLoadingState = {
  isLoading: false
}

export const barangReducer = (state = fetchBarangState, action) => {
  switch (action.type) {
    case 'GET_DATA_BARANG':
      return {
        ...state,
        barangList: action.payload.dataBarang
    }
    default: 
      return state
  }
}

export const isLoading = (state = isLoadingState, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload.loading
    }
    default: 
      return state
  }
}