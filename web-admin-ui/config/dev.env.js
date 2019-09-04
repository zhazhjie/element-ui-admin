'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/dwb"',
  BASE_URL: '"http://127.0.0.1:8181"',
  REMOTE_URL: '"http://127.0.0.1:8889"',
  XXL_JOB : '"http://192.168.100.191:8084/xxl-job-admin-1"',
  OSS_URL : '"http://images.tigoyun.com"',
  H5_URL: '"http://app2.dd3c.cn"'
})
