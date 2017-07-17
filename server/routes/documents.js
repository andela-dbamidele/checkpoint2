import express from 'express';
import validateDocumentData from '../shared/validators/documentPostData';
import { isDigit, validateAccess } from '../../server/shared/helpers';
import authenticateUser from './middlewares/authenticateUsers';

const Document = require('../models').Document;
// const User = require('../models').User;
// const Sequelize = require('../models').Sequelize;

const router = express.Router();

// handles post request to the document api
// creates a new document and returns the document
router.post('/', authenticateUser, (req, res) => {
  // validates the request body
  const { errors, isValid } = validateDocumentData(req.body);
  if (!isValid) {
    // returns error on invalid request
    return res.status(400).send({
      status: 400,
      errors
    });
  }

  const userRoleId = req.authenticatedUser.roleId;
  const userId = req.authenticatedUser.id;

  // check the databse for duplicate title and throw error if there is
  Document.findOne({
    where: {
      title: req.body.title
    }
  })
  .then((doc) => {
    if (doc) {
      return res.status(400).send({
        status: 400,
        message: 'Document with the same title already exist',
      });
    }

    // creates a new document if the document does not exists
    Document.create({
      title: req.body.title,
      author: req.body.author,
      roleId: userRoleId,
      content: req.body.content,
      userId,
      access: req.body.access
    })
    .then(newDoc => res.status(200).send({
      status: 200,
      document: newDoc
    }))
    .catch((error) => {
      res.status(400).send({
        error
      });
    });
  });
});

// handles GET request to the document api
// returns all documents on success
// returns error on error
router.get('/', authenticateUser, (req, res) => {
  const userRoleId = req.authenticatedUser.roleId;
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

  limit = limit || 16;
  offset = offset || 0;


  // prepare a databse query param if query is present in the request
  const queryParams = {
    offset,
    limit,
    attributes: { exclude: ['updatedAt'] },
    where: {
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
    },
    order: [['createdAt', 'DESC']]
  };
  // query the database for documents
  Document.findAndCountAll(queryParams)
  .then((doc) => {
    // reutns error if no document is found
    if (doc.rows.length === 0) {
      return res.status(400).send({
        status: 400,
        message: 'No document found!'
      });
    }

    const pageCount = Math.ceil(doc.count / limit);
    const pageSize = limit;
    const totalCount = doc.count;
    // sends the public document and other documents
    // that the user have access to
    return res.status(200).send({
      pageNumber,
      pageCount,
      pageSize,
      totalCount,
      documents: doc.rows,
    });
  })
  .catch((error) => {
    res.status(400).send({
      status: 400,
      error
    });
  });
});

router.get('/:id', authenticateUser, (req, res) => {
  if (!isDigit(req.params.id)) {
    return res.status(400).send({
      message: 'Input must be digit'
    });
  }
  const userId = req.authenticatedUser.id;
  const userRoleId = req.authenticatedUser.roleId;

  // check the database for the required document
  Document.findById(req.params.id)
  .then((doc) => {
    if (!doc) {
      return res.status(400)
        .send({
          message: 'Document not found'
        });
    }

    // validates the access right of the current user
    const { validatedUser, errorMsg } = validateAccess(
      doc.userId,
      doc.access,
      doc.roleId,
      userId,
      userRoleId
    );

    // returns error if the user does not have access to the document
    if (!validatedUser) {
      return res.status(400).send(errorMsg);
    }

    // returns the document if all is right
    return res.status(200).send(doc);
  })
  .catch(error => res.status(400).send(error));
});

router.put('/:id', authenticateUser, (req, res) => {
  if (!isDigit(req.params.id)) {
    return res.status(400).send({
      message: 'Document id must be digit'
    });
  }
  const userId = req.authenticatedUser.id;
  const userRoleId = req.authenticatedUser.roleId;
  Document.findById(req.params.id)
  .then((doc) => {
    if (!doc) {
      return res.status(400)
        .send({
          message: 'Document not found'
        });
    }
    const { validatedUser, errorMsg } = validateAccess(
      doc.userId,
      doc.access,
      doc.roleId,
      userId,
      userRoleId
    );
    if (!validatedUser) {
      return res.status(400).send(errorMsg);
    }
    Document.findAll({
      where: {
        title: req.body.title
      }
    })
    .then((originalDoc) => {
      if (originalDoc.length !== 0 && (originalDoc[0].dataValues.id !==
      parseInt(req.params.id, 10))) {
        return res.status(400).send({
          message: 'Title already exists'
        });
      }
      return doc.update({
        title: req.body.title || doc.title,
        author: req.body.author || doc.author,
        roleId: userRoleId,
        content: req.body.content || doc.content,
        category: req.body.category || doc.category,
        access: req.body.access || doc.access
      })
      .then(() => res.status(201).send(doc))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.send(error));
  })
  .catch(error => res.status(400).send(error));
});

router.delete('/:id/', authenticateUser, (req, res) => {
  if (!isDigit(req.params.id)) {
    return res.status(400).send({
      message: 'Document ID must be a number'
    });
  }
  const userId = req.authenticatedUser.id;
  const userRoleId = req.authenticatedUser.roleId;
  Document.findById(req.params.id)
  .then((doc) => {
    if (!doc) {
      return res.status(400)
        .send({
          message: 'Document not found'
        });
    }
    const { validatedUser, errorMsg } = validateAccess(
      doc.userId,
      doc.access,
      doc.roleId,
      userId,
      userRoleId
    );
    if (!validatedUser) {
      return res.status(400).send(errorMsg);
    }
    return doc.destroy()
      .then(() => res.status(200).send({
        message: 'Document deleted successfully'
      }))
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
});

export default router;
