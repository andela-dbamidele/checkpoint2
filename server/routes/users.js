import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import config from './config/config';
import dataValidators from '../utils/dataValidators';
import { isDigit } from '../../server/utils/helpers';
import authenticateUser from './middlewares/authenticateUsers';

const User = require('../models').User;
const Document = require('../models').Document;

const router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = dataValidators.validateInput(req.body);
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
      res.status(201).send({
        status: 201,
        message: 'Registration Successful',
        token
      });
    })
    .catch(error => res.status(400).send({
      status: 400,
      message: 'A fatal error was encountered, Please try again.',
      error
    }));
  });
});

router.get('/', authenticateUser, (req, res) => {
  const userId = req.authenticatedUser.id;

  let limit = req.query.limit;
  let offset = req.query.offset;

  const pageNumber = Math.ceil(((req.query.offset) /
    (req.query.limit)) + 1) || 1;

  // returns error if the limit and offset is not a number
  if ((limit && offset) &&
    (isNaN(limit) || isNaN(offset))) {
    return res.status(400).send({
      message: 'Search param must be a number'
    });
  }

  limit = limit || 10;
  offset = offset || 0;

  const queryParams = {
    offset,
    limit,
    attributes: { exclude: ['updatedAt', 'password', 'createdAt'] },
    where: {
      id: {
        $ne: userId,
      }
    }
  };

  User.findAndCountAll(queryParams)
  .then((users) => {
    // returns error if no user is found
    // very unlikely bcos there's always a default user
    if (users.length === 0) {
      return res.status(404)
        .send({
          status: 404,
          message: 'No Users found!'
        });
    }

    const pageCount = Math.ceil(users.count / limit);
    const pageSize = limit;
    const totalCount = users.count;

    return res.status(200).send({
      pageNumber,
      pageCount,
      pageSize,
      totalCount,
      users: users.rows,
    });
  })
  .catch(error => res.status(400).send({
    status: 400,
    message: 'A fatal error was encountered, Please try again.',
    error
  }));
});

router.get('/:id', authenticateUser, (req, res) => {
  if (!isDigit(req.params.id)) {
    return res.status(400).send({
      message: 'Input must be digit'
    });
  }
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(404)
        .send({
          status: 404,
          message: 'User not found'
        });
    }
    return res.status(200).send({
      status: 200,
      user
    });
  })
  .catch(error => res.status(400).send({
    status: 400,
    message: 'A fatal error was encountered, Please try again.',
    error
  }));
});

router.get('/:id/documents', authenticateUser, (req, res) => {
  if (!isDigit(parseInt(req.params.id, 10))) {
    return res.status(400).send({
      status: 400,
      message: 'Input must be digit'
    });
  }

  let limit = req.query.limit;
  let offset = req.query.offset;

  const pageNumber = Math.ceil(((req.query.offset) /
    (req.query.limit)) + 1) || 1;

  // returns error if the limit and offset is not a number
  if ((limit && offset) &&
    (isNaN(limit) || isNaN(offset))) {
    return res.status(400).send({
      message: 'Limit and offset must be an integer'
    });
  }

  limit = limit || 16;
  offset = offset || 0;
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(400)
        .send({
          message: 'User not found'
        });
    }
    Document.findAll({
      limit,
      offset,
      where: {
        userId: req.params.id,
        access: 0
      }
    })
    .then((doc) => {
      if (doc.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'No Document for this user yet'
        });
      }
      const pageCount = Math.ceil(doc.count / limit);
      const pageSize = limit;
      const totalCount = doc.count;
      return res.status(200).send({
        pageNumber,
        pageCount,
        pageSize,
        totalCount,
        documents: doc.rows,
      });
    })
    .catch(error => res.status(400).send({
      status: 400,
      message: 'A fatal error was encountered, Please try again.',
      error
    }));
  })
  .catch(error => res.status(400).send({
    status: 400,
    message: 'A fatal error was encountered, Please try again.',
    error
  }));
});

router.put('/:id', authenticateUser, (req, res) => {
  const userId = req.authenticatedUser.id;
  const roleId = req.authenticatedUser.roleId;
  if (req.params.id !== userId && roleId !== 1) {
    return res.status(400).send({
      status: 400,
      message: 'You do not have enough permission to perform this action'
    });
  }
  if (!isDigit(parseInt(req.params.id, 10))) {
    return res.status(400).send({
      status: 400,
      message: 'Input must be digit'
    });
  }
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(400)
        .send({
          status: 400,
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
    .then(() => {
      const token = jwt.sign({
        id: user.dataValues.id,
        username: user.username,
        fullname: user.fullname,
        roleId: user.roleId
      }, config.jwtSecret);
      res.status(200).send({
        status: 200,
        message: 'Update successful',
        token
      });
    })
    .catch(error => res.status(400).send({
      status: 400,
      message: 'A fatal error was encountered, Please try again.',
      error
    }));
  })
  .catch(error => res.status(400).send({
    status: 400,
    message: 'A fatal error was encountered, Please try again.',
    error
  }));
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
      message: 'You are not authorize to perform this action'
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
      .catch(error => res.status(400).send({
        status: 400,
        message: 'A fatal error was encountered, Please try again.',
        error
      }));
  })
  .catch(error => res.status(400).send({
    status: 400,
    message: 'A fatal error was encountered, Please try again.',
    error
  }));
});

export default router;
