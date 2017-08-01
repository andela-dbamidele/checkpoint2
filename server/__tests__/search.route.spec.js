import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server';
import token from './helpers/token.json';

const User = require('../models').User;
const Role = require('../models').Role;
const Document = require('../models').Document;

const request = supertest.agent(app);
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

describe('APi Routes', () => {
  describe('Search endpoints', () => {
    beforeEach((done) => {
      User.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
      })
      .then((err) => {
        if (!err) {
          Role.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true
          })
          .then((err) => {
            if (!err) {
              Role.create({
                name: 'Admin',
                description: 'This is the Admin role'
              }).then((err) => {
                if (!err) {
                  //
                }
                done();
              });
            }
          });
        }
      });
    });

    describe('GET /api/search/users', () => {
      beforeEach((done) => {
        User.create({
          username: 'boluwatifemi',
          fullname: 'Bingo',
          password: '123456',
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

      it('should return an empty array if user is not found', (done) => {
        request
        .get('/api/search/users?q=oldsanden')
        .set('Authorization', token.admin)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
            expect(res.body).to.eqls([]);
          }
          done();
        });
      });

      it('should return an array of users if found', (done) => {
        request
        .get('/api/search/users?q=bolu')
        .set('Authorization', token.admin)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.be.greaterThan(0);
          }
          done();
        });
      });
    });

    describe('GET /api/search/documents', () => {
      beforeEach((done) => {
        User.create({
          username: 'boluwatifemi',
          fullname: 'Bingo',
          password: '123456',
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

      it('should return an empty array if document is not found', (done) => {
        request
        .get('/api/search/documents/?q=oldsanden')
        .set('Authorization', token.admin)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
            expect(res.body.documents).to.eqls([]);
          }
          done();
        });
      });

      it('should return an array if documents is found', (done) => {
        Document.create({
          title: 'Hey Man!',
          content: 'Mr Yo!',
          author: 'Bamidele Daniel',
          category: '',
          userId: 1,
          roleId: 1
        }).then(() => {
          //
        });
        request
        .get('/api/search/documents/?q=Hey')
        .set('Authorization', token.admin)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
            expect(res.body.documents.length).to.be.greaterThan(0);
          }
          done();
        });
      });
    });
  });
});
