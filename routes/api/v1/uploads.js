// import dependencies
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const crypto = require('crypto')
const path = require('path')
const isEmpty = require('lodash.isempty')

// import config keys
const { mongoURI } = require('../../../config/keys')

// create connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true })

// init gfs
let gfs

// init stream
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

// create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})
const upload = multer({ storage })

// instantiate a new Router class
const router = express.Router()

// @route:  GET api/v1/uploads/
// @desc:   Return all files
router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // no files found
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'no files found'
            })
        }

        // files found
        return res.json(files)
    })
})

// @route:  POST api/v1/uploads/
// @desc:   Upload new file
// @note:   'file' corresponds to matching form-data key from request
router.post('/', upload.single('file'), (req, res) => res.json({ file: req.file }))

// @route:  GET api/v1/uploads/file/:filename
// @desc:   Return a file
router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // no file found
        if (!file) {
            return res.status(404).json({
                err: 'no file found'
            })
        }

        // file found
        return res.json(file)
    })
})

// @route:  DELETE api/v1/uploads/file/:id
// @desc:   Delete a file
router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err) => {
        if (err) {
            return res.status(404).json({ err })
        }
        return res.status(200).json({ message: 'successfully deleted file' })
    })
})

// @route:  GET api/v1/uploads/image/:filename
// @desc:   Display an image file
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // no file found
        if (!file) {
            return res.status(404).json({
                err: 'no file found'
            })
        }

        // confirm file type
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        } else {
            res.status(404).json({
                err: 'file not an image'
            })
        }
    })
})

// export router
module.exports = router
