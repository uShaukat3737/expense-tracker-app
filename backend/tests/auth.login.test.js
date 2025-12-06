// tests/auth.login.test.js
import request from 'supertest';
import app from '../app.js';

describe('Login Endpoint', () => {
  const testEmail = `login${Date.now()}@test.com`;

  beforeAll(async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Login User',
      email: testEmail,
      password: '123456',
    });
  });

  it('logs in successfully', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: '123456',
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('fails on wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: 'wrong',
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('User not found'); // Your real behavior
  });
});