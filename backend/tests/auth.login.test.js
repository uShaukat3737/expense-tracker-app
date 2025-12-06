// tests/auth.login.test.js
import request from 'supertest';
import app from '../app.js';

describe('Login Endpoint', () => {
  beforeAll(async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Login User',
      email: 'login@test.com',
      password: '123456',
    });
  });

  it('logs in successfully', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@test.com',
      password: '123456',
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('login@test.com');
  });

  it('fails on wrong password OR wrong email (same message)', async () => {
    const res1 = await request(app).post('/api/auth/login').send({
      email: 'login@test.com',
      password: 'wrongpassword',
    });
    expect(res1.status).toBe(401);
    expect(res1.body.message).toBe('User not found'); // ← matches your current code

    const res2 = await request(app).post('/api/auth/login').send({
      email: 'ghost@notfound.com',
      password: '123456',
    });
    expect(res2.status).toBe(401);
    expect(res2.body.message).toBe('User not found'); // ← same message
  });
});