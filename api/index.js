const app = require('./App');

module.exports = (req, res) => {
  return app(req, res);
};
