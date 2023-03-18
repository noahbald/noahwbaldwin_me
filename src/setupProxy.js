const { createProxyMiddleware } = require('http-proxy-middleware')
const https = require('https')
const curlify = require('request-as-curl')

const agent = new https.Agent({
  rejectUnauthorized: false,
})

module.exports = function (app) {
  app.use('/media', createProxyMiddleware({
    target: 'https://storage.googleapis.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/media': process.env.REACT_APP_BUCKET,
    },
  }))
  app.use('/api/projects', createProxyMiddleware({
    target: process.env.REACT_APP_JSON_BIN_PROJECTS,
    changeOrigin: true,
    headers: {
      'X-Access-Key': process.env.REACT_APP_JSON_BIN_KEY,
      'Content-Type': 'application/json',
      Host: 'api.jsonbin.io',
    },
    pathRewrite: {
      '^/api/projects': '',
    },
    agent,
  }))
  app.use('/api/resume', createProxyMiddleware({
    target: process.env.REACT_APP_JSON_BIN_RESUME,
    changeOrigin: true,
    headers: {
      'X-Access-Key': process.env.REACT_APP_JSON_BIN_KEY,
      'Content-Type': 'application/json',
      Host: 'api.jsonbin.io',
    },
    pathRewrite: {
      '^/api/resume': '',
    },
    agent,
  }))
}
