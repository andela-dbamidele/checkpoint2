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
    return res.status(400).send(errors);
  }

  // check the databse for duplicate title and throw error if there is
  Document.findOne({
    where: {
      title: req.body.title
    }
  })
  .then((doc) => {
    if (doc) {
      return res.status(400).send({
        message: 'Document with the same title already exist',
      });
    }

    // creates a new document if the document does not exists
    Document.create({
      title: req.body.title,
      author: req.body.author,
      roleId: req.body.roleId,
      content: req.body.content,
      userId: req.body.userId,
      access: req.body.access
    })
    .then(newDoc => res.status(200).send(newDoc))
    .catch(error => res.status(400).send(error));
  });
});

// handles GET request to the document api
// returns all documents on success
// returns error on error
router.get('/', authenticateUser, (req, res) => {
  let queryParams;
  const userRoleId = req.authenticatedUser.roleId;
  const userId = req.authenticatedUser.id;
  // check for `limit` and `offset` params in the query
  if (req.query.limit !== undefined && req.query.offset !== undefined) {
    const limit = parseInt(req.query.limit, 0);
    const offset = parseInt(req.query.offset, 0);

    // returns error if the limit and offset is not a number
    if (isNaN(limit) || isNaN(offset)) {
      return res.status(400).send({
        message: 'Search param must be a number'
      });
    }

    // prepare a databse query param if query is present in the request
    queryParams = {
      offset,
      limit,
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
  } else {
    queryParams = {
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
  }
  // query the database for documents
  Document.findAll(queryParams)
  .then((doc) => {
    // reutns error if no document is found
    if (doc.length === 0) {
      return res.status(400).send({
        message: 'No document found!'
      });
    }

    // sends the public document and other documents
    // that the user have access to
    return res.status(200).send(doc);
  })
  .catch(error => res.status(400).send(error));
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
      return res.status(200).send(errorMsg);
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
  const userId = 1; // change this
  const userRoleId = 5; // change this
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
      return res.status(200).send(errorMsg);
    }
    Document.findAll({
      where: {
        title: req.body.title
      }
    })
    .then((originalDoc) => {
      if (originalDoc.length !== 0 && (originalDoc[0].dataValues.id !==
      parseInt(req.params.id, 0))) {
        return res.status(400).send({
          message: 'Title already exists'
        });
      }
      return doc.update({
        title: req.body.title || doc.title,
        author: req.body.author || doc.author,
        roleId: req.body.roleId || doc.roleId,
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
  const userId = 1; // change this
  const userRoleId = 5; // change this
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
      return res.status(200).send(errorMsg);
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
