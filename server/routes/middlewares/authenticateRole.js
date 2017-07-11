import jwt from 'jsonwebtoken';
import config from '../config/config';

const User = require('../../models').User;

// checks for authorization header in request
// and sends the user to the next route if he is the admin or throws error
export default (req, res, next) => {
  const authToken = req.headers.authorization;
  let token;
  if (authToken) {
    token = authToken.split(' ')[1];
  }
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: 'Authorization failed'
        });
      } else {
        const userId = decoded.id;
        User.findById(userId)
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'User not found'
            });
          }
          const userData = user.dataValues;
          if (userData.roleId !== 1) {
            return res.status(401).send({
              message: 'Authorization Failed'
            });
          }
          next();
        });
      }
    });
  } else {
    res.status(403).json({
      message: 'No token provided'
    });
  }
};
