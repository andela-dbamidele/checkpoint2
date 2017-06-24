import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config/config';
import validateLogin from '../shared/validators/login';

const User = require('../models').User;

const router = express.Router();

router.post('/login', (req, res) => {
  // validates request body
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }
  // checks the database for the user's username or email
  User.findOne({
    where: {
      $or: [{ username: req.body.identifier },
      { email: req.body.identifier }]
    }
  }).then((user) => {
    if (!user) {
      return res.status(400).send({
        status: 400
      });
    }
    // validates the user's password if user is found
    if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
      const token = jwt.sign({
        id: user.dataValues.id,
        username: user.dataValues.username,
      }, config.jwtSecret);
      // returns token after successfull verification
      res.status(200).send({
        status: 200,
        message: 'Authentication successful!',
        token
      });
    } else {
      // returns error on invalid login
      res.status(400).send({
        status: 400,
        message: 'Invalid credentials'
      });
    }
  })
  .catch(error => res.status(400).send(error));
});

router.post('/logout');

export default router;
