const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');
const User = require('../models/User');
require('dotenv').config({ path: __dirname + '/../../.env' });

describe('Sweets API', () => {
  let adminToken;
  let userToken;
  let sweetId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Register admin
    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'adminuser',
        email: `admin_${Date.now()}@example.com`,
        password: 'adminpassword',
        passKey: 'mySecretAdminKey'
      });
    adminToken = adminRes.body.token;

    // Register user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'testuser',
        email: `user_${Date.now()}@example.com`,
        password: 'testpassword'
      });
    userToken = userRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/sweets', () => {
    it('should allow an admin to create a new sweet', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Test Sweet', category: 'Test', price: 10, quantity: 100 });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', 'Test Sweet');
      sweetId = res.body._id; // Save for later tests
    });

    it('should not allow a regular user to create a new sweet', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Unauthorized Sweet', category: 'Test', price: 10, quantity: 100 });
      
      expect(res.statusCode).toBe(403);
    });
  });
});