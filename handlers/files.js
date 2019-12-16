const randomstring = require('randomstring')
const fs = require('fs')


const UploadFile = (req, res) => {
 var file = req.files.file;   //file nie poleto sto go isprakame
 console.log(file)
 if (file.size > 10 * 1024 * 1024) {
  return res.status(500).send('File too big')
 }
 var allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/pjpeg', 'image/gif']
 if (allowedTypes.indexOf(file.mimetype) == -1) {
  return res.status(500).send('File type not on the the list')
 }
 var prefix = randomstring.generate({
  length: 10,
  charset: 'alphanumeric'
 })

 file.mv(`./uploads/${prefix}_${file.name}`, err => {   //mv e skratenica od move
  if (err) {
   return res.status(500).send('Internal Server Error')
  }
  res.status(200).send({
   filename: `${prefix}_${file.name}`
  })

 })
}

const DownloadFile = (req, res) => {
 let filepath = `./uploads/${req.params.filename}`
 if (fs.existsSync(filepath)) {
  res.sendFile(filepath)
 } else {
  res.status(404).send('Not found ')
 }
}

module.exports = {
 UploadFile,
 DownloadFile
}