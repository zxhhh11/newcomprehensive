const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/securityapi', {
      // SITEnv
      target: '/'
      // 153 Env
      // target: 'http://dbs2019db.reg4.com:1000/'
      // target: process.env.REACT_APP_PUBLIC_URL
      // target: ''
    })
  );
};
