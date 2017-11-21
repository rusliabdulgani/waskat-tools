const storage = require('@google-cloud/storage')
const generateId = require('../helper/idGen').generateId

const gcs = storage({
  projectId: 'waskat-186410',
  keyFilename: ''
})

const bucketName = 'waskat-bucket'
const bucket = gcs.bucket(bucketName)

function getPublicUrl (filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename
}

let imgUpload = {}
var sizeOf = require('image-size')



module.exports = uploadSingle = (req, res, next) => {
  if (!req.file) {
    res.status(500).json({
      status: false,
      message: 'An error has occured, please try again',
      result: ''
    })
  } else {
    const gcsname = generateId()
    req.filePhoto = getPublicUrl(gcsname)

    const file = bucket.file(gcsname)
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    stream.on('error', (err) => {
      req.file.cloudStorageError = err
      res.status(500).json({
        status: false,
        message: 'An error has occured, please try again',
        result: ''
      })
    })

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
    })

    stream.end(req.file.buffer)

    next()
  }
}


