import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import bcrypt from 'bcrypt-nodejs';
import app from '../server';

const User = require('../models').User;
const Role = require('../models').Role;

const request = supertest.agent(app);
chai.use(chaiHttp);

describe('*** Authentication Route ***', () => {
  before((done) => {
    Role.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
    .then(() => {
      Role.create({
        name: 'Admin',
        description: 'This is the Admin role'
      }).then(() => {
        User.create({
          username: 'boluwatife',
          fullname: 'Bingo',
          password: bcrypt.hashSync('123456'),
          email: 'greatbolutife@gmail.com',
          roleId: 1
        })
        .then((err) => {
          if (!err) {
            //
          }
          done();
        });
      });
    });
  });

  describe('>>> Login Validation Test', () => {
    it('should return errors for empty fields', (done) => {
      request
      .post('/auth/users/login')
      .send({})
      .end((err, res) => {
        if (!err) {
          expect(res.body.identifier)
          .to.equals('Username or email is required');
          expect(res.body.password)
          .to.equals('Password cannot be empty');
        }
        done();
      });
    });
  });

  describe('>>>Login Database Actions', () => {
    it('should return errors for invalid user', (done) => {
      const user = {
        identifier: 'daniel',
        password: 'hello'
      };
      request
      .post('/auth/users/login')
      .send(user)
      .end((err, res) => {
        if (!err) {
          expect(res.status)
          .to.equals(400);
          expect(res.body.message)
          .to.equals('Invalid credentials');
        }
        done();
      });
    });

    it('should return error for wrong password', (done) => {
      const user = {
        identifier: 'boluwatife',
        password: '12345678'
      };

      request
      .post('/auth/users/login')
      .send(user)
      .end((err, res) => {
        if (!err) {
          expect(res.status)
          .to.equals(400);
          expect(res.body.message)
          .to.equals('Invalid credentials');
        }
        done();
      });
    });

    it('should sign a valid user in', (done) => {
      const user = {
        identifier: 'boluwatife',
        password: '123456'
      };

      request
      .post('/auth/users/login')
      .send(user)
      .end((err, res) => {
        if (!err) {
          expect(res.status)
          .to.equal(200);
          expect(res.body.message)
          .to.equal('Authentication successful!');
          expect(res.body).to.have.property('token');
        }
        done();
      });
    });

    it('should fail on bad request', (done) => {
      const user = {
        identifier: 123456788999998876567899987655677,
        password: '123456'
      };

      request
      .post('/auth/users/login')
      .send(user)
      .end((err, res) => {
        if (!err) {
          expect(res.status)
          .to.equal(400);
        }
        done();
      });
    });
  });

  describe('>>>>Logout Route', () => {
    it('should log a user out', (done) => {
      request
      .post('/auth/users/logout')
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(200);
        }
        done();
      });
    });
  });
});
