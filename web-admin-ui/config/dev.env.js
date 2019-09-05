'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/"',
  BASE_URL: '"http://127.0.0.1:8181"',
  REMOTE_URL: '"http://127.0.0.1:8800"',
})
