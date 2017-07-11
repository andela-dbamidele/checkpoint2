import express from 'express';
import validateRolePostData from '../shared/validators/rolePostData';
import { isDigit } from '../../server/shared/helpers';
import authenticateRole from './middlewares/authenticateRole';

const Role = require('../models').Role;

const router = express.Router();

router.post('/', authenticateRole, (req, res) => {
  const { errors, isValid } = validateRolePostData(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  }
  Role.findOne({
    where: {
      name: req.body.name,
    }
  })
  .then((role) => {
    if (role) {
      return res.status(400).send({
        message: 'Role with the same name already exist',
      });
    }
    Role.create({
      name: req.body.name,
      description: req.body.description
    })
    .then(newRole => res.status(200).send(newRole))
    .catch(error => res.status(400).send(error));
  });
});

router.get('/', authenticateRole, (req, res) => {
  Role.findAll()
  .then((role) => {
    // returns error message if no role is found
    // very unlikely for this to happen
    if (role.length === 0) {
      return res.status(200).send({
        message: 'No Role found!'
      });
    }
    return res.status(200).send(role);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/:id', authenticateRole, (req, res) => {
  if (!isDigit(req.params.id)) {
    return res.status(400).send({
      message: 'Role id must be an integer'
    });
  }
  Role.findById(req.params.id)
  .then((role) => {
    if (!role) {
      return res.status(400)
        .send({
          message: 'Role not found'
        });
    }
    return res.status(200).send(role);
  })
  .catch(error => res.status(400).send(error));
});

router.put('/:id', authenticateRole, (req, res) => {
  if (!isDigit(req.params.id)) {
    return res.status(400).send({
      message: 'Role id must be digit'
    });
  }
  const userRoleId = 1; // change this please
  if (userRoleId !== 1) {
    return res.status(401).send({
      message: 'Sorry, we cannot process your' +
      ' request at this time. Please contact the Administrator'
    });
  }
  Role.findById(req.params.id)
  .then((role) => {
    if (!role) {
      return res.status(400)
        .send({
          message: 'Role not found'
        });
    }
    Role.findAll({
      where: {
        name: req.body.name
      }
    })
    .then((newRole) => {
      if (newRole.length > 0) {
        return res.status(401).send({
          message: 'Duplicate role already exist'
        });
      }
      return role.update({
        name: req.body.name || role.name,
        description: req.body.description || role.description,
      })
      .then(() => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
});

router.delete('/:id/', authenticateRole, (req, res) => {
  if (!isDigit(req.params.id)) {
    return res.status(400).send({
      message: 'Role ID must be an integer'
    });
  }
  Role.findById(req.params.id)
  .then((role) => {
    if (!role) {
      return res.status(400)
        .send({
          message: 'Role not found'
        });
    }
    return role.destroy()
      .then(() => res.status(200).send({
        message: 'Role deleted successfully'
      }))
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
});

export default router;
