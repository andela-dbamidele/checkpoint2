import express from 'express';
import authenticateUser from './middlewares/authenticateUsers';

const User = require('../models').User;
const Document = require('../models').Document;

const router = express.Router();

router.get('/users', authenticateUser, (req, res) => {
  if (req.query.q === undefined) {
    return res.status(400).send({
      status: 400,
      message: 'Query must be present in your request'
    });
  }
  const queryString = (req.query.q).toString();
  let limit = req.query.limit;
  let offset = req.query.offset;

  // const pageNumber = Math.ceil(((req.query.offset) /
  //   (req.query.limit)) + 1) || 1;

  // returns error if the limit and offset is not a number
  if ((limit && offset) &&
    (isNaN(limit) || isNaN(offset))) {
    return res.status(400).send({
      message: 'Search param must be a number'
    });
  }

  limit = limit || 16;
  offset = offset || 0;
  User.findAll({
    offset,
    limit,
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
    return res.send({
      pageNumber: 1,
      pageCount: 0,
      pageSize: 0,
      totalCount: 0,
      documents: [],
      message: 'Search query is undefined'
    });
  }
  let limit = parseInt(req.query.limit, 10);
  let offset = parseInt(req.query.offset, 10);
  let access = parseInt(req.query.access, 10);

  const userRoleId = req.authenticatedUser.roleId;
  const userId = req.authenticatedUser.id;

  const queryString = (req.query.q).toString();

  const pageNumber = Math.ceil(((offset) /
    (limit)) + 1) || 1;

  // returns error if the limit and offset is not a number
  if ((limit && offset) &&
    (isNaN(limit) || isNaN(offset))) {
    return res.status(400).send({
      message: 'Limit and offset must be an integer'
    });
  }

  limit = limit || 16;
  offset = offset || 0;

  // returns error if access is not a number
  if (access &&
    (isNaN(parseInt(access, 10)))) {
    return res.status(400).send({
      message: 'Document access type must be an integer'
    });
  }

  let buildQuery = {
    title: {
      $iLike: `%${queryString}%`
    },
    access: 0
  };

  access = parseInt(access, 10);

  if (access === 1) {
    buildQuery = {
      title: {
        $iLike: `%${queryString}%`
      },
      access: 1,
      userId
    };
  } else if (access === 2) {
    buildQuery = {
      title: {
        $iLike: `%${queryString}%`
      },
      access: 2,
      roleId: userRoleId
    };
  } else if (access > 2) {
    return res.status(400).send({
      status: 400,
      message: 'Document access type is invalid'
    });
  }

  Document.findAndCountAll({
    offset,
    limit,
    attributes: { exclude: ['updatedAt'] },
    where: buildQuery,
    order: [['createdAt', 'DESC']]
  })
  .then((docs) => {
    if (docs.length === 0) {
      return res.send({
        pageNumber: 1,
        pageCount: 0,
        pageSize: 0,
        totalCount: 0,
        documents: []
      });
    }

    const pageCount = Math.ceil(docs.count / limit);
    const pageSize = limit;
    const totalCount = docs.count;
    return res.status(200).send({
      pageNumber,
      pageCount,
      pageSize,
      totalCount,
      documents: docs.rows,
    });
  })
  .catch(error => res.status(400).send(error));
});

export default router;
