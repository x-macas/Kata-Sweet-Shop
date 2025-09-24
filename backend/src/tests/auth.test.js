
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: __dirname + '/../../.env' });

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'testuser',
          email: `testuser_${Date.now()}@example.com`,
          password: 'testpass'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
    });
  });
});
