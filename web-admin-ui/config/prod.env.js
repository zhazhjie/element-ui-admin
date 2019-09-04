'use strict'
let arg = process.argv[2];
let env = {
  NODE_ENV: '"production"',
  API_ROOT: '"/dwb"',
  XXL_JOB : '"http://admin.dd3c.cn/xxl-job-admin"',
  MCH_MALL : '"http://mall.dd3c.cn/#"',
  OSS_URL : '"http://images.tigoyun.com"',
  REMOTE_URL: '"http://admin.dd3c.cn"',
  H5_URL: '"http://dddj.dd3c.cn"'
};
if (arg == 'test') {
  env = {
  NODE_ENV: '"test"',
  API_ROOT: '"/dwb"',
  XXL_JOB : '"http://business.dd3c.cn/xxl-job-admin"',
  MCH_MALL : '"http://mall.dd3c.cn/#"',
  OSS_URL : '"http://images.tigoyun.com"',
  REMOTE_URL: '"http://business.dd3c.cn"',
  };
}
module.exports = env;

