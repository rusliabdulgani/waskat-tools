const storage = require('@google-cloud/storage')
const generateId = require('../helper/idGen').generateId

const gcs = storage({
  projectId: 'waskat-tools',
  keyFilename: './waskat-tools-8cfcb8792f1d.json'
})

const bucketName = 'asia.artifacts.waskat-tools.appspot.com'
const bucket = gcs.bucket(bucketName)

function getPublicUrl (filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename
}

let imgUpload = {}



imgUpload.uploadSingle = (req, res, next) => {
  if (!req.file) {
    res.status(500).json({
      status: false,
      message: 'An error has occured, please try again',
      result: ''
    })
  } else {
    const gcsname = req.file.originalname
    req.filePhoto = getPublicUrl(gcsname)

    const file = bucket.file(gcsname)
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
    })

    stream.end(req.file.buffer)

    next()
  }
}

module.exports = imgUpload


