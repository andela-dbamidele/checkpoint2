import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server';

const Role = require('../models').Role;
const User = require('../models').User;

const request = supertest.agent(app);
chai.use(chaiHttp);

const Auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6' +
              'MSwidXNlcm5hbWUiOiJib2x1d2F0aWZlbWkiLCJpYXQiO' +
              'jE0OTgyODgyNDl9.PtsWTssgKdF5vtqJl6rNG4S9-4XxD7rBK3n3sgwEhUQ';

process.env.NODE_ENV = 'test';

describe('API Routes', () => {
  describe('Roles Endpoints', () => {
    beforeEach((done) => {
      Role.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
      })
      .then(() => {
        Role.create({
          name: 'Admin',
          description: 'This is the Admin Role'
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
              User.create({
                username: 'boluwatifemi',
                fullname: 'Bingo',
                password: '123456',
                email: 'greatbolutife@gmail.com',
                roleId: 1
              }).then(() => {
                done();
              });
            }
          });
        });
      });
    });

    /**
     * Tes GET /api/roles routes
     */
    describe('GET /api/roles', () => {
      it('connects to the API endpoint', (done) => {
        request
        .get('/api/roles')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
          }
          done();
        });
      });

      it('returns data', (done) => {
        request
        .get('/api/roles')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.body).to.be.an('array');
          }
          done();
        });
      });

      it('returns an array of object', (done) => {
        request
        .get('/api/roles')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
            expect(res.body[0].name).to.equal('Admin');
            expect(res.body[0].id).to.equal(1);
            expect(res.body.length).to.equal(1);
          }
          done();
        });
      });
    });

    /**
     * Test POST /api/roles
     */
    describe('POST /api/roles', () => {
      it('should not post a request with missing fields', (done) => {
        request
        .post('/api/roles')
        .set('Authorization', Auth)
        .send({
          description: 'This is the Regular role'
        })
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.name).to.equal('Role name is required');
          }
          done();
        });
      });

      it('should return error for duplicate role', (done) => {
        Role.create({
          name: 'Regular',
          description: 'This is the Regular role'
        }).then(() => {
          //
        });
        request
        .post('/api/roles/')
        .set('Authorization', Auth)
        .send({
          name: 'Regular',
          description: 'This is the Regular role'
        })
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to
            .equal('Role with the same name already exist');
          }
          done();
        });
      });

      it('should add a new role', (done) => {
        request
        .post('/api/roles')
        .set('Authorization', Auth)
        .send({
          name: 'Regular',
          description: 'This is the Regular role'
        })
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Regular');
            expect(res.body.description).to.equal('This is the Regular role');
            expect(res.body.id).to.equal(2);
          }
          done();
        });
      });
    });

    /**
     * Test GET /api/roles/{id} route
     */
    describe('GET /api/roles/:id', () => {
      it('should return details of a role', (done) => {
        request
        .get('/api/roles/1/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(1);
            expect(res.body.name).to.equal('Admin');
          }
          done();
        });
      });

      it('should throw error for invalid id', (done) => {
        request
        .get('/api/roles/as/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Role id must be an integer');
          }
          done();
        });
      });

      it('should throw error for invalid role', (done) => {
        request
        .get('/api/roles/2/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Role not found');
          }
          done();
        });
      });
    });

    /**
     * Test PUT /api/roles/{id}
     */
    describe('PUT /api/roles/:id', () => {
      it('should update a single role', (done) => {
        request
        .put('/api/roles/1')
        .set('Authorization', Auth)
        .send({
          name: 'Adminet',
          description: 'Now I control you'
        })
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(201);
            expect(res.body.name).to.equal('Adminet');
            expect(res.body.description).to.equal('Now I control you');
          }
          done();
        });
      });

      it('should return error for non-digit role id', (done) => {
        request
        .put('/api/roles/as')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Role id must be digit');
          }
          done();
        });
      });

      it('should return error for a non existing role', (done) => {
        request
        .put('/api/roles/10/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Role not found');
          }
          done();
        });
      });
    });

    /**
     * Test DELETE /api/roles/{id} endpoint
     */
    describe('DELETE /api/roles/:id', () => {
      it('should return error for invalid role id', (done) => {
        request
        .delete('/api/roles/djd/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Role ID must be an integer');
          }
          done();
        });
      });

      it('should delete a role', (done) => {
        request
        .delete('/api/roles/1/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Role deleted successfully');
          }
          done();
        });
      });

      it('should return error if role does not exist', (done) => {
        request
        .delete('/api/roles/10/')
        .set('Authorization', Auth)
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Role not found');
          }
          done();
        });
      });
    });
    // main describe
  });
});
