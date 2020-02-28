const request = require("supertest");
const server = require("./server.js");
const db = require('../database/dbConfig');


describe ('server', () => {
    beforeAll(async () => {
      await db('users').truncate();
    });
  
    it('runs the test', () => {
      expect(true).toBe(true);
    })
  
    describe('POST /api/auth/register', () => {
      it('returns 201 Created', () => {
        return request(server)
          .post('/api/auth/register')
          .send({
            username: 'zac',
            password: 'mj'
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
  
     
      
    });
})