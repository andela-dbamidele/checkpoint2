import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import config from './config/config';
import validateInput from '../shared/validators/usersData';
import { isDigit } from '../../server/shared/helpers';
import authenticateUser from './middlewares/authenticateUsers';

const User = require('../models').User;
const Document = require('../models').Document;

const router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }
  const password = bcrypt.hashSync(req.body.password);
  User.findOne({
    where: {
      $or: [{ username: req.body.username },
      { email: req.body.email }]
    }
  }).then((user) => {
    if (user) {
      return res.status(400).send({
        message: 'Username and email must be unique'
      });
    }
    User.create({
      username: req.body.username,
      fullname: req.body.fullname,
      password,
      email: req.body.email,
      roleId: req.body.roleId
    })
    .then((savedUser) => {
      const token = jwt.sign({
        id: savedUser.id,
        username: savedUser.username,
        fullname: savedUser.fullname,
        roleId: savedUser.roleId
      }, config.jwtSecret);
      res.status(201).send({ savedUser, token });
    })
    .catch(error => res.status(400).send(error));
  });
});

router.get('/', authenticateUser, (req, res) => {
  let queryParams;
  const userId = req.authenticatedUser.id;
  if (req.query.limit !== undefined && req.query.offset !== undefined) {
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    if (isNaN(limit) || isNaN(offset)) {
      return res.status(400).send({
        message: 'Search param must be a number'
      });
    }
    queryParams = {
      offset,
      limit,
      where: {
        id: {
          $ne: userId,
        }
      }
    };
  } else {
    queryParams = {};
  }
  User.findAndCountAll(queryParams)
  .then((user) => {
    // returns error if no user is found
    // very unlikely bcos there's always a default user
    if (user.length === 0) {
      return res.status(200)
        .send([
          {
            message: 'No Users found!'
          }
        ]);
    }
    return res.status(200).send(user);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/:id', authenticateUser, (req, res) => {
  if (!isDigit(req.params.id)) {
    return res.status(400).send({
      message: 'Input must be digit'
    });
  }
  User.findById(req.params.id, {
    include: [{
      model: Document,
      as: 'documents'
    }]
  })
  .then((user) => {
    if (!user) {
      return res.status(400)
        .send({
          message: 'User not found'
        });
    }
    return res.status(200).send(user);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/:id/documents', authenticateUser, (req, res) => {
  if (!isDigit(parseInt(req.params.id, 10))) {
    return res.status(400).send({
      message: 'Input must be digit'
    });
  }
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(400)
        .send({
          message: 'User not found'
        });
    }
    Document.findAll({
      where: {
        userId: req.params.id,
        access: 0
      }
    })
    .then((doc) => {
      if (doc.length === 0) {
        return res.status(200).send({
          message: 'No Document for this user yet'
        });
      }
      return res.status(200).send(doc);
    })
    .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
});

router.put('/:id', authenticateUser, (req, res) => {
  const userId = req.authenticatedUser.id;
  const roleId = req.authenticatedUser.roleId;
  if (req.params.id !== userId && roleId !== 1) {
    return res.status(400).send({
      message: 'You do not have enough permission to perform this action'
    });
  }
  if (!isDigit(parseInt(req.params.id, 10))) {
    return res.status(400).send({
      message: 'Input must be digit'
    });
  }
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(400)
        .send({
          message: 'User not found'
        });
    }
    let password;
    if (req.body.password !== undefined) {
      password = bcrypt.hashSync(req.body.password, 10);
    }
    return user.update({
      username: req.body.username || user.username,
      fullname: req.body.fullname || user.fullname,
      password: password || user.password,
      email: req.body.email || user.email,
      roleId: req.body.roleId || user.roleId
    })
    .then(() => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
});

router.delete('/:id/', authenticateUser, (req, res) => {
  if (isNaN(parseInt(req.params.id, 10))) {
    return res.status(400).send({
      message: 'Input must be digit'
    });
  }
  const userDetails = req.authenticatedUser;
  const userId = userDetails.id;
  const roleId = userDetails.roleId;
  if (userId !== req.params.id && roleId !== 1) {
    return res.status(401).send({
      message: 'Ops! An error occured while processing your request'
    });
  }
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(400)
        .send({
          message: 'User not found'
        });
    }
    return user.destroy()
      .then(() => res.status(200).json({
        message: 'User deleted successfully'
      }))
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
});

export default router;
