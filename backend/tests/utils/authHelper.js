// tests/utils/authHelper.js
import request from 'supertest';
import app from '../../app.js';

let testUserId = null;

export const getValidUserId = async () => {
  if (testUserId) return testUserId;

  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test User ' + Date.now(),
      email: `test${Date.now()}@example.com`,
      password: '123456',
    });

  testUserId = res.body.user._id;
  return testUserId;
};

export const cleanup = () => {
  testUserId = null;
};