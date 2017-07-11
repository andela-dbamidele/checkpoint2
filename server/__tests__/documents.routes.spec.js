import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server';

const Document = require('../models').Document;
const User = require('../models').User;
const Role = require('../models').Role;

const request = supertest.agent(app);
chai.use(chaiHttp);
const Auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6' +
              'MSwidXNlcm5hbWUiOiJib2x1d2F0aWZlbWkiLCJpYXQiO' +
              'jE0OTgyODgyNDl9.PtsWTssgKdF5vtqJl6rNG4S9-4XxD7rBK3n3sgwEhUQ';

process.env.NODE_ENV = 'test';

describe('API Routes', () => {
  describe('Documents endpoints', () => {
    beforeEach((done) => {
      Document.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
      })
      .then(() => {
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
    });

    /**
     * Test the GET/api/documents route
     */
    describe('GET /api/documents', () => {
      beforeEach((done) => {
        User.create({
          username: 'boluwatifemi',
          fullname: 'Bingo',
          password: '123456',
          email: 'greatbolutife@gmail.com',
          roleId: 1
        }).then((err) => {
          if (!err) {
            //
          }
          done();
        });
      });
      it('connects to the API', (done) => {
        request
        .get('/api/documents')
        .set('Accept', 'application/json')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(200);
          }
          done();
        });
      });

      it('returns data', (done) => {
        request
        .get('/api/documents')
        .set('Accept', 'application/json')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.body).to.be.an('object');
          }
          done();
        });
      });

      it('returns error message if no document is found', (done) => {
        request
        .get('/api/documents')
        .set('Accept', 'application/json')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.body.message).to.equal('No document found!');
          }
          done();
        });
      });
    });

    /**
     * Test the POST /api/users route
     */
    describe('POST /api/documents', () => {
      beforeEach((done) => {
        const user = {
          username: 'db',
          fullname: 'Bamidele Daniel',
          password: '123456',
          email: 'greatbolutife@gmail.com',
          roleId: 1
        };
        User.create(user).then(() => {
          done();
        });
      });

      it('should throw error on missing fields', (done) => {
        const doc = {
          title: 'Hey yo!',
          content: 'Mr Yo!',
        };
        request
        .post('/api/documents')
        .set('Authorization', Auth)
        .send(doc)
        .end((err, res) => {
          if (!err) {
            expect(res.body.roleId).to.equal('Document role is required');
            expect(res.body.userId).to.equal('User is required');
          }
          done();
        });
      });

      it('should post a valid document', (done) => {
        const doc = {
          title: 'Hello world......!',
          content: 'Mr Yo!',
          author: 'Bamidele Daniel',
          category: 'games',
          userId: 1,
          roleId: 1
        };
        request
        .post('/api/documents')
        .set('Authorization', Auth)
        .send(doc)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
          }
          done();
        });
      });

      it('should throw error for duplicate title', (done) => {
        const doc = {
          title: 'Hey buddy!',
          content: 'Mr Yo!',
          author: 'Bamidele Daniel',
          category: '',
          userId: 1,
          roleId: 1
        };
        Document.create(doc).then(() => {
          //
        });
        request
        .post('/api/documents')
        .set('Authorization', Auth)
        .send(doc)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to
            .equal('Document with the same title already exist');
          }
          done();
        });
      });
    });

    /**
     * Test PUT /api/documents/{id} route
     */
    describe('PUT /api/users/:id', () => {
      beforeEach((done) => {
        const user = {
          username: 'db',
          fullname: 'Bamidele Daniel',
          password: '123456',
          email: 'greatbolutife@gmail.com',
          roleId: 1
        };
        User.create(user).then(() => {
          done();
        });
      });
      it('return error on invalid document id', (done) => {
        const doc = {
          title: 'Hey buddy!',
          content: 'Mr Yo!',
          author: 'Bamidele Daniel',
          category: '',
          userId: 1,
          roleId: 1
        };

        request
        .put('/api/documents/adb/')
        .set('Authorization', Auth)
        .send(doc)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Document id must be digit');
          }
          done();
        });
      });

      it('returns errors if document is not found', (done) => {
        request
        .put('/api/documents/1/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Document not found');
          }
          done();
        });
      });

      it('edits a single document', (done) => {
        Document.create({
          title: 'Hey buddy!',
          content: 'Mr Yo!',
          author: 'Bamidele Daniel',
          category: '',
          userId: 1,
          roleId: 1
        })
        .then(() => {
          request
          .put('/api/documents/1/')
          .set('Authorization', Auth)
          .send({
            content: 'Whats up buddy'
          })
          .end((err, res) => {
            if (!err) {
              expect(res.status).to.equal(201);
              expect(res.body.content).to.equal('Whats up buddy');
            }
            done();
          });
        });
      });
    });

    /**
     * Test for DELETE /api/document/{id} route
     */
    describe('DELETE /api/documents/:id', () => {
      beforeEach((done) => {
        const user = {
          username: 'db',
          fullname: 'Bamidele Daniel',
          password: '123456',
          email: 'greatbolutife@gmail.com',
          roleId: 1
        };
        User.create(user).then(() => {
          done();
        });
      });
      it('returns error for invalid parameter', (done) => {
        request
        .delete('/api/documents/ad/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Document ID must be a number');
          }
          done();
        });
      });

      it('returns error for invalid document', (done) => {
        request
        .delete('/api/documents/1')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Document not found');
          }
          done();
        });
      });

      it('delete a single document', (done) => {
        Document.create({
          title: 'Hey buddy!',
          content: 'Mr Yo!',
          author: 'Bamidele Daniel',
          category: '',
          userId: 1,
          roleId: 1
        })
        .then(() => {
          request
          .delete('/api/documents/1/')
          .set('Authorization', Auth)
          .end((err, res) => {
            if (!err) {
              expect(res.status).to.equal(200);
              expect(res.body.message).to
              .equal('Document deleted successfully');
            }
            done();
          });
        });
      });
    });
  });
});
