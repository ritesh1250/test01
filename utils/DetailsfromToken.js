const jwt = require('jsonwebtoken');
jwtkey = ')@345167';

const AuthorizationData = function (authRes) {
  this.id = authRes.Society;
  this.role = authRes.role;
};

AuthorizationData.DetailsfromToken = async (token, result) => {
  await jwt.verify(token, jwtkey, (err, authData) => {
    if (err) {
      result(null, err);
    } else {
      result(null, authData);
    }
  });
};

module.exports = AuthorizationData;
