const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  var token = req.header('X-auth');

  jwt.verify(token, 'abc123', function(err, decoded) {
  if(err) {
    res.status(401).send();
  }
  else {
    req.decode = decoded;
    next();
  }
});

    
};

module.exports = {authenticate};
