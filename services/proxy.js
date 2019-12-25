const express = require('express')
const proxy = require('http-proxy')

var api = express()
var apiProxy = proxy.createProxyServer()
api.all('/api/v1/auth/*', (req, res) => {
 apiProxy.web(req, res, { target: 'http://localhost:8001' })


})
api.all('/api/v1/files/*', (req, res) => {
 apiProxy.web(req, res, { target: 'http://localhost:8002' })


})
api.all('/api/v1/filmovi/*', (req, res) => {
 apiProxy.web(req, res, { target: 'http://localhost:8080' })


})
api.all('/', reg, res => {
 res.status(404).send('Not found')
})

api.listen(process.env.PORT, err => {
 if (err) {
  console.log('couldn start server')
  console.log('err')
  return
 }
 console.log('server starter ')
})