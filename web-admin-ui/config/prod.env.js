'use strict'
let arg = process.argv[2];
let env = {
  NODE_ENV: '"production"',
  API_ROOT: '"/"',
};
if (arg === 'test') {
  env = {
  NODE_ENV: '"test"',
  API_ROOT: '"/"',
  REMOTE_URL: '"http://business.dd3c.cn"',
  };
}
module.exports = env;

