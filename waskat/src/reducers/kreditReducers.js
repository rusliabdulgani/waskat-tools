const init = {
    postKredit: {
        images: [],
        imageUri: []
    }
}

export const KreditReducers = (state = init.postKredit, action) => {
    switch (action.type) {
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                images: action.payload.image,
                imageUri: action.payload.imageUri
            }
        default: {
            return state
          }
    }
}