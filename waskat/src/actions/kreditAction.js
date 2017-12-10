export const FotoKreditAction = (linkUpload, imageUri) => {
    return {
      type: 'UPLOAD_IMAGE',
      payload: {
        image: linkUpload, 
        imageUri: imageUri
        }
    }
  }