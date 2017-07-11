import express from 'express';
import authenticateUser from './middlewares/authenticateUsers';

const User = require('../models').User;
const Document = require('../models').Document;

const router = express.Router();

router.get('/users', authenticateUser, (req, res) => {
  if (req.query.q === undefined) {
    return res.send([]);
  }
  const queryString = (req.query.q).toString(); // do something here
  User.findAll({
    where: {
      $or: [{ username: {
        $iLike: `%${queryString}%`
      }
      },
      { fullname: {
        $iLike: `%${queryString}%`
      }
      }]
    }
  })
  .then((users) => {
    if (users.length === 0) {
      return res.status(200).send([]);
    }
    return res.status(200).send(users);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/documents', authenticateUser, (req, res) => {
  if (req.query.q === undefined) {
    return res.send([]);
  }
  const userRoleId = req.authenticatedUser.roleId;
  const userId = req.authenticatedUser.id;
  Document.findAll({
    where: {
      $and: {
        title: {
          $iLike: `%${req.query.q}%`
        },
        $or: [
          {
            access: 0,
          },
          {
            access: 1,
            userId
          },
          {
            access: 2,
            roleId: userRoleId
          }
        ]
      }
    },
    order: [['createdAt', 'DESC']]
  })
  .then((docs) => {
    if (docs.length === 0) {
      return res.send([]);
    }
    return res.status(200).send(docs);
  })
  .catch(error => res.status(400).send(error));
});

export default router;
