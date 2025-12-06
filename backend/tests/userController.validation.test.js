// tests/userController.validation.test.js
import request from 'supertest';
import app from '../app.js';

describe('userController — Real Validation (No Frontend Checks)', () => {
  it('register → fails on missing fields', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Please enter All Fields');
  });

  it('register → fails on invalid email (backend throws 500)', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Bad Email',
      email: 'not-an-email',
      password: '123456'
    });
    expect(res.status).toBe(500); // Your backend crashes on validator.isEmail
  });

  it('register → allows short password (no validation)', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Short',
      email: `short${Date.now()}@test.com`,
      password: '123'
    });
    expect(res.status).toBe(200); // Your backend allows it!
  });

  it('login → fails on missing fields', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Please enter All Fields');
  });
});